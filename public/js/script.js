// Ensure the DOM is fully loaded before running the script
document.addEventListener('DOMContentLoaded', function() {
    const loginButton = document.getElementById('loginButton');

    // Attach an event listener to the login button
    loginButton.addEventListener('click', function() {
        // Prevent form submission if inside a form
        event.preventDefault();

        // Capture the username and password values
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;

        // Simple validation (optional)
        if (username === '' || password === '') {
            alert('Please enter both username and password.');
            return;
        }

        // Log to console for debugging
        console.log('Login button clicked');
        console.log('Username:', username);
        console.log('Password:', password);

        // Example: sending data to the server using Fetch API
        fetch('/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username: username, password: password })
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                alert('Login successful!');
            } else {
                alert('Login failed. Please try again.');
            }
        })
        .catch(error => console.error('Error:', error));
    });
});

const socket = io();

// Listen for messages from the server
socket.on('message', (msg) => {
    console.log('Message from server: ' + msg);
});

// Send a message to the server
socket.emit('message', 'Hello server!');
