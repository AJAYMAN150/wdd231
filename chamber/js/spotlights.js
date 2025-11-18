/* spotlights.js
   Display 2–3 random Gold or Silver chamber members as spotlight cards
*/

document.addEventListener("DOMContentLoaded", () => {
    displaySpotlights();
});

// Map membership numbers to names
function getMembershipLevel(number) {
    switch (number) {
        case 1: return "Bronze";
        case 2: return "Silver";
        case 3: return "Gold";
        default: return "Unknown";
    }
}

async function displaySpotlights() {
    const container = document.getElementById("spotlight-container");

    try {
        const res = await fetch("members.json"); // adjust path if needed
        if (!res.ok) throw new Error("Failed to fetch members.json");

        const members = await res.json();

        // Filter Gold (3) or Silver (2) members
        const eligibleMembers = members.filter(member =>
            member.membership === 2 || member.membership === 3
        );

        // Shuffle array randomly
        const shuffled = eligibleMembers.sort(() => 0.5 - Math.random());

        // Take 2–3 members
        const spotlightMembers = shuffled.slice(0, 3);

        // Clear container
        container.innerHTML = "";

        // Create spotlight cards
        spotlightMembers.forEach(member => {
            const card = document.createElement("div");
            card.className = "spotlight-card";

            card.innerHTML = `
                <img src="images/${member.image}" alt="${member.name} Logo" class="spotlight-logo">
                <h3>${member.name}</h3>
                <p><strong>Phone:</strong> ${member.phone}</p>
                <p><strong>Address:</strong> ${member.address}</p>
                <p><strong>Website:</strong> <a href="${member.website}" target="_blank">${member.website}</a></p>
                <p><strong>Membership Level:</strong> ${getMembershipLevel(member.membership)}</p>
            `;

            container.appendChild(card);
        });

    } catch (err) {
        console.error(err);
        container.innerHTML = "<p>Spotlights unavailable at this time.</p>";
    }
}
