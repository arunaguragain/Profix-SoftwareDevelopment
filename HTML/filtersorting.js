// Sample services data
const services = [
    { name: "Wooden Table Repair", category: "carpentry", price: 150, rating: 4.5 },
    { name: "Electrical Wiring", category: "electrician", price: 100, rating: 4.8 },
    { name: "Pipe Leakage Fix", category: "plumbing", price: 200, rating: 4.2 },
    { name: "Furniture Assembly", category: "carpentry", price: 300, rating: 4.7 },
    { name: "Switch Replacement", category: "electrician", price: 50, rating: 4.0 },
  ];
  
  // Function to display services
  function displayServices(filteredServices) {
    const servicesContainer = document.getElementById("services");
    servicesContainer.innerHTML = ""; // Clear existing services
  
    filteredServices.forEach((service) => {
      servicesContainer.innerHTML += `
        <div class="service-card">
          <h4>${service.name}</h4>
          <p>Category: ${service.category}</p>
          <p>Price: $${service.price}</p>
          <p>Rating: ${service.rating} ⭐</p>
        </div>`;
    });
  }
  
  // Filter logic
  function applyFilters() {
    const selectedCategories = Array.from(
      document.querySelectorAll(".filter-category:checked")
    ).map((checkbox) => checkbox.value);
  
    const maxPrice = document.getElementById("price-range").value;
  
    let filteredServices = services.filter((service) => {
      const categoryMatch =
        selectedCategories.length === 0 ||
        selectedCategories.includes(service.category);
      const priceMatch = service.price <= maxPrice;
  
      return categoryMatch && priceMatch;
    });
  
    return filteredServices;
  }
  
  // Sort logic
  function applySorting(servicesToSort) {
    const sortOption = document.getElementById("sort-options").value;
  
    if (sortOption === "price-asc") {
      return servicesToSort.sort((a, b) => a.price - b.price);
    } else if (sortOption === "price-desc") {
      return servicesToSort.sort((a, b) => b.price - a.price);
    } else if (sortOption === "rating-desc") {
      return servicesToSort.sort((a, b) => b.rating - a.rating);
    }
  
    return servicesToSort;
  }
  
  // Event Listeners for Filter and Sort
  document.querySelectorAll(".filter-category").forEach((checkbox) => {
    checkbox.addEventListener("change", () => {
      const filteredServices = applyFilters();
      const sortedServices = applySorting(filteredServices);
      displayServices(sortedServices);
    });
  });
  
  document.getElementById("price-range").addEventListener("input", (event) => {
    document.getElementById("price-value").textContent = `Max: ${event.target.value}`;
    const filteredServices = applyFilters();
    const sortedServices = applySorting(filteredServices);
    displayServices(sortedServices);
  });
  
  document.getElementById("sort-options").addEventListener("change", () => {
    const filteredServices = applyFilters();
    const sortedServices = applySorting(filteredServices);
    displayServices(sortedServices);
  });
  
  // Initial display
  displayServices(services);
  
  