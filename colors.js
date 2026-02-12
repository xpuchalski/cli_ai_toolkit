// Color scheme for the AI Toolkit
export const colors = {
  accent: '#5C416A',      // Primary accent (purple)
  dark: '#141414',        // Dark working color
  light: '#c8cfc2',       // Light working color
};

// Terminal color codes
export const terminalColors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  dim: '\x1b[2m',
  
  // Foreground colors
  black: '\x1b[30m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m',
  white: '\x1b[37m',
  
  // Bright colors
  brightMagenta: '\x1b[95m',
  brightCyan: '\x1b[96m',
};

export function createStyledOutput(text, color = 'brightMagenta') {
  return `${terminalColors[color]}${text}${terminalColors.reset}`;
}

export function createHeader(title) {
  return `\n${createStyledOutput('═'.repeat(50), 'brightMagenta')}\n${createStyledOutput(`  ${title}`, 'bright')}${createStyledOutput('═'.repeat(50 - title.length - 2), 'brightMagenta')}\n`;
}
