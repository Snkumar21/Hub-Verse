// Function to handle search
function handleSearch(event) {
    event.preventDefault(); // prevent form submission

    const query = document.getElementById("searchInput").value.trim();
    if (query) {
        window.location.href = `All Category.html?search=${encodeURIComponent(query)}`;
    }
}

// Function to handle search button click -- All Category Page
document.addEventListener("DOMContentLoaded", () => {
    const urlParams = new URLSearchParams(window.location.search);
    const searchQuery = urlParams.get("search")?.toLowerCase();

    if (searchQuery) {
        const courseCards = document.querySelectorAll(".course-box");
        let found = false;

        courseCards.forEach(card => {
            const title = card.querySelector(".course-title")?.textContent.toLowerCase();
            if (title.includes(searchQuery)) {
                card.style.display = "block";
                found = true;
            } else {
                card.style.display = "none";
            }
        });

        if (!found) {
            const container = document.querySelector(".course-container");
            const noResult = document.createElement("p");
            noResult.textContent = `No courses found for "${searchQuery}"`;
            noResult.style.color = "white";
            noResult.style.fontSize = "20px";
            container.appendChild(noResult);
        }
    }
});

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