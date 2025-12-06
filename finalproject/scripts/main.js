// main.js
// Handles general site behavior: hamburger menu, accessibility, etc.

// Hamburger menu toggle
const hamburger = document.getElementById("hamburger");
const navLinks = document.getElementById("nav-links");

hamburger.addEventListener("click", () => {
  const expanded = hamburger.getAttribute("aria-expanded") === "true" || false;
  hamburger.setAttribute("aria-expanded", !expanded);
  navLinks.classList.toggle("open");
});

// Close menu when a link is clicked (mobile)
navLinks.querySelectorAll("a").forEach(link => {
  link.addEventListener("click", () => {
    if (navLinks.classList.contains("open")) {
      navLinks.classList.remove("open");
      hamburger.setAttribute("aria-expanded", false);
    }
  });
});

// Skip link focus for accessibility
const skipLink = document.querySelector('a[href="#main"]');
if (skipLink) {
  skipLink.addEventListener("click", e => {
    e.preventDefault();
    document.getElementById("main").focus();
  });
}

// Optional: highlight current page in nav
const currentPage = window.location.pathname.split("/").pop();
document.querySelectorAll(".nav-links a").forEach(link => {
  if (link.getAttribute("href") === currentPage) {
    link.classList.add("active");
  }
});
