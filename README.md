# Pocket Preview — Responsive Phone View

A tiny Chrome/Edge extension: click the toolbar icon on any page, pick a device, and it opens that page in a phone-sized window. iPhone SE, iPhone 14, iPhone Pro Max, Pixel 7, Galaxy S, iPad mini, portrait or landscape.

It opens a real browser window (not an embedded frame), so it works on every site, including ones that block being framed. No sign-in, no tracking, no permissions beyond the active tab.

## Install (unpacked, free)

1. Download this repo (Code → Download ZIP) and unzip it, or grab the packaged zip from [Releases](../../releases).
2. Open `chrome://extensions` (or `edge://extensions`).
3. Turn on **Developer mode**.
4. Click **Load unpacked** and select the folder.
5. Pin the icon, open any page, click it, pick a device.

## Files

- `manifest.json` — MV3 manifest
- `popup.html` / `popup.js` — the device picker
- `icons/` — 16/48/128 icons

## Privacy

Collects nothing. See [PRIVACY.md](PRIVACY.md).

## License

MIT
