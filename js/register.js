const steps = document.querySelectorAll(".form-step");
const circles = document.querySelectorAll(".circle");
const nextBtn = document.getElementById("nextBtn");
const img = document.getElementById("form-image");
const form = document.getElementById("multiStepForm");

const images = [
  "../assets/images/register-1.png",
  "../assets/images/register-2.png",
  "../assets/images/register-3.png"
];

let currentStep = 0;

nextBtn.addEventListener("click", () => {
  const currentFormStep = steps[currentStep];
  const inputs = currentFormStep.querySelectorAll("input, select");
  let allValid = true;

  // Reset error styles
  inputs.forEach(input => {
    input.classList.remove("error");
    if (input.closest("label")) {
      input.closest("label").classList.remove("error-text");
    }
  });

  // Validasi input
  inputs.forEach(input => {
    if (input.type === "radio") {
      const radios = currentFormStep.querySelectorAll(`input[name="${input.name}"]`);
      const checked = Array.from(radios).some(radio => radio.checked);
      if (!checked) {
        allValid = false;
        radios.forEach(radio => {
          if (radio.closest("label")) {
            radio.closest("label").classList.add("error-text");
          }
        });
      }
    } else if ((input.type === "number" || input.tagName.toLowerCase() === "select") && !input.value) {
      input.classList.add("error");
      allValid = false;
    }
  });

  if (!allValid) {
    alert("Please complete all required fields before continuing.");
    return;
  }

  // Lanjut ke step berikutnya
  if (currentStep < steps.length - 1) {
    steps[currentStep].classList.remove("active");
    currentStep++;
    steps[currentStep].classList.add("active");

    // Aktifkan lingkaran dan garis
    for (let i = 0; i <= currentStep; i++) {
      circles[i].classList.add("active");
      if (i > 0) {
        circles[i - 1].nextElementSibling.classList.add("active");
      }
    }

    img.src = images[currentStep];
  } else {
    form.submit();
    window.location.href = "signup.html";
  }
});
