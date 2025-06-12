// Function to handle search
function handleSearch(event) {
    event.preventDefault();
    const input = document.getElementById('searchInput').value.trim();
    if (input) {
        alert('Searching for: ' + input);
        // You can replace this alert with actual search logic or redirection
        // window.location.href = `/courses.html?search=${encodeURIComponent(input)}`;
    } else {
        alert('Please enter a course name to search.');
    }
}

// Function to redirect to login page
function redirectToLogin() {
    window.location.href = 'login.html';
}

// Function to redirect to home page
function redirectToHome() {
    window.location.href = 'index.html';
}

// Function to handle contact form submission
document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('contactForm');

    form.addEventListener('submit', function (event) {
        event.preventDefault();

        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const phone = document.getElementById('phone').value;
        const message = document.getElementById('message').value;

        // Make a POST request to your server for form submission
        fetch('/contact', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name, email, phone, message }),
        })
        .then((response) => response.json())
        .then((data) => {
            if (data.success) {
                alert('Message Submitted Successfully!');
                form.reset();
            } else {
                alert('Error: ' + data.message);
            }
        })
        .catch((error) => console.error('Error:', error));
    });
});

// JavaScript for handling user name display
document.addEventListener("DOMContentLoaded", function () {
    const params = new URLSearchParams(window.location.search);
    const userName = params.get("userName");

    if (userName) {
        const userNameElement = document.getElementById("userName");
        userNameElement.innerText = `${userName}`;
    }
});