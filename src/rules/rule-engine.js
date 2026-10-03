import { domainMatches, sanitizeFolder } from '../utils/domain.js';
export function matchRule(hostname, rules) {
  if (!hostname || !Array.isArray(rules)) return null;
  return rules.find(rule => rule?.enabled && Array.isArray(rule.domains) && rule.domains.some(domain => domainMatches(hostname, domain))) || null;
}
export function destinationFor(rule, fallbackFolder) { return sanitizeFolder(rule?.folder, sanitizeFolder(fallbackFolder, 'Other')); }
