#!/usr/bin/env node
/**
 * AI Toolkit Help & Documentation
 */

import { createHeader, createStyledOutput } from './colors.js';

console.log(createHeader('AI TOOLKIT - COMPLETE DOCUMENTATION'));

console.log(`
${createStyledOutput('1. WEB SEARCH AGENT', 'bright')}
${createStyledOutput('━'.repeat(50), 'brightMagenta')}
Uses OpenAI GPT-4 with web search capabilities to research topics
and generate up-to-date documents.

${createStyledOutput('Command:', 'cyan')} npm run web-search

${createStyledOutput('What it does:', 'cyan')}
- Searches the web for current information
- Synthesizes findings with GPT-4
- Creates a markdown research document
- Saves with timestamp to references/

${createStyledOutput('Example:', 'cyan')}
Search Query: "Latest AI trends January 2026"
Output: research_Latest_AI_trends_January_2026_[timestamp].md

${createStyledOutput('Cost:', 'yellow')} Free (uses API credits)


${createStyledOutput('2. IMAGE GENERATION', 'bright')}
${createStyledOutput('━'.repeat(50), 'brightMagenta')}
Uses OpenAI DALL-E 3 to generate high-quality images from text descriptions.

${createStyledOutput('Command:', 'cyan')} npm run generate-image

${createStyledOutput('What it does:', 'cyan')}
- Accepts detailed image descriptions
- Generates using DALL-E 3 model
- Automatically downloads the image
- Saves as PNG to images/

${createStyledOutput('Image Sizes:', 'cyan')}
- 1024x1024 (square, default)
- 1024x1792 (portrait/tall)
- 1792x1024 (landscape/wide)

${createStyledOutput('Example:', 'cyan')}
Prompt: "A modern website hero section with purple accents and dark background"
Size: 1024x1792
Output: image_[timestamp].png

${createStyledOutput('Cost:', 'yellow')} ~$0.05-$0.25 per image

${createStyledOutput('💡 Tips:', 'cyan')}
- Be descriptive with colors and style
- Mention mood/atmosphere
- Specify art direction (minimalist, realistic, etc.)


${createStyledOutput('3. DESIGN FEEDBACK', 'bright')}
${createStyledOutput('━'.repeat(50), 'brightMagenta')}
Screenshots websites and uses Google Gemini for detailed design feedback.

${createStyledOutput('Command:', 'cyan')} npm run design-feedback

${createStyledOutput('What it does:', 'cyan')}
- Takes 1280x800 screenshot of website
- Analyzes using Gemini Vision model
- Provides comprehensive design feedback
- Saves screenshot to screenshots/
- Saves detailed report to references/ai_feedback/

${createStyledOutput('Feedback includes:', 'cyan')}
✓ Visual design & aesthetics analysis
✓ Color scheme and palette harmony
✓ Typography quality
✓ Layout and spacing evaluation
✓ Navigation clarity
✓ Call-to-action effectiveness
✓ Brand identity assessment
✓ Accessibility review
✓ Top 3 improvement recommendations

${createStyledOutput('Example:', 'cyan')}
URL: https://example.com
Output: 
  - Screenshot: screenshots/screenshot_[timestamp].png
  - Feedback: references/ai_feedback/feedback_[timestamp].md

${createStyledOutput('Cost:', 'yellow')} Free (uses API credits)

${createStyledOutput('Requirements:', 'yellow')}
- Valid website URL (include https://)
- Website must be publicly accessible
- No JavaScript blocking automation


${createStyledOutput('QUICK START', 'bright')}
${createStyledOutput('━'.repeat(50), 'brightMagenta')}

${createStyledOutput('1. Interactive Menu (Recommended)', 'cyan')}
   npm start

${createStyledOutput('2. Verify Setup', 'cyan')}
   node check-config.js

${createStyledOutput('3. Run Individual Tools', 'cyan')}
   npm run web-search
   npm run generate-image
   npm run design-feedback


${createStyledOutput('OUTPUT DIRECTORIES', 'bright')}
${createStyledOutput('━'.repeat(50), 'brightMagenta')}

references/              - Web research documents (markdown)
references/ai_feedback/  - Design feedback reports (markdown)
images/                  - Generated images (PNG)
screenshots/             - Website screenshots (PNG)


${createStyledOutput('COLOR PALETTE', 'bright')}
${createStyledOutput('━'.repeat(50), 'brightMagenta')}

🟪 Accent:  #5C416A (Purple)
⬛ Dark:    #141414 (Near Black)
⬜ Light:   #c8cfc2 (Warm Gray)


${createStyledOutput('API KEYS', 'bright')}
${createStyledOutput('━'.repeat(50), 'brightMagenta')}

Both API keys are loaded from api_keys.env:
${createStyledOutput('OPENAI_API_KEY', 'cyan')}     - For web search & image generation
${createStyledOutput('GEMINI_API_KEY', 'cyan')}     - For design feedback

The keys are already configured. Do not commit api_keys.env!


${createStyledOutput('TROUBLESHOOTING', 'bright')}
${createStyledOutput('━'.repeat(50), 'brightMagenta')}

${createStyledOutput('"Module not found" errors', 'yellow')}
→ npm install

${createStyledOutput('Playwright errors', 'yellow')}
→ npx playwright install chromium

${createStyledOutput('API Key errors', 'yellow')}
→ Verify api_keys.env has both keys
→ Check keys are valid and have credits

${createStyledOutput('Design Feedback timeout', 'yellow')}
→ Use full URL: https://example.com
→ Avoid sites with anti-automation
→ Verify internet connection

${createStyledOutput('Get help', 'cyan')}
node help.js           - Show this help
node check-config.js  - Verify setup
cat README.md         - Full documentation


${createStyledOutput('WORKFLOW EXAMPLES', 'bright')}
${createStyledOutput('━'.repeat(50), 'brightMagenta')}

${createStyledOutput('Research & Generate Assets', 'cyan')}
  npm run web-search        # Research topic
  npm run generate-image    # Create visuals
  npm run design-feedback   # Get feedback on design

${createStyledOutput('Website Development', 'cyan')}
  npm run design-feedback   # Analyze current site
  npm run generate-image    # Create hero image
  npm run generate-image    # Add graphics

${createStyledOutput('Content Creation', 'cyan')}
  npm run web-search        # Find latest info
  npm run generate-image    # Create visuals
  npm run design-feedback   # Review composition


${createStyledOutput('DEPENDENCIES', 'bright')}
${createStyledOutput('━'.repeat(50), 'brightMagenta')}
openai@^4.28.4          - OpenAI API client
dotenv@^16.3.1          - Environment variables
playwright@^1.40.0      - Browser automation
@google/generative-ai@^0.3.0 - Google Gemini API


${createStyledOutput('LICENSE & NOTES', 'bright')}
${createStyledOutput('━'.repeat(50), 'brightMagenta')}
MIT License
All outputs are automatically timestamped and organized
Generated content is stored locally, not uploaded
API costs apply based on usage (web search & images)

---
${createStyledOutput('AI Toolkit v1.0.0', 'brightMagenta')} | Powered by OpenAI & Google Gemini
`);
