/**
 * Shared utilities for CLI tools
 */

import readline from 'readline';
import { config } from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

export function createReadlineInterface() {
  return readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
}

export function createQuestion(rl) {
  return (prompt) =>
    new Promise((resolve) => {
      rl.question(prompt, resolve);
    });
}

export function loadEnvConfig() {
  const envPath = path.join(
    path.dirname(fileURLToPath(import.meta.url)),
    'api_keys.env'
  );
  config({ path: envPath });
}
