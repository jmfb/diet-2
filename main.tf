terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "3.33.0"
    }
  }

  backend "s3" {
    bucket         = "jmfb-terraform"
    key            = "diet"
    region         = "us-east-1"
    dynamodb_table = "tfstate-lock"
  }
}

provider "aws" {
  region = "us-east-1"
}

variable "token_secret" {
  type = string
}

variable "auth_client_secret" {
  type = string
}

locals {
  account_id = "862438233085"
  region     = "us-east-1"
  name       = "diet"
  dns        = "diet.buysse.link"
  stage_name = "prod"
  tags = {
    application = "diet"
  }
}

data "aws_route53_zone" "dns_zone" {
  name         = "buysse.link."
  private_zone = false
}

resource "aws_acm_certificate" "diet" {
  domain_name       = local.dns
  validation_method = "DNS"
  tags              = local.tags

  lifecycle {
    create_before_destroy = true
  }
}

resource "aws_route53_record" "validation" {
  for_each = {
    for option in aws_acm_certificate.diet.domain_validation_options : option.domain_name => {
      name   = option.resource_record_name
      record = option.resource_record_value
      type   = option.resource_record_type
    }
  }

  allow_overwrite = true
  name            = each.value.name
  records         = [each.value.record]
  ttl             = 60
  type            = each.value.type
  zone_id         = data.aws_route53_zone.dns_zone.zone_id
}

resource "aws_acm_certificate_validation" "validation" {
  certificate_arn         = aws_acm_certificate.diet.arn
  validation_record_fqdns = [for record in aws_route53_record.validation : record.fqdn]
}

resource "aws_api_gateway_domain_name" "gateway" {
  domain_name     = local.dns
  certificate_arn = aws_acm_certificate.diet.arn
  tags            = local.tags
}

resource "aws_route53_record" "dns" {
  zone_id = data.aws_route53_zone.dns_zone.zone_id
  name    = local.dns
  type    = "A"

  alias {
    name                   = aws_api_gateway_domain_name.gateway.cloudfront_domain_name
    zone_id                = aws_api_gateway_domain_name.gateway.cloudfront_zone_id
    evaluate_target_health = true
  }
}

resource "aws_api_gateway_rest_api" "gateway" {
  name        = local.name
  description = "Nutritional Science ASP.NET Core API Gateway"
}

resource "aws_api_gateway_resource" "proxy" {
  rest_api_id = aws_api_gateway_rest_api.gateway.id
  parent_id   = aws_api_gateway_rest_api.gateway.root_resource_id
  path_part   = "{proxy+}"
}

resource "aws_api_gateway_method" "proxy" {
  rest_api_id   = aws_api_gateway_rest_api.gateway.id
  resource_id   = aws_api_gateway_resource.proxy.id
  http_method   = "ANY"
  authorization = "NONE"
}

resource "aws_api_gateway_integration" "proxy" {
  rest_api_id             = aws_api_gateway_rest_api.gateway.id
  resource_id             = aws_api_gateway_resource.proxy.id
  http_method             = aws_api_gateway_method.proxy.http_method
  integration_http_method = "POST"
  type                    = "AWS_PROXY"
  uri                     = "arn:aws:apigateway:${local.region}:lambda:path/2015-03-31/functions/${aws_lambda_function.lambda.arn}/invocations"
}

resource "aws_api_gateway_method_response" "proxy" {
  rest_api_id = aws_api_gateway_rest_api.gateway.id
  resource_id = aws_api_gateway_resource.proxy.id
  http_method = aws_api_gateway_method.proxy.http_method
  status_code = 200
}

resource "aws_api_gateway_integration_response" "proxy" {
  rest_api_id = aws_api_gateway_rest_api.gateway.id
  resource_id = aws_api_gateway_resource.proxy.id
  http_method = aws_api_gateway_method.proxy.http_method
  status_code = aws_api_gateway_method_response.proxy.status_code
  depends_on  = [aws_api_gateway_integration.proxy]
}

resource "aws_api_gateway_deployment" "prod" {
  depends_on  = [aws_api_gateway_method.proxy, aws_api_gateway_integration.proxy]
  stage_name  = local.stage_name
  rest_api_id = aws_api_gateway_rest_api.gateway.id
}

resource "aws_api_gateway_base_path_mapping" "gateway" {
  depends_on  = [aws_api_gateway_deployment.prod]
  api_id      = aws_api_gateway_rest_api.gateway.id
  stage_name  = local.stage_name
  domain_name = local.dns
}

data "aws_iam_policy_document" "lambda" {
  statement {
    actions = ["sts:AssumeRole"]

    principals {
      type        = "Service"
      identifiers = ["lambda.amazonaws.com"]
    }
  }
}

resource "aws_iam_role" "lambda" {
  name               = local.name
  assume_role_policy = data.aws_iam_policy_document.lambda.json
}

resource "aws_iam_role_policy_attachment" "basic_execution" {
  role       = aws_iam_role.lambda.name
  policy_arn = "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole"
}

resource "aws_kms_key" "lambda" {
  description = "Nutritional Science Lambda Environment Variable Key"
  tags        = local.tags
}

resource "aws_kms_alias" "lambda" {
  name          = "alias/${local.name}-key"
  target_key_id = aws_kms_key.lambda.key_id
}

data "aws_iam_policy_document" "policy" {
  statement {
    effect    = "Allow"
    actions   = ["kms:Decrypt"]
    resources = [aws_kms_key.lambda.arn]
  }
}

resource "aws_iam_policy" "policy" {
  name   = local.name
  policy = data.aws_iam_policy_document.policy.json
}

resource "aws_iam_role_policy_attachment" "policy" {
  role       = aws_iam_role.lambda.name
  policy_arn = aws_iam_policy.policy.arn
}

data "aws_kms_ciphertext" "token_secret" {
  key_id    = aws_kms_key.lambda.key_id
  plaintext = var.token_secret
}

data "aws_kms_ciphertext" "auth_client_secret" {
  key_id    = aws_kms_key.lambda.key_id
  plaintext = var.auth_client_secret
}

resource "aws_cloudwatch_log_group" "logs" {
  name              = "/aws/lambda/${local.name}"
  retention_in_days = 3
  tags = merge(local.tags, map(
    "Name", local.name
  ))
}

resource "aws_lambda_function" "lambda" {
  package_type  = "Image"
  image_uri     = "862438233085.dkr.ecr.us-east-1.amazonaws.com/diet:latest"
  function_name = local.name
  description   = "Nutrional Science ASP.NET Core Lambda"
  role          = aws_iam_role.lambda.arn
  memory_size   = 512
  timeout       = 60
  kms_key_arn   = aws_kms_key.lambda.arn
  publish       = true

  environment {
    variables = {
      EncryptedTokenSecret      = data.aws_kms_ciphertext.token_secret.ciphertext_blob
      EncryptedAuthClientSecret = data.aws_kms_ciphertext.auth_client_secret.ciphertext_blob
    }
  }

  tags = merge(local.tags, map(
    "Name", local.name
  ))

  depends_on = [aws_cloudwatch_log_group.logs]
}

resource "aws_lambda_permission" "permit" {
  function_name = aws_lambda_function.lambda.function_name
  statement_id  = "AllowExecutionFromAPIGateway"
  action        = "lambda:InvokeFunction"
  principal     = "apigateway.amazonaws.com"
  source_arn    = "arn:aws:execute-api:${local.region}:${local.account_id}:${aws_api_gateway_rest_api.gateway.id}/*/*/*"
}
