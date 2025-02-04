#Secrets required for the Cloud Function
resource "google_secret_manager_secret" "discord_webhook" {
  secret_id = "netify-discord-webhook"
  replication {
    auto {}
  }
}

resource "google_secret_manager_secret_version" "discord_webhook_version" {
  secret      = google_secret_manager_secret.discord_webhook.id
  secret_data = var.discord_webhook_url
}

#Bucket to store the Cloud Function code
resource "google_storage_bucket" "function_bucket" {
  name     = "${var.project_id}-functions"
  location = var.region
}

#Zip the Cloud Function code
resource "null_resource" "zip_function" {
  provisioner "local-exec" {
    command = "cd cloud-function && zip -r ../src/function.zip ."
  }

  triggers = {
    always_run = "${timestamp()}"
  }
}

#Upload the Cloud Function code to the bucket
resource "google_storage_bucket_object" "function_archive" {
  name   = "netify-discord.zip"
  bucket = google_storage_bucket.function_bucket.name
  source = "./src/function.zip"

  depends_on = [null_resource.zip_function]
}

resource "google_service_account" "netify_function_sa" {
  account_id   = "netify-function-sa"
  display_name = "Service Account for netify Cloud Function"
}

resource "google_project_iam_member" "netify_function_invoker" {
  project = var.project_id
  role    = "roles/cloudfunctions.invoker"
  member  = "serviceAccount:${google_service_account.netify_function_sa.email}"
}

resource "google_project_iam_member" "netify_functions_secret_access" {
  project = var.project_id
  role    = "roles/secretmanager.secretAccessor"
  member  = "serviceAccount:${google_service_account.netify_function_sa.email}"
}

resource "google_project_iam_member" "netify_function_log_writer" {
    project = var.project_id
    role    = "roles/logging.logWriter"
    member  = "serviceAccount:${google_service_account.netify_function_sa.email}"
}

resource "google_cloudfunctions2_function" "netlify_to_discord" {
  name     = "netlifyToDiscord"
  location = var.region

  build_config {
    runtime     = "nodejs22"
    entry_point = "netlifyToDiscord"

    source {
      storage_source {
        bucket = google_storage_bucket.function_bucket.name
        object = google_storage_bucket_object.function_archive.name
      }
    }
  }

  service_config {
    max_instance_count = 1
    available_memory   = "256Mi"
    timeout_seconds    = 60
    service_account_email = google_service_account.netify_function_sa.email
    environment_variables = {
      GCP_PROJECT_ID = var.project_id
    }
  }

  depends_on = [
    google_storage_bucket_object.function_archive,
    google_project_iam_member.netify_function_invoker
  ]
}

resource "google_api_gateway_api" "netify_discord_proxy_api" {
  provider = google-beta
  api_id   = "netlify-discord-proxy-api"
}

resource "google_api_gateway_api_config" "netify_discord_proxy_api_config" {
  provider      = google-beta
  api           = google_api_gateway_api.netify_discord_proxy_api.api_id
  api_config_id = "v1"

  openapi_documents {
    document {
      path     = "api-config.yaml"
      contents = filebase64("api-config.yaml")
    }
  }
}

resource "google_project_iam_member" "netify_api_gateway_invoker" {
  project = var.project_id
  role    = "roles/run.invoker"
  member  = "serviceAccount:${google_service_account.netify_function_sa.email}"
}

resource "google_api_gateway_gateway" "netify_discord_proxy_gateway" {
  provider   = google-beta
  gateway_id = "netlify-discord-proxy-gateway"
  region     = var.region
  api_config = google_api_gateway_api_config.netify_discord_proxy_api_config.id
}

#Output the API Gateway information
output "api_gateway_id" {
  value = google_api_gateway_gateway.netify_discord_proxy_gateway.gateway_id
}

output "name" {
  value = google_api_gateway_gateway.netify_discord_proxy_gateway.default_hostname
}

output "api_gateway_url" {
  value = "https://${google_api_gateway_gateway.netify_discord_proxy_gateway.default_hostname}/discord"
}