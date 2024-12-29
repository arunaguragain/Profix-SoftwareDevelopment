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