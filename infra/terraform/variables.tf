variable "aws_region" {
    default = "us-east-2"
}

variable "ami_id" {
    description = "ami-0d1b5a8c13042c939"
}

variable "instance_type" {
    default = "t2.micro"
}

variable "key_name" {
    description = "climbing-trip-planner-key-east-2"
}

variable "vpc_id" {
  description = " "
  type        = string
}

