variable "token_secret" {
  type = string
}

variable "auth_client_secret" {
  type = string
}

variable "account_id" {
  default = "862438233085"
}

variable "region" {
  default = "us-east-1"
}

variable "name" {
  default = "diet"
}

variable "dns" {
  default = "diet.buysse.link"
}

variable "tags" {
  default = {
    application = "diet"
  }
}
