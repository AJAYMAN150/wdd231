// heroes.js
// Dynamic hero cards and modal functionality

const heroesContainer = document.getElementById("heroes-list");
const modal = document.getElementById("hero-modal");
const modalBody = document.getElementById("modal-body");
const modalCloseBtns = document.querySelectorAll(".modal-close, .modal-close-secondary");

// Load heroes from JSON
async function loadHeroes() {
  try {
    const response = await fetch("data/heroes.json");
    if (!response.ok) throw new Error("Failed to load heroes data");
    const { heroes } = await response.json();

    heroes.forEach(hero => {
      const card = document.createElement("article");
      card.classList.add("hero-card");

      card.innerHTML = `
        <img src="${hero.image}" alt="${hero.name}" loading="lazy">
        <h3>${hero.name}</h3>
        <ul>
          <li><strong>Faction:</strong> ${hero.faction}</li>
          <li><strong>Role:</strong> ${hero.role}</li>
          <li><strong>Difficulty:</strong> ${hero.difficulty}</li>
        </ul>
        <button class="details-btn">Details</button>
        <button class="fav-btn" aria-pressed="false">${getFavoriteHero() === hero.name ? "💛" : "🤍"}</button>
      `;

      // Open modal on Details click
      card.querySelector(".details-btn").addEventListener("click", () => showHeroModal(hero));

      // Favorite button toggle
      const favBtn = card.querySelector(".fav-btn");
      favBtn.addEventListener("click", () => toggleFavorite(hero.name, favBtn));

      heroesContainer.appendChild(card);
    });

  } catch (err) {
    console.error(err);
    heroesContainer.innerHTML = `<p>Couldn’t load heroes right now.</p>`;
  }
}

// Show modal with hero details
function showHeroModal(hero) {
  modalBody.innerHTML = `
    <img src="${hero.image}" alt="${hero.name}" loading="lazy">
    <h2>${hero.name}</h2>
    <p><strong>Faction:</strong> ${hero.faction}</p>
    <p><strong>Role:</strong> ${hero.role}</p>
    <p><strong>Difficulty:</strong> ${hero.difficulty}</p>
    <p>${hero.description}</p>
  `;
  modal.setAttribute("aria-hidden", "false");
  modal.classList.add("open");
}

// Close modal
modalCloseBtns.forEach(btn => {
  btn.addEventListener("click", () => {
    modal.classList.remove("open");
    modal.setAttribute("aria-hidden", "true");
  });
});

// Close modal by clicking overlay
modal.addEventListener("click", e => {
  if (e.target.classList.contains("modal-overlay")) {
    modal.classList.remove("open");
    modal.setAttribute("aria-hidden", "true");
  }
});

// Favorites functionality
function getFavoriteHero() {
  return localStorage.getItem("favoriteHero") || null;
}

function toggleFavorite(name, btn) {
  if (getFavoriteHero() === name) {
    localStorage.removeItem("favoriteHero");
    btn.textContent = "🤍";
  } else {
    localStorage.setItem("favoriteHero", name);
    document.querySelectorAll(".fav-btn").forEach(b => b.textContent = "🤍");
    btn.textContent = "💛";
  }
}

// Initialize
loadHeroes();
