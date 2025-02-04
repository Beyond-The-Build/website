terraform {
  backend "gcs" {
    bucket      = "btb-terraform-state-bucket"
    prefix      = "terraform/state"
    credentials = "terraform-key.json"
  }
}