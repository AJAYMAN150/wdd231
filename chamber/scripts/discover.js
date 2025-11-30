// scripts/discover.js
import { points } from "../data/points.mjs";

const grid = document.getElementById('cards-grid');
const visitText = document.getElementById('visit-text');
const visitClose = document.getElementById('visit-close');
const visitMsg = document.getElementById('visit-msg');

function createCard(item, idx){
  const card = document.createElement('article');
  card.className = `card card--${idx+1}`;
  card.setAttribute('tabindex','0');

  card.innerHTML = `
    <h2>${escapeHtml(item.title)}</h2>
    <figure>
      <img src="${escapeHtml(item.image)}" alt="${escapeHtml(item.alt || item.title)}" width="300" height="200" loading="lazy">
    </figure>
    <address>${escapeHtml(item.address)}</address>
    <p>${escapeHtml(item.description)}</p>
    <button type="button" class="learn-btn">Learn more</button>
  `;
  return card;
}

/* Simple escaping helper */
function escapeHtml(s = '') {
  return s.replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;').replaceAll('"','&quot;');
}

/* Populate grid with points */
function populateGrid() {
  grid.innerHTML = '';
  points.forEach((p, i) => {
    grid.appendChild(createCard(p, i));
  });
}

/* LocalStorage visit message logic */
function handleVisitMessage() {
  const KEY = 'chamber_last_visit';
  const now = Date.now();
  const last = localStorage.getItem(KEY);
  if (!last) {
    visitText.textContent = "Welcome! Let us know if you have any questions.";
  } else {
    const days = Math.floor((now - Number(last)) / (1000 * 60 * 60 * 24));
    if (days === 0) {
      visitText.textContent = "Back so soon! Awesome!";
    } else if (days === 1) {
      visitText.textContent = "You last visited 1 day ago.";
    } else {
      visitText.textContent = `You last visited ${days} days ago.`;
    }
  }

  // Save current date (in ms)
  localStorage.setItem(KEY, String(now));

  // allow closing the message (persist closed for current page session only)
  visitClose.addEventListener('click', () => {
    visitMsg.style.display = 'none';
  });
}

/* Initialize */
function init() {
  populateGrid();
  handleVisitMessage();
}

document.addEventListener('DOMContentLoaded', init);
