export function init(host) {
  const unitEl = host.querySelector("#bmi_unit");
  const hEl = host.querySelector("#bmi_height");
  const wEl = host.querySelector("#bmi_weight");
  const out = host.querySelector("#bmi_result");
  const clear = host.querySelector("#bmi_clear");
  const render = (msg) => (out.textContent = msg);

  function classify(bmi) {
    if (bmi < 18.5) return "Underweight";
    if (bmi < 25) return "Normal weight";
    if (bmi < 30) return "Overweight";
    return "Obesity";
  }

  function calc() {
    const unit = unitEl.value; // metric | imperial
    const h = Number(hEl.value);
    const w = Number(wEl.value);

    if (!Number.isFinite(h) || !Number.isFinite(w)) {
      return render("Enter valid height and weight.");
    }
    if (h <= 0 || w <= 0) return render("Height and weight must be greater than 0.");

    let bmi;
    if (unit === "metric") {
      const meters = h / 100; // cm -> m
      bmi = w / (meters * meters);
    } else {
      // imperial: inches, pounds
      bmi = (w / (h * h)) * 703;
    }

    const bmiR = round(bmi, 2);
    render(`BMI: ${bmiR} (${classify(bmi)})`);
  }

  function updatePlaceholders() {
    if (unitEl.value === "metric") {
      hEl.placeholder = "Height (cm)";
      wEl.placeholder = "Weight (kg)";
      hEl.setAttribute("inputmode", "decimal");
      wEl.setAttribute("inputmode", "decimal");
    } else {
      hEl.placeholder = "Height (in)";
      wEl.placeholder = "Weight (lb)";
      hEl.setAttribute("inputmode", "decimal");
      wEl.setAttribute("inputmode", "decimal");
    }
  }

  host.addEventListener("input", (e) => {
    if (e.target === unitEl) {
      updatePlaceholders();
      calc();
    }
    if (e.target === hEl || e.target === wEl) calc();
  });

  clear?.addEventListener("click", () => {
    hEl.value = "";
    wEl.value = "";
    render("Result will appear here.");
  });

  updatePlaceholders();
  render("Result will appear here.");
}

function round(x, d) {
  const p = 10 ** d;
  return Math.round((x + Number.EPSILON) * p) / p;
}