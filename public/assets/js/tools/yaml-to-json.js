import YAML from "https://esm.sh/yaml@2";

function qs(id) {
  return document.getElementById(id);
}

function show(el, msg) {
  if (!el) return;
  el.style.display = "block";
  el.textContent = msg;
}

function hide(el) {
  if (!el) return;
  el.style.display = "none";
  el.textContent = "";
}

function badge(text) {
  return `<span style="padding:2px 10px;border-radius:999px;border:1px solid rgba(255,255,255,.2);font-size:12px;font-weight:700;">${text}</span>`;
}

export function init() {
  const input = qs("j2y_input");
  const output = qs("j2y_output");
  const btn = qs("j2y_convert");
  const copyBtn = qs("j2y_copy");
  const clearBtn = qs("j2y_clear");
  const err = qs("j2y_error");
  const result = qs("j2y_result");
  const cards = qs("j2y_cards");
  const tbody = qs("j2y_tbody");

  if (!input || !output || !btn || !copyBtn || !clearBtn || !err || !result || !cards || !tbody) return;

  let lastOutput = "";

  function clearError() {
    hide(err);
  }

  function resetOutput() {
    clearError();
    result.textContent = "Result will appear here.";
    cards.style.display = "none";
    cards.innerHTML = "";
    output.value = "";
    tbody.innerHTML = "";
    lastOutput = "";
  }

  function fillTable(rows) {
    tbody.innerHTML = "";
    rows.forEach((row) => {
      const tr = document.createElement("tr");
      const td1 = document.createElement("td");
      const td2 = document.createElement("td");
      td1.textContent = row[0];
      td2.textContent = row[1];
      tr.appendChild(td1);
      tr.appendChild(td2);
      tbody.appendChild(tr);
    });
  }

  function getTopType(value) {
    if (Array.isArray(value)) return "array";
    if (value === null) return "null";
    return typeof value;
  }

  function convert() {
    resetOutput();

    const raw = input.value.trim();
    if (!raw) {
      show(err, "Please paste JSON input.");
      return;
    }

    try {
      const parsed = JSON.parse(raw);
      const yaml = YAML.stringify(parsed);
      const topType = getTopType(parsed);
      const rootCount =
        Array.isArray(parsed) ? parsed.length :
        (parsed && typeof parsed === "object" ? Object.keys(parsed).length : 0);

      output.value = yaml;
      lastOutput = yaml;

      result.innerHTML = "<strong>JSON converted to YAML.</strong>";
      cards.style.display = "block";
      cards.innerHTML =
        badge("Valid JSON") + " " +
        badge("Root type: " + topType) + " " +
        badge("YAML generated");

      fillTable([
        ["Root type", topType],
        ["Root item/key count", String(rootCount)],
        ["Input length", String(raw.length)],
        ["Output length", String(yaml.length)],
      ]);
    } catch (e) {
      show(err, "Invalid JSON: " + (e?.message || "parse error"));
    }
  }

  async function copyOutput() {
    clearError();
    if (!lastOutput) {
      show(err, "No converted YAML output to copy yet.");
      return;
    }

    try {
      await navigator.clipboard.writeText(lastOutput);
      result.innerHTML = "<strong>Copied YAML output.</strong>";
    } catch (_) {
      show(err, "Clipboard copy failed in this browser.");
    }
  }

  function clearAll() {
    input.value = "";
    output.value = "";
    resetOutput();
    input.focus();
  }

  btn.addEventListener("click", convert);
  copyBtn.addEventListener("click", copyOutput);
  clearBtn.addEventListener("click", clearAll);

  input.addEventListener("keydown", function (e) {
    if ((e.ctrlKey || e.metaKey) && e.key === "Enter") convert();
  });
}