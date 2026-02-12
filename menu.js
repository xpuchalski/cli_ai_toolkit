#!/usr/bin/env node
/**
 * AI Toolkit Interactive Menu
 * Main entry point with interactive tool selection
 */

import 'dotenv/config';
import { createHeader, createStyledOutput } from './colors.js';
import { spawn } from 'child_process';
import readline from 'readline';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function question(prompt) {
  return new Promise((resolve) => {
    rl.question(prompt, resolve);
  });
}

async function runTool(script) {
  return new Promise((resolve) => {
    const child = spawn('node', [path.join(__dirname, 'tools', script)], {
      stdio: 'inherit',
    });
    child.on('close', resolve);
  });
}

async function main() {
  console.clear();
  console.log(createHeader('AI TOOLKIT'));

  let running = true;

  while (running) {
    console.log(createStyledOutput('\nSelect a tool:\n', 'bright'));
    console.log(createStyledOutput('1.', 'brightMagenta') + ' Web Search Agent');
    console.log(createStyledOutput('2.', 'brightMagenta') + ' Image Generation');
    console.log(createStyledOutput('3.', 'brightMagenta') + ' Design Feedback');
    console.log(createStyledOutput('4.', 'brightMagenta') + ' Website Interface');
    console.log(createStyledOutput('5.', 'brightMagenta') + ' Exit\n');

    const choice = await question(
      createStyledOutput('Enter choice (1-5): ', 'cyan')
    );

    switch (choice.trim()) {
      case '1':
        await runTool('webSearch.js');
        break;
      case '2':
        await runTool('generateImage.js');
        break;
      case '3':
        await runTool('designFeedback.js');
        break;
      case '4':
        await runTool('webInterface.js');
        break;
      case '5':
        running = false;
        console.log(
          createStyledOutput('\n👋 Thanks for using AI Toolkit!\n', 'brightMagenta')
        );
        break;
      default:
        console.log(createStyledOutput('\n❌ Invalid choice. Please try again.', 'red'));
    }
  }

  rl.close();
}

main();
