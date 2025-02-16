document.getElementById("contact-form").addEventListener("submit", (e) => {
    e.preventDefault(); // Prevent default form submission
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const subject = document.getElementById("subject").value;
    const message = document.getElementById("message").value;
  
    // Simulate form submission
    alert(`Thank you, ${name}! Your message has been sent.`);
  
    // Optionally, send data to a server using fetch or similar methods
    // Example:
    // fetch('/send-message', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({ name, email, subject, message }),
    // })
    //   .then(response => response.json())
    //   .then(data => console.log('Success:', data))
    //   .catch(error => console.error('Error:', error));
  });
  