export function init(host) {
  const fromEl = host.querySelector("#wc_from_unit");
  const toEl = host.querySelector("#wc_to_unit");
  const valEl = host.querySelector("#wc_value");
  const outEl = host.querySelector("#wc_result");
  const swapBtn = host.querySelector("#wc_swap");
  const clearBtn = host.querySelector("#wc_clear");

  const UNITS = {
    mg: 0.000001,
    g: 0.001,
    kg: 1,
    oz: 0.028349523125,
    lb: 0.45359237,
  }; // kilograms per unit

  function render(msg) {
    outEl.textContent = msg;
  }

  function convert() {
    const v = Number(valEl.value);
    const from = fromEl.value;
    const to = toEl.value;

    if (!Number.isFinite(v)) return render("Please enter a valid number.");
    if (!UNITS[from] || !UNITS[to]) return render("Please select valid units.");

    const kg = v * UNITS[from];
    const result = kg / UNITS[to];

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
  const map = { mg: "mg", g: "g", kg: "kg", oz: "oz", lb: "lb" };
  return map[u] ?? u;
}

function format(x) {
  const rounded = Math.round((x + Number.EPSILON) * 1e10) / 1e10;
  return String(rounded);
}