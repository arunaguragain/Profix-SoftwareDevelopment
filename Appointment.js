// Get the popup element and close button
const popup = document.getElementById("popupForm");
const closePopupBtn = document.getElementById("closePopup");
const form = document.getElementById("appointmentForm");

// Close the popup when "Cancel" is clicked
closePopupBtn.addEventListener("click", () => {
    popup.classList.remove("active");
});

// Handle form submission
form.addEventListener("submit", (event) => {
    event.preventDefault(); // Prevent default form submission

    // Gather form data
    const phone = document.getElementById("phone").value;
    const date = document.getElementById("preferred-date").value;
    const time = document.getElementById("preferred-time").value;
    const address = document.getElementById("address").value;
    const problem = document.getElementById("problem").value;

    // Log the form data to the console or process it as needed
    console.log("Appointment Details:");
    console.log("Phone:", phone);
    console.log("Date:", date);
    console.log("Time:", time);
    console.log("Address:", address);
    console.log("Problem:", problem);

    alert("Appointment successfully submitted!");

    // Reset form and hide popup
    form.reset();
    popup.classList.remove("active");
});
