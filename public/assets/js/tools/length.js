export function init(host) {
  const fromEl = host.querySelector("#lc_from_unit");
  const toEl = host.querySelector("#lc_to_unit");
  const valEl = host.querySelector("#lc_value");
  const outEl = host.querySelector("#lc_result");
  const swapBtn = host.querySelector("#lc_swap");
  const clearBtn = host.querySelector("#lc_clear");

  const UNITS = {
    mm: 0.001,
    cm: 0.01,
    m: 1,
    km: 1000,
    in: 0.0254,
    ft: 0.3048,
    yd: 0.9144,
    mi: 1609.344,
  }; // meters per unit

  function render(msg) {
    outEl.textContent = msg;
  }

  function convert() {
    const v = Number(valEl.value);
    const from = fromEl.value;
    const to = toEl.value;

    if (!Number.isFinite(v)) return render("Please enter a valid number.");
    if (!UNITS[from] || !UNITS[to]) return render("Please select valid units.");

    const meters = v * UNITS[from];
    const result = meters / UNITS[to];

    render(`${format(v)} ${label(from)} = ${format(result)} ${label(to)}`);
  }

  function swap() {
    const tmp = fromEl.value;
    fromEl.value = toEl.value;
    toEl.value = tmp;
    convert();
  }

  function clear() {
    valEl.value = "";
    render("Result will appear here.");
  }

  // Events
  host.addEventListener("input", (e) => {
    if (e.target === valEl || e.target === fromEl || e.target === toEl) convert();
  });

  swapBtn?.addEventListener("click", swap);
  clearBtn?.addEventListener("click", clear);

  render("Result will appear here.");
}

function label(u) {
  const map = {
    mm: "mm",
    cm: "cm",
    m: "m",
    km: "km",
    in: "in",
    ft: "ft",
    yd: "yd",
    mi: "mi",
  };
  return map[u] ?? u;
}

function format(x) {
  const rounded = Math.round((x + Number.EPSILON) * 1e10) / 1e10;
  return String(rounded);
}