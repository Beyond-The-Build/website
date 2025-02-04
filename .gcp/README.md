# GCP Configuration for website

This folder contains the configuration files and scripts necessary to deploy and manage the Google Cloud Platform (GCP) infrastructure for the website project. It includes Terraform scripts for provisioning resources, a Cloud Function for handling Netlify webhooks, and API Gateway configuration for routing requests.

## Folder Structure

- `api-config.yaml`: OpenAPI specification for the API Gateway.
- `backend.tf`: Terraform configuration for the backend state storage.
  - Currently uses GCP Storage
- `cloud-function/`: Contains the source code and configuration for the Cloud Function.
- `main.tf`: Main Terraform configuration file for provisioning resources.
- `providers.tf`: Specifies the Terraform providers to be used.
- `README.md`: This readme file.
- `variables.tf`: Defines the input variables for Terraform.

## Setup Instructions

### Prerequisites

1. **Google Cloud SDK**: Ensure you have the Google Cloud SDK installed and authenticated.
2. **Terraform**: Install Terraform from [terraform.io](https://www.terraform.io/downloads.html).
3. **Service Account**: Create a service account with the necessary permissions and download the JSON key file.

### Steps

1. **Clone the Repository**:
   ```sh
   git clone https://github.com/your-repo/website.git
   cd website/.gcp

2. **Configure Environment Variables:** Set the environment variable for the Google Cloud project: 

`export GOOGLE_CLOUD_PROJECT=beyond-the-build`

3. **Create terraform-key.json:** Create terraform-key.json with your service account key JSON.
4. **Initialize Terraform:** Initialize Terraform to download the necessary providers: `terraform init`
5. **Create secret.tfvars:** Create a secret.tfvars file with the following content:
```
discord_webhook_url = "your-discord-webhook-url"
```
You can find the discord webbhook url in discord.

6. **Apply Terraform Configuration:** Apply the Terraform configuration to provision the resources: 
   
`terraform apply -var-file="secret.tfvars"`

#!TODO Set up pipeline to deploy Cloud Function

The Cloud Function code is automatically zipped and uploaded to a Google Cloud Storage bucket. Ensure the function is deployed by running

## Cloud Function
The Cloud Function handles incoming webhooks from Netlify and forwards them to a Discord channel. The function verifies JWT tokens and logs relevant information to Google Cloud Logging.

## API Gateway
The API Gateway routes requests to the Cloud Function. The configuration is defined in api-config.yaml.

## Secret Management
Sensitive information such as the Discord webhook URL is stored in Google Cloud Secret Manager and accessed by the Cloud Function at runtime.

## Logging
Logs from the Cloud Function are written to Google Cloud Logging for monitoring and debugging purposes.

## Notes
Ensure that sensitive files such as terraform-key.json and secret.tfvars are listed in .gitignore to prevent them from being committed to the repository.
Regularly rotate your secrets and update the secret.tfvars file accordingly.