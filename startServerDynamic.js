const express = require('express');
const app = express();
const path = require('path');

// Controllers
const dynamicController = require('./controllers/dynamicController');

app.use(express.static(path.join(__dirname, 'public')));
app.use('/', dynamicController);

app.listen(3001, () => {
    console.log('Dynamic Server running on port 3001');
});
