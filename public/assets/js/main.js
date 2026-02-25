// public/assets/js/main.js (ESM)

const TOOL_MODULES = {
  "percent-calculator": "/assets/js/tools/percent-calculator.js",
  "percent-increase-calculator": "/assets/js/tools/percent-increase-calculator.js",
  "percent-decrease-calculator": "/assets/js/tools/percent-decrease-calculator.js",
  "percentage-change-calculator": "/assets/js/tools/percentage-change-calculator.js",

  "length-converter": "/assets/js/tools/length-converter.js",
  "weight-converter": "/assets/js/tools/weight-converter.js",
  "temperature-converter": "/assets/js/tools/temperature-converter.js",
  
  // Date & Time
  "days-between-dates": "/assets/js/tools/days-between-dates.js",
  "age-calculator": "/assets/js/tools/age-calculator.js",

  // Utility
  "random-number-generator": "/assets/js/tools/random-number-generator.js",
  "password-generator": "/assets/js/tools/password-generator.js",
  "uuid-generator": "/assets/js/tools/uuid-generator.js",

  // Health
  "bmi-calculator": "/assets/js/tools/bmi-calculator.js",
  "water-intake-calculator": "/assets/js/tools/water-intake-calculator.js",
};

function setYearIfExists() {
  const y = document.getElementById("year");
  if (y) y.textContent = String(new Date().getFullYear());
}

async function initToolIfPresent() {
  const host = document.querySelector("[data-tool]");
  if (!host) return;

  const toolKey = host.getAttribute("data-tool");
  const path = TOOL_MODULES[toolKey];
  if (!path) return;

  try {
    const mod = await import(path);
    if (typeof mod.init === "function") mod.init(host);
  } catch (err) {
    console.error("Failed to load tool module:", toolKey, err);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  setYearIfExists();
  initToolIfPresent();
});