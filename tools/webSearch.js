import 'dotenv/config';
import OpenAI from 'openai';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { createHeader, createStyledOutput } from '../colors.js';
import readline from 'readline';
import { config } from 'dotenv';

// Load API keys from api_keys.env
const envPath = path.join(path.dirname(fileURLToPath(import.meta.url)), '../api_keys.env');
config({ path: envPath });

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function question(prompt) {
  return new Promise((resolve) => {
    rl.question(prompt, resolve);
  });
}

async function webSearch() {
  console.log(createHeader('WEB SEARCH AGENT'));
  
  const searchQuery = await question(
    createStyledOutput('Enter your search query: ', 'cyan')
  );
  
  if (!searchQuery.trim()) {
    console.log(createStyledOutput('Search query cannot be empty', 'red'));
    rl.close();
    return;
  }

  console.log(createStyledOutput('\n🔍 Searching the web...', 'brightMagenta'));

  try {
    const response = await client.chat.completions.create({
      model: 'gpt-4-turbo',
      messages: [
        {
          role: 'user',
          content: `You are a research assistant. Search for and synthesize information about: "${searchQuery}". 
          
          Please provide:
          1. A comprehensive summary of the topic
          2. Key findings and recent developments
          3. Relevant sources and references
          4. Any important statistics or data points
          
          Make sure the information is current and accurate.`,
        },
      ],
      tools: [
        {
          type: 'function',
          function: {
            name: 'web_search',
            description: 'Search the web for current information',
            parameters: {
              type: 'object',
              properties: {
                query: {
                  type: 'string',
                  description: 'The search query',
                },
              },
              required: ['query'],
            },
          },
        },
      ],
    });

    let document = `# Research Document: ${searchQuery}\n\n`;
    document += `Generated: ${new Date().toISOString()}\n\n`;

    if (response.choices[0].message.content) {
      document += response.choices[0].message.content;
    }

    // Save the document
    const referencesDir = path.join(path.dirname(envPath), 'references');
    if (!fs.existsSync(referencesDir)) {
      fs.mkdirSync(referencesDir, { recursive: true });
    }

    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const filename = `research_${searchQuery.replace(/\s+/g, '_').substring(0, 30)}_${timestamp}.md`;
    const filepath = path.join(referencesDir, filename);

    fs.writeFileSync(filepath, document);

    console.log(
      createStyledOutput(`\n✅ Research document saved to: ${filepath}`, 'green')
    );
    console.log(
      createStyledOutput('\nDocument Preview:\n', 'brightMagenta')
    );
    console.log(document.substring(0, 500) + '...\n');
  } catch (error) {
    console.error(
      createStyledOutput(`Error during web search: ${error.message}`, 'red')
    );
  }

  rl.close();
}

webSearch();
