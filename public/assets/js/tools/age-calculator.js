export function init(host) {
  const dobEl = host.querySelector("#age_dob");
  const refEl = host.querySelector("#age_ref");
  const out = host.querySelector("#age_result");
  const clear = host.querySelector("#age_clear");
  const render = (msg) => (out.textContent = msg);

  function parseDateLocal(value) {
    if (!value) return null;
    const [y, m, d] = value.split("-").map(Number);
    if (!y || !m || !d) return null;
    // local date (midday to reduce DST edge cases)
    return new Date(y, m - 1, d, 12, 0, 0, 0);
  }

  function calc() {
    const dob = parseDateLocal(dobEl.value);
    const ref = refEl.value ? parseDateLocal(refEl.value) : new Date();

    if (!dob) return render("Select your date of birth.");
    if (!ref) return render("Select a reference date.");

    if (ref < dob) return render("Reference date must be after the date of birth.");

    let years = ref.getFullYear() - dob.getFullYear();
    let months = ref.getMonth() - dob.getMonth();
    let days = ref.getDate() - dob.getDate();

    if (days < 0) {
      // borrow days from previous month
      const prevMonth = new Date(ref.getFullYear(), ref.getMonth(), 0);
      days += prevMonth.getDate();
      months -= 1;
    }

    if (months < 0) {
      months += 12;
      years -= 1;
    }

    render(`Age: ${years} years, ${months} months, ${days} days`);
  }

  host.addEventListener("input", (e) => {
    if (e.target === dobEl || e.target === refEl) calc();
  });

  clear?.addEventListener("click", () => {
    dobEl.value = "";
    refEl.value = "";
    render("Result will appear here.");
  });

  render("Result will appear here.");
}