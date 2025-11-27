// scripts/menu.js

// Grab the menu toggle button and the nav menu
const menuToggle = document.getElementById('menu-toggle');
const menu = document.getElementById('menu');

menuToggle.addEventListener('click', () => {
    // Toggle the 'show' class on the menu to open/close it
    menu.classList.toggle('show');

    // Update the aria-expanded attribute for accessibility
    const expanded = menuToggle.getAttribute('aria-expanded') === 'true';
    menuToggle.setAttribute('aria-expanded', String(!expanded));
});
