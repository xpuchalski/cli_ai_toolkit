#!/usr/bin/env node
/**
 * AI Toolkit Configuration Check
 * Verifies all dependencies and API keys are properly configured
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { createHeader, createStyledOutput } from './colors.js';
import { config } from 'dotenv';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Load API keys from api_keys.env
const envPath = path.join(__dirname, 'api_keys.env');
config({ path: envPath });

function checkFile(filepath, name) {
  const exists = fs.existsSync(filepath);
  const status = exists
    ? createStyledOutput('✅', 'green')
    : createStyledOutput('❌', 'red');
  console.log(`${status} ${name}`);
  return exists;
}

function checkEnvar(key, name) {
  const exists = !!process.env[key];
  const status = exists
    ? createStyledOutput('✅', 'green')
    : createStyledOutput('❌', 'red');
  console.log(`${status} ${name}`);
  return exists;
}

console.log(createHeader('CONFIGURATION CHECK'));

let allGood = true;

// Check files
console.log(createStyledOutput('\nFiles:', 'bright'));
allGood &= checkFile(path.join(__dirname, 'package.json'), 'package.json');
allGood &= checkFile(path.join(__dirname, 'api_keys.env'), 'api_keys.env');
allGood &= checkFile(path.join(__dirname, 'tools/webSearch.js'), 'Web Search tool');
allGood &= checkFile(path.join(__dirname, 'tools/generateImage.js'), 'Image Generation tool');
allGood &= checkFile(path.join(__dirname, 'tools/designFeedback.js'), 'Design Feedback tool');

// Check directories
console.log(createStyledOutput('\nDirectories:', 'bright'));
allGood &= checkFile(path.join(__dirname, 'tools'), 'tools/');
allGood &= checkFile(path.join(__dirname, 'references'), 'references/');
allGood &= checkFile(path.join(__dirname, 'references/ai_feedback'), 'references/ai_feedback/');
allGood &= checkFile(path.join(__dirname, 'images'), 'images/');
allGood &= checkFile(path.join(__dirname, 'screenshots'), 'screenshots/');

// Check API keys
console.log(createStyledOutput('\nAPI Keys:', 'bright'));
allGood &= checkEnvar('OPENAI_API_KEY', 'OPENAI_API_KEY');
allGood &= checkEnvar('GEMINI_API_KEY', 'GEMINI_API_KEY');

// Check npm packages
console.log(createStyledOutput('\nNode Modules:', 'bright'));
allGood &= checkFile(path.join(__dirname, 'node_modules/openai'), 'openai');
allGood &= checkFile(path.join(__dirname, 'node_modules/playwright'), 'playwright');
allGood &= checkFile(path.join(__dirname, 'node_modules/@google/generative-ai'), '@google/generative-ai');
allGood &= checkFile(path.join(__dirname, 'node_modules/dotenv'), 'dotenv');

// Summary
console.log('\n' + createStyledOutput('═'.repeat(50), 'brightMagenta'));

if (allGood) {
  console.log(
    createStyledOutput(
      '\n✅ All checks passed! Ready to use AI Toolkit\n',
      'green'
    )
  );
  console.log(createStyledOutput('Get started:', 'bright'));
  console.log('  npm start              - Interactive menu');
  console.log('  npm run web-search     - Web search agent');
  console.log('  npm run generate-image - Image generation');
  console.log('  npm run design-feedback - Design feedback\n');
} else {
  console.log(
    createStyledOutput(
      '\n❌ Some checks failed. Please review above.\n',
      'red'
    )
  );
  console.log(createStyledOutput('Fix:', 'bright'));
  console.log('  npm install                           - Install dependencies');
  console.log('  npx playwright install chromium       - Install Playwright\n');
}
