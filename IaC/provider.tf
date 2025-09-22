terraform {
  cloud {
    organization = "erasmosoares"

    workspaces {
      name = "Node-Template"
    }
  }

  required_version = ">= 1.0.0"
  required_providers {
    random = {
      source  = "hashicorp/random"
      version = "3.4.3"
    }
  }
}
