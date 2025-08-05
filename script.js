// Sayfa içeriği ve tema yüklendiğinde animasyonları uygula
function applyThemeAndAnimations() {
  const savedTheme = localStorage.getItem("theme");
  const html = document.documentElement;
  const icon = document.getElementById("theme-icon");

  // Tema ayarı
  if (savedTheme === "light") {
    html.setAttribute("data-theme", "light");
    document.body.classList.remove("dark-mode");
    if (icon) icon.textContent = "🌙";
  } else {
    html.setAttribute("data-theme", "dark");
    document.body.classList.add("dark-mode");
    if (icon) icon.textContent = "☀️";
  }

  // Sayfa görünür olsun
  document.body.classList.add("loaded");

  // Hero animasyonu
  gsap.to(".hero h1, .hero p, .hero .btn", {
    opacity: 1,
    y: 0,
    duration: 1,
    stagger: 0.2,
    ease: "power3.out"
  });

  // Diğer öğelerde sırayla fade-up animasyonu
  gsap.utils.toArray(".fade-up, .card, .service, .section, .faq-card").forEach((el, i) => {
    gsap.fromTo(
      el,
      { opacity: 0, y: 40 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        delay: i * 0.1,
        ease: "power2.out"
      }
    );
  });
}

// Sayfa açıldığında çalıştır
document.addEventListener("DOMContentLoaded", () => {
  document.body.classList.add("loaded");
});

window.addEventListener("load", applyThemeAndAnimations);

// Tema geçişi
function toggleTheme() {
  const html = document.documentElement;
  const icon = document.getElementById("theme-icon");
  const currentTheme = html.getAttribute("data-theme");

  if (currentTheme === "dark") {
    html.setAttribute("data-theme", "light");
    document.body.classList.remove("dark-mode");
    localStorage.setItem("theme", "light");
    if (icon) icon.textContent = "🌙";
  } else {
    html.setAttribute("data-theme", "dark");
    document.body.classList.add("dark-mode");
    localStorage.setItem("theme", "dark");
    if (icon) icon.textContent = "☀️";
  }
}

// Menü aç/kapa
function toggleMenu() {
  const nav = document.querySelector("nav");
  if (!nav) return;
  const isVisible = nav.classList.contains("nav-visible");

  nav.classList.toggle("nav-visible", !isVisible);
  nav.classList.toggle("nav-hidden", isVisible);

  const icon = document.querySelector(".hamburger");
  if (icon) icon.textContent = isVisible ? "☰" : "✕";

  document.body.classList.toggle("menu-open", !isVisible);
}

// Form gönderimi
const form = document.querySelector("form");
const formStatus = document.getElementById("form-status");

if (form && formStatus) {
  form.addEventListener("submit", function (e) {
    e.preventDefault();
    const data = new FormData(form);
    const xhr = new XMLHttpRequest();
    xhr.open(form.method, form.action);
    xhr.setRequestHeader("Accept", "application/json");
    xhr.onreadystatechange = function () {
      if (xhr.readyState !== XMLHttpRequest.DONE) return;
      if (xhr.status === 200) {
        form.reset();
        formStatus.textContent = "Message sent successfully!";
        formStatus.className = "success";
        formStatus.style.display = "block";
      } else {
        formStatus.textContent = "Oops! There was a problem.";
        formStatus.className = "error";
        formStatus.style.display = "block";
      }
    };
    xhr.send(data);
  });
}
