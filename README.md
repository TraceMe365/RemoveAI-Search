# Append -ai to Google Searches (example extension)

What it does
- Automatically appends ` -ai` to queries on Google domains (e.g. google.com, google.co.uk) when the query doesn't already include `-ai`.

How to use
1. Create a folder, e.g. `append-ai-extension`.
2. Save the three files from this gist there: `manifest.json`, `content.js`, and this `README.md`.
3. Open Chrome (or Edge/Brave).
4. Go to `chrome://extensions`.
5. Enable "Developer mode" (top-right).
6. Click "Load unpacked" and select your `append-ai-extension` folder.
7. Visit Google and try searches. The extension appends ` -ai` automatically.

Notes and caveats
- This is a minimal example. Google’s UI is dynamic; if Google changes input names or DOM structure the content script might need updates.
- The extension only runs on `*.google.*` hosts as declared in manifest host permissions.
- The script appends the token only if it's not already present to avoid repeated appends.
- Appending ` -ai` is implemented as adding a space + hyphen + "ai" (i.e., a search operator excluding "ai"). If you intended a different behavior (e.g., suffixing the term `" -ai"` vs. `-ai` without space), adjust the code accordingly.
- Respect user privacy: this extension operates on Google pages and modifies search queries locally. It doesn't send data elsewhere in this example.

If you want, I can:
- Make the token configurable (extension options page).
- Add support for additional search engines or customize matching rules.
- Provide a version for Firefox (minor manifest tweaks).