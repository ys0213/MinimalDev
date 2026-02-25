export function init(host) {
  const minEl = host.querySelector("#rng_min");
  const maxEl = host.querySelector("#rng_max");
  const countEl = host.querySelector("#rng_count");
  const out = host.querySelector("#rng_result");
  const btn = host.querySelector("#rng_generate");
  const clear = host.querySelector("#rng_clear");

  const render = (msg) => (out.textContent = msg);

  function randInt(min, max) {
    // inclusive
    const range = max - min + 1;
    const r = Math.floor(Math.random() * range) + min;
    return r;
  }

  function generate() {
    const min = Number(minEl.value);
    const max = Number(maxEl.value);
    const count = Number(countEl.value || 1);

    if (!Number.isFinite(min) || !Number.isFinite(max) || !Number.isFinite(count)) {
      return render("Please enter valid numbers.");
    }
    if (count < 1 || count > 100) return render("Count must be between 1 and 100.");
    if (min > max) return render("Min must be less than or equal to Max.");

    const results = [];
    for (let i = 0; i < count; i++) results.push(randInt(min, max));
    render(results.join(", "));
  }

  btn?.addEventListener("click", generate);
  clear?.addEventListener("click", () => {
    minEl.value = "";
    maxEl.value = "";
    countEl.value = "1";
    render("Result will appear here.");
  });

  render("Result will appear here.");
}