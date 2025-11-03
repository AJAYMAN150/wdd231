// date.js - dynamic copyright year and lastModified
document.addEventListener('DOMContentLoaded', () => {
  const yearEl = document.getElementById('copyrightYear');
  const lastModifiedEl = document.getElementById('lastModified');

  if (yearEl) {
    const now = new Date();
    yearEl.textContent = now.getFullYear();
  }

  if (lastModifiedEl) {
    // document.lastModified returns a string; assignment is fine per assignment.
    lastModifiedEl.textContent = document.lastModified || 'Unknown';
  }
});
