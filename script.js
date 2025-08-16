document.addEventListener("DOMContentLoaded", () => {
  // Helpers
  const navbar = document.querySelector(".navbar");
  const toggleBtn = document.querySelector(".theme-toggle");
  const body = document.body;

  // Apply theme (light or dark)
  function applyTheme(theme, save = false) {
    const isLight = theme === "light";

    // body class
    if (isLight) body.classList.add("light");
    else body.classList.remove("light");

    // navbar class swap so bootstrap toggler icon & link styles follow theme
    if (navbar) {
      navbar.classList.toggle("navbar-light", isLight);
      navbar.classList.toggle("navbar-dark", !isLight);
    }

    // theme toggle text & aria
    if (toggleBtn) {
      toggleBtn.textContent = isLight ? "🌙" : "☀️";
      toggleBtn.setAttribute("aria-pressed", isLight ? "true" : "false");
      toggleBtn.setAttribute("title", isLight ? "Ganti ke tema gelap" : "Ganti ke tema terang");
    }

    // optional: save preference
    if (save) localStorage.setItem("theme", theme);
  }

  // Determine initial theme:
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme === "light" || savedTheme === "dark") {
    applyTheme(savedTheme, false);
  } else {
    // if user hasn't set preference, respect OS preference
    const prefersLight = window.matchMedia && window.matchMedia("(prefers-color-scheme: light)").matches;
    applyTheme(prefersLight ? "light" : "dark", false);
  }

  // AOS init
  if (window.AOS && typeof AOS.init === "function") {
    AOS.init({ once: true, duration: 700, offset: 80, easing: "ease-out" });
  }

  // Typed.js
  const typedEl = document.querySelector(".typed");
  if (window.Typed && typedEl) {
    new Typed(".typed", {
      strings: [
        "Halo, saya Awang Alfha Fairuz Amien",
        "Selamat datang di portofolio saya!"
      ],
      typeSpeed: 50,
      backSpeed: 28,
      backDelay: 1500,
      loop: true
    });
  } else if (typedEl) {
    typedEl.textContent = "Halo, saya Awang Alfha Fairuz Amien";
  }

  // Theme toggle click
  if (toggleBtn) {
    toggleBtn.addEventListener("click", () => {
      const nowLight = body.classList.contains("light");
      const nextTheme = nowLight ? "dark" : "light";
      applyTheme(nextTheme, true);
    });
  }

  // Copy button (improve UX & disable while copying)
  document.querySelectorAll(".copy-btn").forEach((btn) => {
    btn.addEventListener("click", async () => {
      const target = document.querySelector(btn.dataset.target);
      const text = target ? target.textContent : "";
      try {
        btn.disabled = true;
        const old = btn.innerHTML;
        await navigator.clipboard.writeText(text);
        btn.innerHTML = '<i class="fa-solid fa-check me-1"></i> Tersalin';
        setTimeout(() => (btn.innerHTML = old), 1200);
      } catch (err) {
        // fallback UX
        alert("Gagal menyalin. Silakan salin manual 🙂");
      } finally {
        btn.disabled = false;
      }
    });
  });
});
