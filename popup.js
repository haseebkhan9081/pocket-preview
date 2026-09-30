// Basic version: pick a device, open the current tab's URL in a phone-sized
// popup window. Uses a real window (not an iframe) so it works on every site,
// including ones that block framing.

const DEVICES = [
  { name: "iPhone SE", w: 375, h: 667 },
  { name: "iPhone 14", w: 390, h: 844 },
  { name: "iPhone Pro Max", w: 430, h: 932 },
  { name: "Pixel 7", w: 412, h: 915 },
  { name: "Galaxy S", w: 360, h: 800 },
  { name: "iPad mini", w: 768, h: 1024 },
];

async function activeTabUrl() {
  // Guarded so the popup UI still renders if opened outside an extension
  // context (e.g. previewing the file directly).
  try {
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    return tab?.url || null;
  } catch {
    return null;
  }
}

function openAt(url, w, h) {
  // Add a little chrome height so the viewport is roughly the device height.
  try {
    chrome.windows.create({ url, type: "popup", width: w, height: h + 88, focused: true });
  } catch {
    window.open(url, "_blank", "width=" + w + ",height=" + (h + 88));
  }
}

async function init() {
  const url = await activeTabUrl();
  const target = document.getElementById("target");
  const landscape = document.getElementById("landscape");
  const grid = document.getElementById("devices");

  if (!url || !/^https?:/i.test(url)) {
    target.textContent = "Open a normal web page first, then click a device.";
  } else {
    try {
      target.textContent = "Previewing " + new URL(url).hostname;
    } catch {
      target.textContent = "Opens this page in a phone-sized window.";
    }
  }

  DEVICES.forEach((d) => {
    const b = document.createElement("button");
    b.className = "dev";
    b.innerHTML = "<b>" + d.name + "</b><span>" + d.w + " x " + d.h + "</span>";
    b.addEventListener("click", () => {
      if (!url || !/^https?:/i.test(url)) return;
      const w = landscape.checked ? d.h : d.w;
      const h = landscape.checked ? d.w : d.h;
      openAt(url, w, h);
      window.close();
    });
    grid.appendChild(b);
  });
}

init();
