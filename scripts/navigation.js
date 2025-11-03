// navigation.js - accessible hamburger toggle
document.addEventListener('DOMContentLoaded', () => {
  const menuToggle = document.getElementById('menuToggle');
  const primaryNav = document.getElementById('primaryNav');

  if (!menuToggle || !primaryNav) return;

  // Ensure nav starts hidden on small screens
  primaryNav.setAttribute('aria-hidden', 'true');

  menuToggle.addEventListener('click', () => {
    const expanded = menuToggle.getAttribute('aria-expanded') === 'true';
    menuToggle.setAttribute('aria-expanded', String(!expanded));
    const willOpen = !expanded;

    primaryNav.setAttribute('aria-hidden', String(!willOpen));
    if (willOpen) {
      primaryNav.classList.add('open');
      menuToggle.setAttribute('aria-label', 'Close navigation');
    } else {
      primaryNav.classList.remove('open');
      menuToggle.setAttribute('aria-label', 'Open navigation');
    }
  });

  // Close menu when focus moves outside or on Escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      menuToggle.setAttribute('aria-expanded', 'false');
      primaryNav.setAttribute('aria-hidden', 'true');
      primaryNav.classList.remove('open');
      menuToggle.focus();
    }
  });

  // Close menu if user clicks outside on small screens
  document.addEventListener('click', (e) => {
    if (!primaryNav.contains(e.target) && !menuToggle.contains(e.target)) {
      primaryNav.setAttribute('aria-hidden', 'true');
      primaryNav.classList.remove('open');
      menuToggle.setAttribute('aria-expanded', 'false');
    }
  });
});
