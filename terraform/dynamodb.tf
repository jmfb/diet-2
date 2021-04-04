resource "aws_dynamodb_table" "weights" {
  name = "diet-weights"
  billing_mode = "PROVISIONED"
  read_capacity = 1
  write_capacity = 1
  hash_key = "UserId"
  range_key = "Date"

  attribute {
    name = "UserId"
    type = "S"
  }

  attribute {
    name = "Date"
    type = "S"
  }

  tags = merge(var.tags, map(
    "Name", "diet-weights"
  ))
}

resource "aws_dynamodb_table" "profiles" {
  name = "diet-profiles"
  billing_mode = "PROVISIONED"
  read_capacity = 1
  write_capacity = 1
  hash_key = "UserId"

  attribute {
    name = "UserId"
    type = "S"
  }

  tags = merge(var.tags, map(
    "Name", "diet-profiles"
  ))
}
