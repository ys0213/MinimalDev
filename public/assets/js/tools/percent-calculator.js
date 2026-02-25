export function init(host) {
  const pEl = host.querySelector("#pc_percent");
  const nEl = host.querySelector("#pc_number");
  const out = host.querySelector("#pc_result");
  const btn = host.querySelector("#pc_calc");
  const clear = host.querySelector("#pc_clear");

  function render(msg) {
    out.textContent = msg;
  }

  function calc() {
    const p = Number(pEl.value);
    const n = Number(nEl.value);

    if (!Number.isFinite(p) || !Number.isFinite(n)) {
      render("Please enter valid numbers.");
      return;
    }

    const r = (p / 100) * n;
    render(`${p}% of ${n} = ${format(r)}`);
  }

  btn?.addEventListener("click", calc);
  clear?.addEventListener("click", () => {
    pEl.value = "";
    nEl.value = "";
    render("Result will appear here.");
  });
}

function format(x) {
  // avoid ugly long decimals
  const rounded = Math.round((x + Number.EPSILON) * 1e8) / 1e8;
  return String(rounded);
}