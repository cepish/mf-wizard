/**
 * This script is responsible for setting Vercel environment variables.
 * It is used in the "Set Vercel token and project ID (Node.js)" step
 * of vercel-deploy.yml
 */
const fs = require("fs");
const config = require("./vercel-config");

const appName = process.argv[2];
const envFile = process.env.GITHUB_ENV;

if (!appName || !config[appName]) {
  console.error(`Missing config for app: ${appName}`);
  process.exit(1);
}

const { token, projectId } = config[appName];

if (!token || !projectId) {
  console.error(`Missing token or projectId for app: ${appName}`);
  process.exit(1);
}

// Write the environment variables to GITHUB_ENV
fs.appendFileSync(envFile, `VERCEL_TOKEN=${token}\n`);
fs.appendFileSync(envFile, `VERCEL_PROJECT_ID=${projectId}\n`);
