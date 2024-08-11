const express = require('express');
const mongoose = require('mongoose');
const path = require('path');

const uri = "mongodb://localhost:27017/login";
const port = 3001;  // Changed port

const app = express();

app.use(express.json());  // To parse JSON bodies
app.use(express.urlencoded({ extended: true })); // To parse URL-encoded data
app.use(express.static('public'));  // Serve static files

// Define the User schema and model
const UserSchema = new mongoose.Schema({
    username: { type: String, required: true },
    password: { type: String, required: true },
});

const User = mongoose.model('User', UserSchema);

// Connect to MongoDB
mongoose.connect(uri)
    .then(() => console.log("Connected to MongoDB successfully!"))
    .catch(err => console.error("Failed to connect to MongoDB:", err));

// Handle form submissions to add a user
app.post('/addUser', async (req, res) => {
    const { username, password } = req.body;

    console.log("Received data:", { username, password }); // Log received data

    if (!username || !password) {
        console.log("Missing username or password");
        return res.status(400).send('Username and password are required');
    }

    try {
        const newUser = new User({ username, password });
        await newUser.save();
        console.log("User added:", newUser);
        res.status(200).send('User added successfully!');
    } catch (error) {
        console.error("Error adding user:", error);
        res.status(500).send('Failed to add user');
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}/`);
});
