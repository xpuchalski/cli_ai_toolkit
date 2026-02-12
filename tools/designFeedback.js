import 'dotenv/config';
import { chromium } from 'playwright';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { createHeader, createStyledOutput } from '../colors.js';
import readline from 'readline';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { config } from 'dotenv';

// Load API keys from api_keys.env
const envPath = path.join(path.dirname(fileURLToPath(import.meta.url)), '../api_keys.env');
config({ path: envPath });

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

async function designFeedback() {
  console.log(createHeader('DESIGN FEEDBACK AGENT'));

  const websiteUrl = await question(
    createStyledOutput('Enter website URL (e.g., https://example.com): ', 'cyan')
  );

  if (!websiteUrl.trim()) {
    console.log(createStyledOutput('URL cannot be empty', 'red'));
    rl.close();
    return;
  }

  try {
    console.log(createStyledOutput('\n📸 Taking screenshot...', 'brightMagenta'));

    // Launch browser and take screenshot
    const browser = await chromium.launch({ headless: true });
    const page = await browser.newPage();
    
    // Set viewport to common desktop size
    await page.setViewportSize({ width: 1280, height: 800 });
    
    // Navigate to URL
    await page.goto(websiteUrl, { waitUntil: 'networkidle' });

    // Create screenshots directory
    const screenshotsDir = path.join(__dirname, '../screenshots');
    if (!fs.existsSync(screenshotsDir)) {
      fs.mkdirSync(screenshotsDir, { recursive: true });
    }

    // Take screenshot
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const screenshotPath = path.join(screenshotsDir, `screenshot_${timestamp}.png`);
    await page.screenshot({ path: screenshotPath });

    await browser.close();

    console.log(createStyledOutput(`✅ Screenshot saved: ${screenshotPath}`, 'green'));

    // Send to Gemini for feedback
    console.log(
      createStyledOutput('\n🤖 Analyzing design with Gemini...', 'brightMagenta')
    );

    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: 'gemini-pro-vision' });

    // Read screenshot
    const imageBuffer = fs.readFileSync(screenshotPath);
    const base64Image = imageBuffer.toString('base64');

    const result = await model.generateContent([
      {
        inlineData: {
          mimeType: 'image/png',
          data: base64Image,
        },
      },
      {
        text: `You are an expert UI/UX design consultant. Please analyze this website screenshot and provide detailed feedback on:

1. Visual Design & Aesthetics
   - Color scheme and palette harmony
   - Typography choices and readability
   - Layout and spacing

2. User Experience
   - Navigation clarity
   - Call-to-action visibility and effectiveness
   - Information hierarchy

3. Brand & Identity
   - Visual consistency
   - Brand positioning
   - Professional appearance

4. Accessibility
   - Color contrast adequacy
   - Text readability
   - Mobile responsiveness indicators

5. Improvements & Recommendations
   - Top 3 design improvements
   - Quick wins for better UX
   - Specific, actionable feedback

Please be constructive and provide detailed, actionable suggestions.`,
      },
    ]);

    const feedback = result.response.text();

    // Save feedback
    const feedbackDir = path.join(__dirname, '../references/ai_feedback');
    if (!fs.existsSync(feedbackDir)) {
      fs.mkdirSync(feedbackDir, { recursive: true });
    }

    const feedbackPath = path.join(
      feedbackDir,
      `feedback_${timestamp}.md`
    );

    const feedbackDocument = `# Design Feedback Report

**Website:** ${websiteUrl}
**Date:** ${new Date().toISOString()}
**Screenshot:** ${path.basename(screenshotPath)}

---

${feedback}
`;

    fs.writeFileSync(feedbackPath, feedbackDocument);

    console.log(
      createStyledOutput(`✅ Feedback saved to: ${feedbackPath}`, 'green')
    );
    console.log(
      createStyledOutput('\nFeedback Summary:\n', 'brightMagenta')
    );
    console.log(feedback.substring(0, 800) + '...\n');
  } catch (error) {
    if (error.code === 'ERR_HTTP_REQUEST_TIMEOUT' || error.message.includes('Timeout')) {
      console.error(
        createStyledOutput(
          'Error: Website took too long to load. Please check the URL and try again.',
          'red'
        )
      );
    } else if (error.message.includes('net::ERR_NAME_NOT_RESOLVED')) {
      console.error(
        createStyledOutput(
          'Error: Could not resolve the website address. Please check the URL.',
          'red'
        )
      );
    } else {
      console.error(
        createStyledOutput(`Error: ${error.message}`, 'red')
      );
    }
  }

  rl.close();
}

designFeedback();
