export function init(host) {
  const fromEl = host.querySelector("#tc_from_unit");
  const toEl = host.querySelector("#tc_to_unit");
  const valEl = host.querySelector("#tc_value");
  const outEl = host.querySelector("#tc_result");
  const swapBtn = host.querySelector("#tc_swap");
  const clearBtn = host.querySelector("#tc_clear");

  function render(msg) {
    outEl.textContent = msg;
  }

  function toC(v, unit) {
    if (unit === "c") return v;
    if (unit === "f") return (v - 32) * (5 / 9);
    if (unit === "k") return v - 273.15;
    return NaN;
  }

  function fromC(c, unit) {
    if (unit === "c") return c;
    if (unit === "f") return c * (9 / 5) + 32;
    if (unit === "k") return c + 273.15;
    return NaN;
  }

  function convert() {
    const v = Number(valEl.value);
    const from = fromEl.value;
    const to = toEl.value;

    if (!Number.isFinite(v)) return render("Please enter a valid number.");

    const c = toC(v, from);
    const result = fromC(c, to);

    if (!Number.isFinite(result)) return render("Please select valid units.");

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

  host.addEventListener("input", (e) => {
    if (e.target === valEl || e.target === fromEl || e.target === toEl) convert();
  });

  swapBtn?.addEventListener("click", swap);
  clearBtn?.addEventListener("click", clear);

  render("Result will appear here.");
}

function label(u) {
  const map = { c: "°C", f: "°F", k: "K" };
  return map[u] ?? u;
}

function format(x) {
  const rounded = Math.round((x + Number.EPSILON) * 1e8) / 1e8;
  return String(rounded);
}