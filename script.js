const header = document.getElementById("header");
const menuBtn = document.getElementById("menuBtn");
const navLinks = document.getElementById("navLinks");
const topBtn = document.getElementById("topBtn");
const contactForm = document.getElementById("contactForm");
const formMessage = document.getElementById("formMessage");

// Mobile navigation
menuBtn.addEventListener("click", () => {
  const open = navLinks.classList.toggle("open");
  menuBtn.setAttribute("aria-expanded", open);
  menuBtn.innerHTML = open
    ? '<i class="fas fa-xmark"></i>'
    : '<i class="fas fa-bars"></i>';
});

document.querySelectorAll(".nav-links a").forEach(link => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("open");
    menuBtn.setAttribute("aria-expanded", "false");
    menuBtn.innerHTML = '<i class="fas fa-bars"></i>';
  });
});

// Header + back-to-top
window.addEventListener("scroll", () => {
  header.classList.toggle("scrolled", window.scrollY > 30);
  topBtn.classList.toggle("show", window.scrollY > 450);

  const sections = document.querySelectorAll("main section[id]");
  const links = document.querySelectorAll(".nav-links a");
  let current = "";

  sections.forEach(section => {
    if (window.scrollY >= section.offsetTop - 160) current = section.id;
  });

  links.forEach(link => {
    link.classList.toggle("active", link.getAttribute("href") === `#${current}`);
  });
});

topBtn.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

// Scroll reveal
const observer = new IntersectionObserver((entries, obs) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      obs.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll(".reveal").forEach(el => observer.observe(el));

// Demo contact form.
// This is frontend-only. For real email sending, connect it to PHP or a form service.
contactForm.addEventListener("submit", (event) => {
  event.preventDefault();
  formMessage.textContent = "Message form is ready. Connect it to your PHP backend to receive messages.";
  contactForm.reset();
});
