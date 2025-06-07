  const form = document.querySelector("form");

  form.addEventListener("submit", function (e) {
    const username = document.getElementById("username").value.trim();
    
    // Simpan username ke localStorage
    localStorage.setItem("username", username);
    
  });

