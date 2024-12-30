// Handle star rating clicks
document.querySelectorAll(".rating span").forEach((star) => {
    star.addEventListener("click", () => {
      const rating = star.getAttribute("data-rating");
      document.querySelectorAll(".rating span").forEach((s) => {
        s.classList.toggle("active", s.getAttribute("data-rating") <= rating);
      });
    });
  });
  
  // Handle photo upload
  document.getElementById("photo-upload").addEventListener("change", (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const photoBox = document.querySelector(".photo-box");
        photoBox.style.backgroundImage = `url(${reader.result})`;
        photoBox.style.backgroundSize = "cover";
        photoBox.style.backgroundPosition = "center";
      };
      reader.readAsDataURL(file);
    }
  });
  
  // Handle logo upload
//   document.getElementById("logo-upload").addEventListener("change", (event) => {
//     const file = event.target.files[0];
//     if (file) {
//       const reader = new FileReader();
//       reader.onload = () => {
//         const logo = document.querySelector(".logo");
//         logo.style.backgroundImage = `url(${reader.result})`;
//         logo.style.backgroundSize = "cover";
//         logo.style.backgroundPosition = "center";
//         logo.style.color = "transparent";
//       };
//       reader.readAsDataURL(file);
//     }
//   });
  

// Script to display the user's name dynamically based on login/signup
function displayUserName() {
  const userName = localStorage.getItem('userName') || 'Guest'; // Fallback to 'Guest' if no name found
  document.getElementById('welcomeName').textContent = userName;
}

// Call displayUserName when the page loads
window.onload = displayUserName;

function toggleNotificationDropdown() {
  const dropdown = document.getElementById('notificationDropdown');
  const button = document.querySelector('.notification-btn');

  // Get button's position to align dropdown below
  const rect = button.getBoundingClientRect();
  dropdown.style.position = 'absolute';
  dropdown.style.top = `${rect.bottom + window.scrollY}px`;
  dropdown.style.left = `${rect.left + window.scrollX}px`;

  dropdown.style.display = dropdown.style.display === 'block' ? 'none' : 'block';
}


// Function to toggle "No History Recorded" message
function toggleHistoryMessage() {
  const historyMessageContainer = document.getElementById('historyMessageContainer');
  const historyBtn = document.getElementById('historyBtn');

  // Get button's position to align the message below
  const rect = historyBtn.getBoundingClientRect();
  historyMessageContainer.style.position = 'absolute';
  historyMessageContainer.style.top = `${rect.bottom + window.scrollY}px`;
  historyMessageContainer.style.left = `${rect.left + window.scrollX}px`;

  // Toggle the display of the message
  if (historyMessageContainer.style.display === 'block') {
      historyMessageContainer.style.display = 'none';
  } else {
      historyMessageContainer.style.display = 'block';
      historyMessageContainer.textContent = "No History Recorded";
      historyMessageContainer.style.color = "gray";
      historyMessageContainer.style.fontStyle = "italic";
      historyMessageContainer.style.padding = "10px";
      historyMessageContainer.style.marginTop = "10px";
  }
}

// Function to toggle "No Pending Appointments" message
function togglePendingMessage() {
  const pendingMessageContainer = document.getElementById('pendingMessageContainer');
  const pendingBtn = document.getElementById('pendingBtn');

  // Get button's position to align the message below
  const rect = pendingBtn.getBoundingClientRect();
  pendingMessageContainer.style.position = 'absolute';
  pendingMessageContainer.style.top = `${rect.bottom + window.scrollY}px`;
  pendingMessageContainer.style.left = `${rect.left + window.scrollX}px`;

  // Toggle the display of the message
  if (pendingMessageContainer.style.display === 'block') {
      pendingMessageContainer.style.display = 'none';
  } else {
      pendingMessageContainer.style.display = 'block';
      pendingMessageContainer.textContent = "No Pending Appointments";
      pendingMessageContainer.style.color = "gray";
      pendingMessageContainer.style.fontStyle = "italic";
      pendingMessageContainer.style.padding = "10px";
      pendingMessageContainer.style.marginTop = "10px";
  }
}

// Event listeners for the side buttons
document.getElementById("historyBtn").addEventListener("click", toggleHistoryMessage);
document.getElementById("pendingBtn").addEventListener("click", togglePendingMessage);
const Bt = document.getElementById("Button");

Bt.addEventListener("click", () => {
    console.log("You are logged in")
    // h1.style.color = "blue";

}
)

document.querySelector('form').addEventListener('submit', function (e) {
    e.preventDefault(); // Prevent the form from submitting to the server

    // Get the username and password input values
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

     // Log the entered values to the console
     console.log('Username:', username);
     console.log('Password:', password);

    // Store the username and password in local storage
    localStorage.setItem('username', username);
    localStorage.setItem('password', password);

    // Optionally, you can show a confirmation message or redirect the user
    alert('Username and password saved in local storage!');
});
