import 'dotenv/config';
import OpenAI from 'openai';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { createHeader, createStyledOutput } from '../colors.js';
import readline from 'readline';
import https from 'https';
import { config } from 'dotenv';

// Load API keys from api_keys.env
const envPath = path.join(path.dirname(fileURLToPath(import.meta.url)), '../api_keys.env');
config({ path: envPath });

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

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

function downloadFile(url, filepath) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(filepath);
    https.get(url, (response) => {
      response.pipe(file);
      file.on('finish', () => {
        file.close();
        resolve();
      });
    }).on('error', (err) => {
      fs.unlink(filepath, () => {});
      reject(err);
    });
  });
}

async function generateImage() {
  console.log(createHeader('IMAGE GENERATION'));

  const prompt = await question(
    createStyledOutput('Enter image description: ', 'cyan')
  );

  if (!prompt.trim()) {
    console.log(createStyledOutput('Prompt cannot be empty', 'red'));
    rl.close();
    return;
  }

  const size = await question(
    createStyledOutput(
      'Image size (1024x1024, 1024x1792, 1792x1024) [default: 1024x1024]: ',
      'cyan'
    )
  );

  const imageSize = size.trim() || '1024x1024';
  if (!['1024x1024', '1024x1792', '1792x1024'].includes(imageSize)) {
    console.log(createStyledOutput('Invalid size. Using 1024x1024', 'yellow'));
  }

  console.log(
    createStyledOutput(`\n🎨 Generating ${imageSize} image...`, 'brightMagenta')
  );
  console.log(
    createStyledOutput('This may take a moment. Cost: ~5-25 cents', 'dim')
  );

  try {
    const response = await client.images.generate({
      model: 'dall-e-3',
      prompt: prompt,
      n: 1,
      size: imageSize,
      quality: 'standard',
    });

    const imageUrl = response.data[0].url;

    // Create images directory
    const imagesDir = path.join(__dirname, '../images');
    if (!fs.existsSync(imagesDir)) {
      fs.mkdirSync(imagesDir, { recursive: true });
    }

    // Download and save image
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const filename = `image_${timestamp}.png`;
    const filepath = path.join(imagesDir, filename);

    console.log(createStyledOutput('\n📥 Downloading image...', 'brightMagenta'));
    await downloadFile(imageUrl, filepath);

    console.log(
      createStyledOutput(`\n✅ Image saved to: ${filepath}`, 'green')
    );
    console.log(
      createStyledOutput(`Image URL: ${imageUrl}`, 'dim')
    );
  } catch (error) {
    console.error(
      createStyledOutput(`Error generating image: ${error.message}`, 'red')
    );
  }

  rl.close();
}

generateImage();
