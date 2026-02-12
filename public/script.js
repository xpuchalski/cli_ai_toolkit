/**
 * AI Toolkit Web Interface Frontend
 * Handles tool selection and navigation
 */

document.addEventListener('DOMContentLoaded', init);

// DOM elements cache
const elements = {
  toolsGrid: document.getElementById('toolsGrid'),
  navButtons: document.querySelectorAll('.nav-btn'),
  sections: document.querySelectorAll('.section'),
  cliInput: document.getElementById('cliInput'),
  cliOutput: document.getElementById('cliOutput'),
  comingSoonSection: document.getElementById('comingSoon'),
};

// Tool configurations
const TOOLS = {
  1: { name: 'Web Search Agent', placeholder: 'Enter your search query:' },
  2: { name: 'Image Generation', placeholder: 'Enter image description:' },
  3: { name: 'Design Feedback', placeholder: 'Enter website URL:' },
};

// Utilities
function switchSection(sectionId) {
  elements.navButtons.forEach((b) => b.classList.remove('active'));
  elements.sections.forEach((s) => s.classList.remove('active'));

  const navBtn = Array.from(elements.navButtons).find((b) => b.dataset.section === sectionId);
  const section = document.getElementById(sectionId);

  if (navBtn) navBtn.classList.add('active');
  if (section) section.classList.add('active');
}

function init() {
  setupNavigation();
  loadTools();
  setupCLI();
}

function setupNavigation() {
  elements.navButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      const sectionId = btn.dataset.section;
      switchSection(sectionId);
      addCLILine(`command: navigate to ${sectionId}`, 'command');
      addCLILine(`Switched to ${sectionId} section`, 'success');
    });
  });
}

async function loadTools() {
  try {
    const response = await fetch('/api/tools');
    const data = await response.json();

    elements.toolsGrid.innerHTML = data.tools
      .map(
        (tool) => `
      <div class="tool-card">
        <span class="tool-icon">${tool.icon}</span>
        <h3>${tool.name}</h3>
        <p>${tool.description}</p>
        <button class="tool-btn" onclick="selectTool(${tool.id}, '${tool.name}')">
          Launch Tool
        </button>
      </div>
    `
      )
      .join('');
  } catch (error) {
    console.error('Failed to load tools:', error);
    elements.toolsGrid.innerHTML = '<p>Error loading tools. Please try again.</p>';
    addCLILine('Error loading tools', 'error');
  }
}

function selectTool(toolId, toolName) {
  switchSection('comingSoon');
  addCLILine(`command: select-tool ${toolId}`, 'command');
  addCLILine(`Selected: ${toolName}`, 'success');

  const promptText = TOOLS[toolId]?.placeholder || 'Enter input:';
  const message = `
    <div class="coming-soon">
      <h2>${toolName}</h2>
      <div class="tool-input-form">
        <input type="text" id="toolInput" class="tool-input-field" placeholder="${promptText}" />
        <button class="tool-execute-btn" onclick="executeTool(${toolId}, '${toolName}')">Execute</button>
      </div>
      <p class="note">
        Tip: Enter your query above and click Execute to run the tool.
      </p>
    </div>
  `;
  elements.comingSoonSection.innerHTML = message;
  setTimeout(() => document.getElementById('toolInput')?.focus(), 100);
}

async function executeTool(toolId, toolName) {
  const input = document.getElementById('toolInput');
  const query = input?.value.trim() || '';

  if (!query) {
    addCLILine('Error: Input cannot be empty', 'error');
    return;
  }

  addCLILine(`command: execute ${toolId} "${query}"`, 'command');
  addCLILine(`Executing ${toolName}...`, 'output');

  try {
    const response = await fetch('/api/execute', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ toolId, query }),
    });

    const data = await response.json();

    if (data.success) {
      addCLILine(`${toolName} completed successfully`, 'success');
      addCLILine('Result:', 'output');
      data.result.split('\n').forEach((line) => {
        if (line.trim()) {
          addCLILine(`  ${line}`, 'output');
        }
      });
    } else {
      addCLILine(`Error: ${data.error}`, 'error');
    }
  } catch (error) {
    addCLILine(`Error: ${error.message}`, 'error');
  }
}

