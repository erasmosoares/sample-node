terraform {
  required_version = ">= 1.0.0"
}

variable "hello_message" {
  default = "Testing terraform cloud!"
}

output "greeting" {
  value = var.hello_message
}