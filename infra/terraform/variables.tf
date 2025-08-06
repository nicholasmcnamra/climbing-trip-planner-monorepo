variable "aws_region" {
    default = "us-east-1"
}

variable "ami_id" {
    description = "Ubuntu AMI ID"
}

variable "instance_type" {
    default = "t2.micro"
}

variable "key_name" {
    description = "AWS SSH key pair names"
}