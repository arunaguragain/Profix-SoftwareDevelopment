// Sample data for favorites - Retrieve actual data from localStorage in a real implementation
let favorites = JSON.parse(localStorage.getItem("favorites")) || [
    { name: "John Electric", contact: "123-456-7890", email: "john.electric@example.com", image: "electrician.jpg" },
    { name: "Fix-a-Tap", contact: "654-321-9870", email: "fixatap@example.com", image: "plumber.jpg" },
];

// Function to display favorite providers
function displayFavorites() {
    const favoritesList = document.getElementById("favorites-list");
    favoritesList.innerHTML = ""; // Clear previous content

    if (favorites.length === 0) {
        favoritesList.innerHTML = "<p>No favorites added yet.</p>";
        return;
    }

    favorites.forEach((provider) => {
        const card = document.createElement("div");
        card.classList.add("favorite-card");

        card.innerHTML = `
            <img src="${provider.image}" alt="${provider.name}">
            <div class="content">
                <h3>${provider.name}</h3>
                <p>Contact: ${provider.contact}</p>
                <p>Email: <a href="mailto:${provider.email}">${provider.email}</a></p>
            </div>
        `;

        favoritesList.appendChild(card);
    });
}

// Function to clear all favorites
function clearFavorites() {
    const confirmAction = confirm("Are you sure you want to clear all your favorites?");
    if (confirmAction) {
        favorites = [];
        localStorage.removeItem("favorites");
        displayFavorites();
        alert("Favorites cleared.");
    }
}

// Load favorites when the page is loaded
document.addEventListener("DOMContentLoaded", displayFavorites);
