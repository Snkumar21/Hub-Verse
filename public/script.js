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

// Script for login & logout with username display
document.addEventListener("DOMContentLoaded", function () {
    const userName = localStorage.getItem("userName");
    const welcomeSection = document.getElementById("welcome-section");
    const joinBtn = document.getElementById("join-btn");

    if (userName) {
        if (welcomeSection) {
        welcomeSection.innerHTML = `<h2>Welcome, ${userName}!</h2>`;
        }

        if (joinBtn) {
            joinBtn.textContent = "Logout";
            joinBtn.onclick = function () {
                localStorage.removeItem("userName");
                window.location.href = "login.html";
            };
        }
    } else {
        if (joinBtn) {
            joinBtn.textContent = "Join Now";
            joinBtn.onclick = function () {
                window.location.href = "login.html";
            };
        }
    }
});