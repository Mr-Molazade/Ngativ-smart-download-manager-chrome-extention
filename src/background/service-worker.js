import { initializeState, getState, addHistory } from '../storage/storage.js';
import { matchRule, destinationFor } from '../rules/rule-engine.js';
import { normalizeHostname } from '../utils/domain.js';

initializeState().catch(console.error);

function bestSource(item) {
  return item?.referrer || item?.finalUrl || item?.url || '';
}

chrome.downloads.onDeterminingFilename.addListener((item, suggest) => {
  (async () => {
    const state = await getState();
    const source = bestSource(item);
    let hostname = '';
    try { hostname = normalizeHostname(source); } catch {}
    const rule = state.settings.enabled ? matchRule(hostname, state.rules) : null;
    const folder = rule ? destinationFor(rule, state.settings.fallbackFolder) : destinationFor(null, state.settings.fallbackFolder);
    const original = typeof item.filename === 'string' ? item.filename.split(/[/\\]/).pop() : 'download';
    const safeName = original.replace(/^[/\\]+/, '');
    const target = `${folder}/${safeName}`;
    suggest({ filename: target, conflictAction: 'uniquify' });

    await addHistory({
      id: item.id,
      filename: safeName,
      source: hostname || 'Unknown',
      destination: folder,
      rule: rule?.name || null,
      status: rule ? 'Routed' : 'Fallback',
      timestamp: Date.now()
    });
  })().catch(error => { console.error('Routing error:', error); suggest(); });
  return true;
});

chrome.downloads.onChanged.addListener(async delta => {
  if (!delta.state?.current) return;
  const state = await getState();
  const item = state.recentDownloads.find(x => x.id === delta.id);
  if (!item) return;
  const status = delta.state.current === 'complete' ? 'Completed' : delta.state.current === 'interrupted' ? 'Failed' : item.status;
  if (status !== item.status) {
    item.status = status;
    await chrome.storage.local.set({ recentDownloads: state.recentDownloads });
  }
});
