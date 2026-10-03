export function normalizeHostname(input) {
  if (!input || typeof input !== 'string') return '';
  let value = input.trim().toLowerCase();
  try { value = new URL(value.includes('://') ? value : `https://${value}`).hostname; } catch { value = value.replace(/^https?:\/\//, '').split('/')[0]; }
  value = value.replace(/^www\./, '').replace(/\.$/, '');
  return value;
}
export function domainMatches(hostname, ruleDomain) {
  const host = normalizeHostname(hostname);
  const rule = normalizeHostname(ruleDomain);
  return Boolean(host && rule && (host === rule || host.endsWith(`.${rule}`)));
}
export function sanitizeFolder(value, fallback = 'Other') {
  if (typeof value !== 'string') return fallback;
  const cleaned = value.trim().replace(/[\\/:*?"<>|]/g, '-').replace(/\.\./g, '').replace(/^\.+|\.+$/g, '').replace(/\s+/g, ' ');
  return cleaned.slice(0, 120) || fallback;
}
export function sanitizeText(value, max = 120) { return typeof value === 'string' ? value.trim().replace(/[<>]/g, '').slice(0, max) : ''; }
