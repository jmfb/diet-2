data "aws_kms_ciphertext" "token_secret" {
  key_id    = aws_kms_key.lambda.key_id
  plaintext = var.token_secret
}

data "aws_kms_ciphertext" "auth_client_secret" {
  key_id    = aws_kms_key.lambda.key_id
  plaintext = var.auth_client_secret
}

resource "aws_lambda_function" "lambda" {
  package_type  = "Image"
  image_uri     = "862438233085.dkr.ecr.us-east-1.amazonaws.com/diet:latest"
  function_name = var.name
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

  tags = merge(var.tags, map(
    "Name", var.name
  ))

  depends_on = [aws_cloudwatch_log_group.logs]
}

resource "aws_lambda_permission" "permit" {
  function_name = aws_lambda_function.lambda.function_name
  statement_id  = "AllowExecutionFromAPIGateway"
  action        = "lambda:InvokeFunction"
  principal     = "apigateway.amazonaws.com"
  source_arn    = "arn:aws:execute-api:${var.region}:${var.account_id}:${aws_api_gateway_rest_api.gateway.id}/*/*/*"
}