function setupCLI() {
  elements.cliInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      const command = elements.cliInput.value.trim();
      if (command) {
        addCLILine(`$ ${command}`, 'command');
        executeCLICommand(command);
        elements.cliInput.value = '';
      }
    }
  });
  elements.cliInput.focus();
}

function addCLILine(text, type = 'output') {
  const line = document.createElement('div');
  line.className = `cli-line ${type}`;
  line.textContent = text;
  elements.cliOutput.appendChild(line);
  elements.cliOutput.scrollTop = elements.cliOutput.scrollHeight;
}

function clearCLI() {
  elements.cliOutput.innerHTML = '';
  addCLILine('CLI cleared', 'success');
  elements.cliInput.focus();
}

const CLI_COMMANDS = {
  help: () => {
    addCLILine('Available commands:', 'output');
    addCLILine('  help             - Show this help message', 'output');
    addCLILine('  clear            - Clear the CLI output', 'output');
    addCLILine('  tools            - List available tools', 'output');
    addCLILine('  search [query]   - Execute web search', 'output');
    addCLILine('  image [prompt]   - Generate image', 'output');
    addCLILine('  about            - Show about information', 'output');
    addCLILine('  version          - Show version information', 'output');
    addCLILine('  status           - Show toolkit status', 'output');
  },
  clear: () => clearCLI(),
  tools: () => {
    addCLILine('Available Tools:', 'output');
    addCLILine('  1. Web Search Agent - search or search [query]', 'output');
    addCLILine('  2. Image Generation - image or image [prompt]', 'output');
    addCLILine('  3. Design Feedback  - Not implemented via web', 'output');
  },
  about: () => {
    addCLILine('AI Toolkit v1.0.0', 'output');
    addCLILine('A web-based interface for AI-powered tools', 'output');
  },
  version: () => addCLILine('AI Toolkit version 1.0.0', 'success'),
  status: () => {
    addCLILine('Toolkit Status: Running', 'success');
    addCLILine('Server: http://localhost:3000', 'output');
    addCLILine('Connected: Yes', 'success');
  },
};

function executeCLICommand(command) {
  const cmd = command.toLowerCase().trim();

  if (!cmd) return;

  // Direct commands
  if (CLI_COMMANDS[cmd]) {
    CLI_COMMANDS[cmd]();
    return;
  }

  // Search command
  if (cmd.startsWith('search')) {
    const query = cmd.substring(6).trim();
    if (!query) {
      addCLILine('Usage: search [query]', 'error');
      return;
    }
    executeTool(1, 'Web Search Agent');
    const input = document.getElementById('toolInput');
    if (input) input.value = query;
    addCLILine('Input populated with query', 'success');
    return;
  }

  // Image command
  if (cmd.startsWith('image')) {
    const prompt = cmd.substring(5).trim();
    if (!prompt) {
      addCLILine('Usage: image [prompt]', 'error');
      return;
    }
    executeTool(2, 'Image Generation');
    const input = document.getElementById('toolInput');
    if (input) input.value = prompt;
    addCLILine('Input populated with prompt', 'success');
    return;
  }

  // Navigate command
  if (cmd.startsWith('navigate ')) {
    const section = cmd.substring(9).trim();
    const btn = Array.from(elements.navButtons).find((b) => b.dataset.section === section);
    if (btn) {
      btn.click();
    } else {
      addCLILine(`Section '${section}' not found`, 'error');
    }
    return;
  }

  // Unknown command
  addCLILine(`command not found: ${cmd}`, 'error');
  addCLILine(`Type 'help' for available commands`, 'output');
}

window.addEventListener('load', () => {
  const toolsBtn = elements.navButtons[0];
  if (toolsBtn) toolsBtn.click();
});
