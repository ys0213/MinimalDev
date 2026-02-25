export function init(host) {
  const fromEl = host.querySelector("#pch_from");
  const toEl = host.querySelector("#pch_to");
  const out = host.querySelector("#pch_result");
  const btn = host.querySelector("#pch_calc");
  const clear = host.querySelector("#pch_clear");

  const render = (msg) => (out.textContent = msg);

  function calc() {
    const fromV = Number(fromEl.value);
    const toV = Number(toEl.value);

    if (!Number.isFinite(fromV) || !Number.isFinite(toV)) {
      render("Please enter valid numbers.");
      return;
    }
    if (fromV === 0) {
      render("From value cannot be 0 for percentage change.");
      return;
    }

    const change = ((toV - fromV) / fromV) * 100;
    const direction = change > 0 ? "increase" : change < 0 ? "decrease" : "no change";
    render(`Percentage change from ${fromV} to ${toV} = ${format(change)}% (${direction})`);
  }

  btn?.addEventListener("click", calc);
  clear?.addEventListener("click", () => {
    fromEl.value = "";
    toEl.value = "";
    render("Result will appear here.");
  });
}

function format(x) {
  const rounded = Math.round((x + Number.EPSILON) * 1e6) / 1e6;
  return String(rounded);
}