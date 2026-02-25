export function init(host) {
  const oldEl = host.querySelector("#pi_old");
  const newEl = host.querySelector("#pi_new");
  const out = host.querySelector("#pi_result");
  const btn = host.querySelector("#pi_calc");
  const clear = host.querySelector("#pi_clear");

  const render = (msg) => (out.textContent = msg);

  function calc() {
    const oldV = Number(oldEl.value);
    const newV = Number(newEl.value);

    if (!Number.isFinite(oldV) || !Number.isFinite(newV)) {
      render("Please enter valid numbers.");
      return;
    }
    if (oldV === 0) {
      render("Old value cannot be 0 for percent increase.");
      return;
    }

    const increase = ((newV - oldV) / oldV) * 100;
    render(`Percent increase from ${oldV} to ${newV} = ${format(increase)}%`);
  }

  btn?.addEventListener("click", calc);
  clear?.addEventListener("click", () => {
    oldEl.value = "";
    newEl.value = "";
    render("Result will appear here.");
  });
}

function format(x) {
  const rounded = Math.round((x + Number.EPSILON) * 1e6) / 1e6;
  return String(rounded);
}