Commands: 


```
terraform init
terraform plan
terraform apply
terraform apply -auto-approve
terraform destroy -target "aws-vpc" "existing-vpc"
terraform state list
terraform state show

Variable: 
terraform apply -var-file terraform-dev.tfvars
```
Example Variable Declaration: 


```
variable "cider-block" {
	description = "cider-block"
	default  = "10.0.0.0/24"
	type  = string (any variable type you can define for that).
}
```
Example for terraform file structure: 

Demo file for terraform: 
```
terraform {
  required_providers {
    aws = {
      source = "hashicorp/aws"
      version = "~>3.0"
    }
  }
}

provider "aws" {
  region = "us-east-1"
}

variable "cider-block" {
	description = "cider-block"
	default  = "10.0.0.0/24"
	type  = string (any variable type you can define for that).
}

variable "enviornment" {
	description = "development"
}

resource "aws_instance" "example" {
  ami           = "ami-011899242bb9021641"
  instance_type = "t2.micro"
}

resource "aws_vpc" "developmentVpc" {
  cidr_block = "10.0.0.0/16"
  tags = {
    "Name" = "vpc1"
  }
}

resource "aws_subnet" "dev-subnet1" {
  vpc_id = aws_vpc.developmentVpc.id
  cidr_block = var.cider-block
  availability_zone = "us-east-1"
  tags = {
    "Name" = "subnet1"
  }
}

data "aws_vpc" "ExistingVpc" {
  default = true
}

resource "aws_subnet" "dev-subnet2" {
  vpc_id = data.aws_vpc.ExistingVpc.id
  cidr_block = "10.0.2.0/24"
  tags = {
    "name" = "subnet2"
  }
}
```




*****

[[category.storage-team]] 
[[category.confluence]] 
