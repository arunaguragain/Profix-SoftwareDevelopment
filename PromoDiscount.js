document.getElementById('offerForm').addEventListener('submit', function (e) {
    e.preventDefault();

    // Get form values
    const title = document.getElementById('offerTitle').value;
    const description = document.getElementById('offerDescription').value;
    const validity = document.getElementById('offerValidity').value;
    const discount = document.getElementById('offerDiscount').value;

    // Create an offer object
    const offer = {
        title,
        description,
        validity,
        discount
    };

    // Save the offer to localStorage
    let savedOffers = JSON.parse(localStorage.getItem('offers')) || [];
    savedOffers.push(offer);
    localStorage.setItem('offers', JSON.stringify(savedOffers));

    // Display the offer
    addOfferToList(offer);

    // Clear form fields
    document.getElementById('offerForm').reset();
});

// Function to display an offer
function addOfferToList(offer) {
    const offerList = document.getElementById('offers');
    const listItem = document.createElement('li');
    listItem.innerHTML = `
        <div>
            <h3>${offer.title}</h3>
            <p>${offer.description}</p>
            <small>Valid until: ${offer.validity} | Discount: ${offer.discount}%</small>
        </div>
        <button class="remove-btn">Remove</button>
    `;
    offerList.appendChild(listItem);

    // Add event listener to remove button
    listItem.querySelector('.remove-btn').addEventListener('click', function () {
        // Remove the offer from localStorage
        removeOfferFromStorage(offer);
        listItem.remove();
    });
}

// Function to remove an offer from localStorage
function removeOfferFromStorage(offerToRemove) {
    let savedOffers = JSON.parse(localStorage.getItem('offers')) || [];
    savedOffers = savedOffers.filter(offer =>
        offer.title !== offerToRemove.title ||
        offer.description !== offerToRemove.description ||
        offer.validity !== offerToRemove.validity ||
        offer.discount !== offerToRemove.discount
    );
    localStorage.setItem('offers', JSON.stringify(savedOffers));
}

// Function to load offers from localStorage on page load
function loadOffers() {
    const savedOffers = JSON.parse(localStorage.getItem('offers')) || [];
    savedOffers.forEach(offer => addOfferToList(offer));
}

// Call loadOffers when the page loads
window.onload = loadOffers;
