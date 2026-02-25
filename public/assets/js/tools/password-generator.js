export function init(host) {
  const lenEl = host.querySelector("#pw_len");
  const upperEl = host.querySelector("#pw_upper");
  const lowerEl = host.querySelector("#pw_lower");
  const numEl = host.querySelector("#pw_num");
  const symEl = host.querySelector("#pw_sym");
  const out = host.querySelector("#pw_result");
  const genBtn = host.querySelector("#pw_generate");
  const copyBtn = host.querySelector("#pw_copy");
  const clearBtn = host.querySelector("#pw_clear");

  const UPPER = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const LOWER = "abcdefghijklmnopqrstuvwxyz";
  const NUM = "0123456789";
  const SYM = "!@#$%^&*()-_=+[]{};:,.?/";

  const render = (msg) => (out.value = msg);

  function cryptoInt(maxExclusive) {
    const arr = new Uint32Array(1);
    crypto.getRandomValues(arr);
    return arr[0] % maxExclusive;
  }

  function pick(str) {
    return str[cryptoInt(str.length)];
  }

  function shuffle(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
      const j = cryptoInt(i + 1);
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  }

  function generate() {
    const len = Number(lenEl.value);

    const sets = [];
    if (upperEl.checked) sets.push(UPPER);
    if (lowerEl.checked) sets.push(LOWER);
    if (numEl.checked) sets.push(NUM);
    if (symEl.checked) sets.push(SYM);

    if (!Number.isFinite(len) || len < 8 || len > 64) {
      return render("Set length between 8 and 64.");
    }
    if (sets.length === 0) {
      return render("Select at least one character type.");
    }
    if (len < sets.length) {
      return render("Length must be at least the number of selected character types.");
    }

    // guarantee inclusion of each selected set
    const chars = [];
    for (const s of sets) chars.push(pick(s));

    // fill the rest
    const all = sets.join("");
    while (chars.length < len) chars.push(pick(all));

    shuffle(chars);
    render(chars.join(""));
  }

  genBtn?.addEventListener("click", generate);

  copyBtn?.addEventListener("click", async () => {
    if (!out.value) return;
    try {
      await navigator.clipboard.writeText(out.value);
      copyBtn.textContent = "Copied!";
      setTimeout(() => (copyBtn.textContent = "Copy"), 1500);
    } catch {
      copyBtn.textContent = "Copy failed";
      setTimeout(() => (copyBtn.textContent = "Copy"), 1500);
    }
  });

  clearBtn?.addEventListener("click", () => {
    render("");
  });

  // sensible defaults
  if (!lenEl.value) lenEl.value = "16";
  if (!upperEl.checked && !lowerEl.checked && !numEl.checked && !symEl.checked) {
    upperEl.checked = true;
    lowerEl.checked = true;
    numEl.checked = true;
  }
}