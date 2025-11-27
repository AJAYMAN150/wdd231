// Fetch and display members
async function getMembers() {
    const response = await fetch("data/members.json");
    const members = await response.json();
    displayMembers(members);
}

function displayMembers(members) {
    const container = document.getElementById("directory");
    container.innerHTML = ""; // Clear existing

    members.forEach(member => {
        const card = document.createElement("section");

        const img = document.createElement("img");
        img.src = `images/${member.image}`;
        img.alt = member.name;

        const name = document.createElement("h3");
        name.textContent = member.name;

        const address = document.createElement("p");
        address.textContent = member.address;

        const phone = document.createElement("p");
        phone.textContent = member.phone;

        const link = document.createElement("a");
        link.href = member.website;
        link.target = "_blank";
        link.textContent = "Visit Website";

        card.appendChild(img);
        card.appendChild(name);
        card.appendChild(address);
        card.appendChild(phone);
        card.appendChild(link);

        container.appendChild(card);
    });
}

// Toggle Grid/List layout
const gridBtn = document.getElementById("grid");
const listBtn = document.getElementById("list");
const directory = document.getElementById("directory");

gridBtn.addEventListener("click", () => {
    directory.classList.add("grid");
    directory.classList.remove("list");
});

listBtn.addEventListener("click", () => {
    directory.classList.add("list");
    directory.classList.remove("grid");
});

// Footer: current year
document.getElementById("year").textContent = new Date().getFullYear();

// Footer: last modified date
document.getElementById("last-modified").textContent = document.lastModified;

// Load data
getMembers();
