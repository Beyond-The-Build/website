const { SecretManagerServiceClient } = require('@google-cloud/secret-manager');
const { Logging } = require('@google-cloud/logging');
const https = require('https');
// Need to implement JWT verification
// const jwt = require('jsonwebtoken');

const client = new SecretManagerServiceClient();
const logging = new Logging();
const log = logging.log('cloud_function');

// Define btb events
const DEPLOY_EVENTS = {
  "building": "🚀 **Deployment Started**",
  "ready": "✅ **Deployment Succeeded**",
  "error": "❌ **Deployment Failed**",
  "deploy_deleted": "🗑️ **Deployment Deleted**",
  "deploy_locked": "🔒 **Deployment Locked**",
  "deploy_unlocked": "🔓 **Deployment Unlocked**",
  "deploy_request_pending": "⏳ **Deploy Request Pending**",
  "deploy_request_rejected": "❌ **Deploy Request Rejected**",
  "deploy_request_accepted": "✅ **Deploy Request Accepted**",
  "deploy_restored": "🔄 **Deployment Restored**",
  "deploy_failed_previous_success": "⚠️ **Previously Successful Deploy Failed**",
  "deploy_succeeded_previous_failure": "🎉 **Previously Failed Deploy Succeeded**"
};

// Retrieve secret from GCP Secret Manager
async function getSecret(secretName) {
  const [version] = await client.accessSecretVersion({
    name: `projects/833383127013/secrets/${secretName}/versions/latest`,
  });

  const payload = version.payload.data.toString('utf8');
  log.write(log.entry({ resource: { type: 'cloud_function' } }, `Retrieved secret for ${secretName}: ${payload}`));
  return payload;
}

// Extract build status information from the payload
function retrieveBuildStatus(payload) {
  const { state, build_id, url, error_message, branch, name, deploy_url, admin_url, created_at, updated_at } = payload;
  return { state, build_id, url, error_message, branch, name, deploy_url, admin_url, created_at, updated_at };
}

// Send message to Discord
function sendToDiscord(webhookUrl, message) {
  return new Promise((resolve, reject) => {
    const data = JSON.stringify({ content: message });
    const url = new URL(webhookUrl);
    const options = {
      hostname: url.hostname,
      path: url.pathname + url.search,
      method: 'POST',
      headers: { 'Content-Type': 'application/json' }
    };

    const metadata = { resource: { type: 'cloud_function' } };

    const req = https.request(options, (res) => {
      let responseData = '';
      res.on('data', (chunk) => {
        responseData += chunk;
      });
      res.on('end', () => {
        log.write(log.entry(metadata, `Discord response: ${responseData}`));
        resolve();
      });
    });

    req.on('error', (error) => {
      log.write(log.entry(metadata, `Error sending to Discord: ${error.message}`));
      reject(error);
    });

    log.write(log.entry(metadata, `Sending to Discord: ${data}`));
    req.write(data);
    req.end();
  });
}

// Main Cloud Function handler
exports.netlifyToDiscord = async (req, res) => {
  try {
    // Log the request headers
    const metadata = { resource: { type: 'cloud_function' } };
    log.write(log.entry(metadata, `Headers: ${JSON.stringify(req.headers)}`));
    log.write(log.entry(metadata, `Body: ${JSON.stringify(req.body)}`));
    log.write(log.entry(metadata, `Params: ${JSON.stringify(req.params)}`));
    log.write(log.entry(metadata, `Query: ${JSON.stringify(req.query)}`));
    log.write(log.entry(metadata, `Method: ${req.method}`));
    log.write(log.entry(metadata, `Path: ${req.path}`));
    log.write(log.entry(metadata, `URL: ${req.url}`));

    // Retrieve secret from GCP Secret Manager
    const discordWebhookUrl = await getSecret('netify-discord-webhook');
    log.write(log.entry(metadata, `Discord Webhook URL: ${discordWebhookUrl}`));

    // Extract build status information from the payload
    const buildStatus = retrieveBuildStatus(req.body);
    log.write(log.entry(metadata, `Build Status: ${JSON.stringify(buildStatus)}`));

    // Format message
    const statusMessage = DEPLOY_EVENTS[buildStatus.state] || `⚠️ **Unknown Event: ${buildStatus.state}**`;
    const message = `
**Build Status:**
- ${statusMessage}
- **App Name:** ${buildStatus.name}
- **State:** ${buildStatus.state}
- **Build ID:** ${buildStatus.build_id}
- **Branch:** ${buildStatus.branch}
- **URL:** ${buildStatus.url}
`;

    if (buildStatus.state === 'error' && buildStatus.error_message) {
      message += `- **Error Message:** ${buildStatus.error_message}\n`;
    }

    // Send message to Discord
    await sendToDiscord(discordWebhookUrl, message);

    return res.status(200).json({ message: "Notification sent to Discord!" });

  } catch (error) {
    log.write(log.entry(metadata, `Error: ${error.message}`));
    return res.status(500).json({ message: "Failed to process request" });
  }
};