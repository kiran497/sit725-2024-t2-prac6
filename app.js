const express = require('express');
const app = express();
const router = express.Router();
const path = require('path');
const mongoose = require('mongoose');
const User = require('./models/dataModel');

// Database connection
mongoose.connect('mongodb://localhost:27017/login')
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log('MongoDB connection error: ', err));

app.use(express.json()); 
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Route for adding a user
router.post('/addUser', (req, res) => {
    const { username, password } = req.body;

    if (username && password) {
        const newUser = new User({ username, password });
        newUser.save()
            .then(() => res.status(200).json({ message: 'User added successfully' }))
            .catch(err => {
                console.error('Error saving user:', err);
                res.status(500).json({ message: 'Error adding user', error: err.message });
            });
    } else {
        res.status(400).json({ message: 'Please provide a username and password' });
    }
});
app.use('/', router);

// Start server
const PORT = process.env.PORT || 3002;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

module.exports = router;
