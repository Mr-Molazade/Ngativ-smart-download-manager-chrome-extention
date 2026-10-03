import { DEFAULT_RULES, DEFAULT_SETTINGS } from '../config.js';
const KEYS = ['rules', 'settings', 'recentDownloads'];
export async function getState() {
  const state = await chrome.storage.local.get(KEYS);
  return { rules: Array.isArray(state.rules) ? state.rules : DEFAULT_RULES, settings: { ...DEFAULT_SETTINGS, ...(state.settings || {}) }, recentDownloads: Array.isArray(state.recentDownloads) ? state.recentDownloads : [] };
}
export async function initializeState() {
  const state = await getState();
  await chrome.storage.local.set(state);
  return state;
}
export async function saveState(state) { await chrome.storage.local.set({ rules: state.rules, settings: state.settings, recentDownloads: state.recentDownloads }); }
export async function addHistory(entry) {
  const state = await getState();
  const history = [entry, ...state.recentDownloads].slice(0, Number(state.settings.historyLimit) || 30);
  await chrome.storage.local.set({ recentDownloads: history });
}
