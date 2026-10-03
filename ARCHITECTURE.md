# Architecture

## Data flow
`DownloadItem -> source signal -> hostname normalization -> rule matching -> destination sanitization -> filename suggestion -> local history`

## State
The storage module is the single source of persisted state:
- `rules`
- `settings`
- `recentDownloads`

## Security boundaries
All domain, folder, filename and text inputs are treated as untrusted. Destination folders are relative to Chrome's Downloads directory and sanitize path separators, traversal markers and invalid filename characters.

## Graceful degradation
If routing is disabled, no rule matches, or source identification fails, the download is not blocked. The extension suggests the configured fallback folder.
