provider "aws" {
    region = var.aws_region
}

resource "aws_instance" "app_server" {
    ami = var.ami_id
    instance_type = var.instance_type
    key_name = var.key_name
    tags = {
        Name = "climbing-app-server"
    }
    vpc_security_group_ids = [aws_security_group.app_sg.id]

    provisioner "file" {
        source = "../docker-compose.yml"
        destination = "/home/ubuntu/app"
    }

    # provisioner "remote-exec" {
    #     inline = [ 
    #         "sudo apt-get update",
    #         "curl -fsSL https://get.docker.com -o get-docker.sh",
    #         "sh get-docker.sh",
    #         "cd /home/ubuntu/app",
    #         "docker compose up -d"
    #      ]
    # }

    connection {
      type = "ssh"
      user = "ubuntu"
      private_key = file("~/.ssh/climbing-trip-planner-key-east-2.pem")
      host = self.public_ip
    }
}

resource "aws_security_group" "app_sg" {
    name = "climbing-app-sg"
    description = "Allow SSH, HTTP"
    vpc_id = var.vpc_id

//update to own ip address for dev
    ingress {
        from_port = 22
        to_port = 22
        protocol = "tcp"
        cidr_blocks = ["0.0.0.0/0"]
    }

    ingress {
        from_port = 80
        to_port = 80
        protocol = "tcp"
        cidr_blocks = ["0.0.0.0/0"]
    }

    ingress {
        from_port = 8080
        to_port = 8080
        protocol = "tcp"
        cidr_blocks = ["0.0.0.0/0"]
    }

        ingress {
        from_port = 3000
        to_port = 3000
        protocol = "tcp"
        cidr_blocks = ["0.0.0.0/0"]
    }

    egress {
        from_port = 0
        to_port = 0
        protocol = "-1"
        cidr_blocks = ["0.0.0.0/0"]
    }
}

output "public_ip" {
    value = aws_instance.app_server.public_ip
}