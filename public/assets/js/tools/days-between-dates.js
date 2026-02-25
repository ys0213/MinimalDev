export function init(host) {
  const aEl = host.querySelector("#dbd_a");
  const bEl = host.querySelector("#dbd_b");
  const out = host.querySelector("#dbd_result");
  const clear = host.querySelector("#dbd_clear");

  const render = (msg) => (out.textContent = msg);

  function parseDateOnly(value) {
    // input[type=date] gives YYYY-MM-DD
    if (!value) return null;
    const [y, m, d] = value.split("-").map(Number);
    if (!y || !m || !d) return null;
    // UTC midnight to avoid DST issues
    return Date.UTC(y, m - 1, d);
  }

  function calc() {
    const a = parseDateOnly(aEl.value);
    const b = parseDateOnly(bEl.value);
    if (a == null || b == null) return render("Select both dates.");

    const diffMs = Math.abs(b - a);
    const days = Math.floor(diffMs / 86400000); // 24*60*60*1000
    render(`Days between: ${days}`);
  }

  host.addEventListener("input", (e) => {
    if (e.target === aEl || e.target === bEl) calc();
  });

  clear?.addEventListener("click", () => {
    aEl.value = "";
    bEl.value = "";
    render("Result will appear here.");
  });

  render("Result will appear here.");
}