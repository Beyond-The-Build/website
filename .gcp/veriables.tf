variable "project_id" {
  description = "Project ID"
  type        = string
  default     = "beyond-the-build"
}

variable "region" {
  description = "GCP Region"
  type        = string
  default     = "europe-west2"
}

variable "discord_webhook_url" {
  description = "Discord Webhook URL"
  type        = string
  sensitive = true
}