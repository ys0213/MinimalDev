export function init(host) {
  const unitEl = host.querySelector("#wi_unit"); // metric|imperial
  const wEl = host.querySelector("#wi_weight");
  const activeEl = host.querySelector("#wi_activity"); // low|moderate|high
  const out = host.querySelector("#wi_result");
  const clear = host.querySelector("#wi_clear");

  const render = (msg) => (out.textContent = msg);

  function calc() {
    const unit = unitEl.value;
    const w = Number(wEl.value);
    const activity = activeEl.value;

    if (!Number.isFinite(w) || w <= 0) return render("Enter a valid weight.");

    // simple guideline: base 35 ml per kg
    // activity adjustment: +0 / +350 / +700 ml
    let weightKg = w;
    if (unit === "imperial") {
      weightKg = w * 0.45359237;
    }

    let ml = weightKg * 35;

    if (activity === "moderate") ml += 350;
    if (activity === "high") ml += 700;

    const liters = ml / 1000;
    const cups = ml / 240;

    render(`Estimated daily water: ${round(liters, 2)} L (~${round(cups, 1)} cups)`);
  }

  function updatePlaceholder() {
    wEl.placeholder = unitEl.value === "metric" ? "Weight (kg)" : "Weight (lb)";
  }

  host.addEventListener("input", (e) => {
    if (e.target === unitEl) updatePlaceholder();
    if (e.target === unitEl || e.target === wEl || e.target === activeEl) calc();
  });

  clear?.addEventListener("click", () => {
    wEl.value = "";
    activeEl.value = "low";
    render("Result will appear here.");
  });

  updatePlaceholder();
  render("Result will appear here.");
}

function round(x, d) {
  const p = 10 ** d;
  return Math.round((x + Number.EPSILON) * p) / p;
}