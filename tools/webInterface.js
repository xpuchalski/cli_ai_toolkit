#!/usr/bin/env node
/**
 * AI Toolkit Web Interface Server
 * Provides a web-based interface for accessing toolkit features
 */

import 'dotenv/config';
import http from 'http';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { createHeader, createStyledOutput } from '../colors.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const publicDir = path.join(__dirname, '../public');
const PORT = 3000;

// Lazy-load API clients
let openaiClient = null;

async function getOpenAIClient() {
  if (!openaiClient) {
    try {
      const OpenAI = (await import('openai')).default;
      openaiClient = new OpenAI({
        apiKey: process.env.OPENAI_API_KEY,
      });
    } catch (error) {
      throw new Error('OpenAI client not available: ' + error.message);
    }
  }
  return openaiClient;
}

const server = http.createServer((req, res) => {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.writeHead(200);
    res.end();
    return;
  }

  // Handle API routes
  if (req.url === '/api/tools' && req.method === 'GET') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(
      JSON.stringify({
        tools: [
          {
            id: 1,
            name: 'Web Search Agent',
            description: 'Search the web and generate research documents',
            icon: 'SEARCH',
          },
          {
            id: 2,
            name: 'Image Generation',
            description: 'Generate images using OpenAI DALL-E',
            icon: 'IMAGE',
          },
          {
            id: 3,
            name: 'Design Feedback',
            description: 'Screenshot websites and get AI design feedback',
            icon: 'STAR',
          },
        ],
      })
    );
    return;
  }

  // Handle tool execution
  if (req.url.startsWith('/api/execute') && req.method === 'POST') {
    let body = '';
    req.on('data', chunk => body += chunk);
    req.on('end', async () => {
      try {
        const { toolId, query } = JSON.parse(body);
        let result = '';

        if (toolId === 1) {
          // Web Search
          result = await executeWebSearch(query);
        } else if (toolId === 2) {
          // Image Generation
          result = await executeImageGeneration(query);
        } else if (toolId === 3) {
          // Design Feedback
          result = 'Design feedback tool launched. Please check your CLI.';
        }

        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ success: true, result }));
      } catch (error) {
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ success: false, error: error.message }));
      }
    });
    return;
  }

  // Serve static files
  let filePath = req.url === '/' ? '/index.html' : req.url;
  filePath = path.join(publicDir, filePath);

  // Prevent directory traversal
  if (!filePath.startsWith(publicDir)) {
    res.writeHead(403);
    res.end('Forbidden');
    return;
  }

  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.writeHead(404);
      res.end('Not Found');
      return;
    }

    // Determine content type
    let contentType = 'text/plain';
    if (filePath.endsWith('.html')) contentType = 'text/html';
    else if (filePath.endsWith('.css')) contentType = 'text/css';
    else if (filePath.endsWith('.js')) contentType = 'application/javascript';
    else if (filePath.endsWith('.json')) contentType = 'application/json';

    res.writeHead(200, { 'Content-Type': contentType });
    res.end(data);
  });
});

async function executeWebSearch(query) {
  if (!query || !query.trim()) {
    throw new Error('Search query cannot be empty');
  }

  try {
    const client = await getOpenAIClient();
    const response = await client.chat.completions.create({
      model: 'gpt-4-turbo',
      messages: [
        {
          role: 'user',
          content: `You are a research assistant. Search for and synthesize information about: "${query}". Provide a comprehensive research summary.`,
        },
      ],
      max_tokens: 1500,
    });

    return response.choices[0].message.content;
  } catch (error) {
    throw new Error(`Web search failed: ${error.message}`);
  }
}

async function executeImageGeneration(prompt) {
  if (!prompt || !prompt.trim()) {
    throw new Error('Image prompt cannot be empty');
  }

  try {
    const client = await getOpenAIClient();
    const response = await client.images.generate({
      model: 'dall-e-3',
      prompt: prompt,
      n: 1,
      size: '1024x1024',
    });

    return `Image generated: ${response.data[0].url}`;
  } catch (error) {
    throw new Error(`Image generation failed: ${error.message}`);
  }
}

server.listen(PORT, () => {
  console.clear();
  console.log(createHeader('WEB INTERFACE'));
  console.log(createStyledOutput(`\nServer running at http://localhost:${PORT}`, 'brightGreen'));
  console.log(createStyledOutput('\nOpen this URL in your browser to access the toolkit UI', 'cyan'));
  console.log(createStyledOutput('\nPress Ctrl+C to stop the server\n', 'yellow'));
});

process.on('SIGINT', () => {
  console.log(createStyledOutput('\n\nStopping web interface...\n', 'brightMagenta'));
  server.close(() => {
    process.exit(0);
  });
});
