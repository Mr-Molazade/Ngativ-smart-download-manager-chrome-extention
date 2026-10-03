export const DEFAULT_RULES = [
  { id: crypto.randomUUID(), name: 'ChatGPT', domains: ['chatgpt.com'], folder: 'ChatGPT', enabled: true },
  { id: crypto.randomUUID(), name: 'Gemini', domains: ['gemini.google.com'], folder: 'Gemini', enabled: true },
  { id: crypto.randomUUID(), name: 'Claude', domains: ['claude.ai'], folder: 'Claude', enabled: true },
  { id: crypto.randomUUID(), name: 'YouTube', domains: ['youtube.com', 'www.youtube.com'], folder: 'YouTube', enabled: true },
  { id: crypto.randomUUID(), name: 'Google Drive', domains: ['drive.google.com'], folder: 'Google Drive', enabled: true },
  { id: crypto.randomUUID(), name: 'Perplexity', domains: ['perplexity.ai', 'www.perplexity.ai'], folder: 'Perplexity', enabled: true }
];
export const DEFAULT_SETTINGS = { enabled: true, fallbackFolder: 'Other', historyLimit: 30 };
