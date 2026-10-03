# Smart Downloads Manager by ngativ

A lightweight Manifest V3 Chrome extension that intelligently routes downloads into user-defined folders based on their source website.

## Why it exists

Keep Downloads organized automatically:

```text
ChatGPT
   ↓
Downloads/ChatGPT/

Gemini
   ↓
Downloads/Gemini/

Unknown Website
   ↓
Downloads/Other/
```

## Features

- Dynamic rule engine with multiple domains per rule
- Default rules for ChatGPT, Gemini, Claude, YouTube, Google Drive and Perplexity
- Add, edit, delete, enable/disable and search rules
- Custom destination folders
- Configurable fallback folder (default: `Other`)
- Recent download history stored locally
- Source detection using available download URL/referrer/final URL signals
- Safe folder sanitization and `uniquify` conflict handling
- RTL Persian-first dashboard and compact popup
- No analytics or external network requests
- Manifest V3 architecture designed for local-first operation

## Installation

### For development / testing: Load unpacked

The easiest way to install this project while developing it is Chrome's **Load unpacked** flow.

1. Download the project ZIP.
2. Extract the ZIP into a normal folder.
3. Open Google Chrome.
4. Go to:

```text
chrome://extensions
```

5. Enable **Developer mode**.
6. Click **Load unpacked**.
7. Select the extracted project folder.
8. Make sure the folder you select contains `manifest.json` directly at its root.

Example:

```text
Smart-Downloads-Manager-ngativ/
├── manifest.json   ← this file must be here
├── popup/
├── options/
└── src/
```

After installation, pin the extension from Chrome's Extensions menu so its icon stays visible in the toolbar.

For a beginner-friendly, screenshot-ready walkthrough, read **[INSTALLATION.md](INSTALLATION.md)**.

### For normal end users

**Load unpacked** is intended mainly for development and testing. For public distribution, the extension should be prepared and published through the **Chrome Web Store**. Once published, users can install it through Chrome's normal **Add to Chrome** flow.

## First use

After loading the extension:

1. Open the extension popup.
2. Check that Routing is enabled.
3. Open the Dashboard.
4. Review the default rules.
5. Add or edit a rule.
6. Download a test file from a matching website.
7. Verify that the file was placed in the expected Downloads subfolder.

Example custom rule:

```text
Service Name: Example
Domain: example.com
Folder: Example
Enabled: On
```

Result:

```text
example.com → Downloads/Example/
```

## Architecture

- `src/background/service-worker.js`: download routing lifecycle
- `src/rules/rule-engine.js`: pure matching logic
- `src/storage/storage.js`: single persistence layer
- `src/utils/domain.js`: hostname and input normalization
- `popup/`: quick status and recent downloads
- `options/`: full rule management dashboard

See **[ARCHITECTURE.md](ARCHITECTURE.md)** for the data flow and security boundaries.

## Chrome API requirements

The extension uses Manifest V3 and the `downloads`, `storage`, and `tabs` permissions. Routing is performed through `chrome.downloads.onDeterminingFilename`.

## Known limitations

Chrome does not guarantee that the originating website is always available as a reliable signal. CDN, redirect, blob, temporary and application-specific download flows may expose a different URL or no useful source. In those cases the extension gracefully falls back to the configured fallback folder instead of intentionally breaking the download.

## Privacy

Rule data, settings and recent history remain in `chrome.storage.local`. No analytics, tracking or external API is included.

## Testing checklist

Before distributing a build, test:

- Add / edit / delete Rule
- Enable / disable Rule
- Multiple domains
- Search
- Custom folder
- Fallback behavior
- Recent Downloads
- Clear History
- Unknown domain
- Disabled Rule
- Same filename / `uniquify`
- Popup and Dashboard
- RTL and responsive layouts
- Chrome extension errors and Service Worker console

## Project status

This repository is intended to be developed as a real ngativ product, not as a throwaway prototype. Changes should preserve the separation between UI, business logic, persistence and Chrome APIs.

## Brand

**ngativ**

**«نگاهی متفاوت به کسب‌وکار شما»**
