document.addEventListener("DOMContentLoaded", function () {
  const form = document.querySelector("form");
  const fullName = document.getElementById("fullName");
  const address = document.getElementById("address");
  const email = document.getElementById("email");
  const contact = document.getElementById("contact");
  const password = document.getElementById("password");
  const confirmPassword = document.getElementById("confirmPassword");

  form.addEventListener("submit", function (e) {
      e.preventDefault(); // Prevent form from submitting

      // Validate fields
      if (!fullName.value.trim()) {
          alert("Full Name is required.");
          fullName.focus();
          return;
      }

      if (!address.value.trim()) {
          alert("Address is required.");
          address.focus();
          return;
      }

      if (!email.value.trim()) {
          alert("Email is required.");
          email.focus();
          return;
      }

      // Validate email format
      const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      if (!emailPattern.test(email.value.trim())) {
          alert("Please enter a valid email address.");
          email.focus();
          return;
      }

      if (!contact.value.trim()) {
          alert("Contact is required.");
          contact.focus();
          return;
      }

      // Validate contact number (assumes 10 digits)
      const contactPattern = /^[0-9]{10}$/;
      if (!contactPattern.test(contact.value.trim())) {
          alert("Please enter a valid 10-digit contact number.");
          contact.focus();
          return;
      }

      if (!password.value.trim()) {
          alert("Password is required.");
          password.focus();
          return;
      }

      // Validate password strength (minimum 8 characters, at least one letter, one number)
      const passwordPattern = /^(?=.[a-zA-Z])(?=.\d)[A-Za-z\d]{8,}$/;
      if (!passwordPattern.test(password.value.trim())) {
          alert("Password must be at least 8 characters long, including uppercase, lowercase, special chracters and numbers.");
          password.focus();
          return;
      }

      if (password.value !== confirmPassword.value) {
          alert("Passwords do not match.");
          confirmPassword.focus();
          return;
      }

      // If all fields are valid
      alert("Signup successful!");

      // Optionally, you can log the form data or send it to a server
      // const userData = {
      //     fullName: fullName.value.trim(),
      //     address: address.value.trim(),
      //     email: email.value.trim(),
      //     contact: contact.value.trim(),
      //     password: password.value.trim(),
      // };

      // console.log("User Data:", userData);

      // Reset the form
      form.reset();
    });
});