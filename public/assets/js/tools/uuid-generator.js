export function init(host) {
  const out = host.querySelector("#uuid_result");
  const btn = host.querySelector("#uuid_generate");
  const copy = host.querySelector("#uuid_copy");
  const render = (msg) => (out.value = msg);

  function uuidv4() {
    if (crypto.randomUUID) return crypto.randomUUID();

    // fallback
    const bytes = new Uint8Array(16);
    crypto.getRandomValues(bytes);
    bytes[6] = (bytes[6] & 0x0f) | 0x40; // version 4
    bytes[8] = (bytes[8] & 0x3f) | 0x80; // variant

    const hex = [...bytes].map((b) => b.toString(16).padStart(2, "0")).join("");
    return (
      hex.slice(0, 8) +
      "-" +
      hex.slice(8, 12) +
      "-" +
      hex.slice(12, 16) +
      "-" +
      hex.slice(16, 20) +
      "-" +
      hex.slice(20)
    );
  }

  function generate() {
    render(uuidv4());
  }

  btn?.addEventListener("click", generate);

  copy?.addEventListener("click", async () => {
    if (!out.value) return;
    await navigator.clipboard.writeText(out.value);
    copy.textContent = "Copied!";
    setTimeout(() => (copy.textContent = "Copy"), 1500);
  });

  generate();
}