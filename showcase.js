#!/usr/bin/env node
/**
 * Display a beautiful feature showcase
 */

import { createHeader, createStyledOutput } from './colors.js';

console.clear();
console.log(createHeader('🤖 AI TOOLKIT - FEATURE SHOWCASE'));

console.log(`
${createStyledOutput('THREE POWERFUL AI TOOLS AT YOUR FINGERTIPS', 'bright')}

${createStyledOutput('━'.repeat(70), 'brightMagenta')}

${createStyledOutput('1️⃣  WEB SEARCH AGENT', 'bright')}
   ${createStyledOutput('Search the web and generate research documents', 'cyan')}
   
   Model: OpenAI GPT-4 with web search
   Use Case: Research topics with current information
   Output: Markdown documents saved to references/
   
   ${createStyledOutput('Example:', 'dim')}
   Query: "AI trends 2026"
   Output: research_AI_trends_2026_[timestamp].md
   
   ${createStyledOutput('Command:', 'yellow')} npm run web-search
   ${createStyledOutput('Cost:', 'yellow')} Free (uses API credits)

${createStyledOutput('━'.repeat(70), 'brightMagenta')}

${createStyledOutput('2️⃣  IMAGE GENERATION', 'bright')}
   ${createStyledOutput('Create high-quality images with DALL-E 3', 'cyan')}
   
   Model: OpenAI DALL-E 3
   Use Case: Generate assets for websites, presentations, etc.
   Output: PNG images saved to images/
   Sizes: 1024x1024, 1024x1792, 1792x1024
   
   ${createStyledOutput('Example:', 'dim')}
   Prompt: "Modern purple dashboard, dark background"
   Size: 1024x1024
   Output: image_[timestamp].png
   
   ${createStyledOutput('Command:', 'yellow')} npm run generate-image
   ${createStyledOutput('Cost:', 'yellow')} ~$0.05-$0.25 per image

${createStyledOutput('━'.repeat(70), 'brightMagenta')}

${createStyledOutput('3️⃣  DESIGN FEEDBACK', 'bright')}
   ${createStyledOutput('Get AI feedback on website design', 'cyan')}
   
   Tools: Playwright (screenshots) + Google Gemini (analysis)
   Use Case: Website design critique and recommendations
   Output: Screenshots + feedback reports
   
   Analyzes:
   ${createStyledOutput('   ✓ Visual design & aesthetics', 'cyan')}
   ${createStyledOutput('   ✓ Color harmony and typography', 'cyan')}
   ${createStyledOutput('   ✓ Layout and spacing', 'cyan')}
   ${createStyledOutput('   ✓ Navigation clarity', 'cyan')}
   ${createStyledOutput('   ✓ Brand identity', 'cyan')}
   ${createStyledOutput('   ✓ Accessibility', 'cyan')}
   ${createStyledOutput('   ✓ Top recommendations', 'cyan')}
   
   ${createStyledOutput('Example:', 'dim')}
   URL: https://example.com
   Outputs:
     - screenshots/screenshot_[timestamp].png
     - references/ai_feedback/feedback_[timestamp].md
   
   ${createStyledOutput('Command:', 'yellow')} npm run design-feedback
   ${createStyledOutput('Cost:', 'yellow')} Free (uses API credits)

${createStyledOutput('━'.repeat(70), 'brightMagenta')}

${createStyledOutput('QUICK START', 'bright')}

   ${createStyledOutput('Interactive Menu (Recommended):', 'cyan')}
   ${createStyledOutput('   npm start', 'yellow')}
   
   ${createStyledOutput('Individual Commands:', 'cyan')}
   ${createStyledOutput('   npm run web-search', 'yellow')}
   ${createStyledOutput('   npm run generate-image', 'yellow')}
   ${createStyledOutput('   npm run design-feedback', 'yellow')}
   
   ${createStyledOutput('Help & Information:', 'cyan')}
   ${createStyledOutput('   node help.js', 'yellow')}
   ${createStyledOutput('   node check-config.js', 'yellow')}
   ${createStyledOutput('   cat README.md', 'yellow')}

${createStyledOutput('━'.repeat(70), 'brightMagenta')}

${createStyledOutput('OUTPUT DIRECTORIES', 'bright')}

   ${createStyledOutput('references/', 'cyan')}          Web search documents
   ${createStyledOutput('references/ai_feedback/', 'cyan')} Design feedback reports
   ${createStyledOutput('images/', 'cyan')}              Generated images (PNG)
   ${createStyledOutput('screenshots/', 'cyan')}         Website screenshots (PNG)

${createStyledOutput('━'.repeat(70), 'brightMagenta')}

${createStyledOutput('API CONFIGURATION', 'bright')}

   ${createStyledOutput('✅ OPENAI_API_KEY', 'green')}      Configured (from api_keys.env)
   ${createStyledOutput('✅ GEMINI_API_KEY', 'green')}      Configured (from api_keys.env)
   
   Both keys are pre-loaded and ready to use.
   Do not share api_keys.env in public repositories!

${createStyledOutput('━'.repeat(70), 'brightMagenta')}

${createStyledOutput('TECHNOLOGY STACK', 'bright')}

   ${createStyledOutput('Web Search:', 'cyan')}      OpenAI GPT-4
   ${createStyledOutput('Images:', 'cyan')}         OpenAI DALL-E 3
   ${createStyledOutput('Feedback:', 'cyan')}       Google Gemini Vision
   ${createStyledOutput('Screenshots:', 'cyan')}    Playwright Chromium
   ${createStyledOutput('Colors:', 'cyan')}         #5C416A (accent), #141414, #c8cfc2

${createStyledOutput('━'.repeat(70), 'brightMagenta')}

${createStyledOutput('DESIGN & BRANDING', 'bright')}

   ${createStyledOutput('Accent Color:', 'cyan')}     #5C416A (Purple)
   ${createStyledOutput('Dark Color:', 'cyan')}       #141414 (Near Black)
   ${createStyledOutput('Light Color:', 'cyan')}      #c8cfc2 (Warm Gray)
   
   All tools use consistent color-coded terminal interface.

${createStyledOutput('━'.repeat(70), 'brightMagenta')}

${createStyledOutput('WORKFLOW EXAMPLES', 'bright')}

   ${createStyledOutput('Research & Design Assets:', 'cyan')}
     1. npm run web-search        → Research topic
     2. npm run generate-image    → Create visuals
     3. npm run design-feedback   → Review composition

   ${createStyledOutput('Website Development:', 'cyan')}
     1. npm run design-feedback   → Analyze current site
     2. npm run generate-image    → Create hero image
     3. npm run generate-image    → Add additional graphics

   ${createStyledOutput('Content Creation:', 'cyan')}
     1. npm run web-search        → Find latest info
     2. npm run generate-image    → Visualize content
     3. npm run design-feedback   → Review layout

${createStyledOutput('━'.repeat(70), 'brightMagenta')}

${createStyledOutput('DOCUMENTATION', 'bright')}

   ${createStyledOutput('README.md', 'cyan')}           Full documentation and setup guide
   ${createStyledOutput('QUICKSTART.md', 'cyan')}       Quick reference and examples
   ${createStyledOutput('SETUP_COMPLETE.md', 'cyan')}   Setup summary
   ${createStyledOutput('FEATURES_OVERVIEW.md', 'cyan')} Feature list
   ${createStyledOutput('PLAYWRIGHT_SETUP.md', 'cyan')} Browser automation details
   ${createStyledOutput('help.js', 'cyan')}             Interactive help (node help.js)

${createStyledOutput('━'.repeat(70), 'brightMagenta')}

${createStyledOutput('NEXT STEPS', 'bright')}

   1. Run configuration check:
      ${createStyledOutput('node check-config.js', 'yellow')}
   
   2. View documentation:
      ${createStyledOutput('cat README.md | less', 'yellow')}
   
   3. Start using the toolkit:
      ${createStyledOutput('npm start', 'yellow')}

${createStyledOutput('━'.repeat(70), 'brightMagenta')}

${createStyledOutput('Your AI Toolkit is ready! 🚀', 'green')}

Start with: ${createStyledOutput('npm start', 'brightMagenta')}

`);
