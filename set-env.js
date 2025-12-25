const fs = require('fs');
const path = require('path');

// 1. Try process.env first (Deployment/Appwrite)
let apiKey = process.env.GEMINI_API_KEY;

// 2. Fallback to .env file (Local Development)
if (!apiKey) {
    const envPath = path.resolve(__dirname, '.env');
    if (fs.existsSync(envPath)) {
        const envContent = fs.readFileSync(envPath, 'utf8');
        const apiKeyMatch = envContent.match(/GEMINI_API_KEY=(.*)/);
        if (apiKeyMatch) {
            apiKey = apiKeyMatch[1].trim();
        }
    }
}

if (!apiKey) {
    console.warn('WARNING: GEMINI_API_KEY not found in process.env or .env file.');
    apiKey = ''; // Default to empty or handle gracefully
}

const targetPath = path.resolve(__dirname, 'src/env.ts');

const envFileContent = `export const environment = {
  geminiApiKey: '${apiKey}',
  production: true
};
`;

fs.writeFileSync(targetPath, envFileContent);
console.log(`Updated ${targetPath} with API Key (source: ${process.env.GEMINI_API_KEY ? 'Environment Variable' : '.env file'})`);
