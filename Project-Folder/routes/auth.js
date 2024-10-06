const express = require('express');
const fs = require('fs');
const path = require('path');
const router = express.Router();

// Path to the JSON file
const usersFile = path.join(__dirname, '../data/users.json');

// Registration Page
router.get('/register', (req, res) => {
    res.render('register', { title: 'Register' });
});

// Handle Registration
router.post('/register', (req, res) => {
    const { username, password } = req.body;
    
    // Read current users from the JSON file
    let users = JSON.parse(fs.readFileSync(usersFile));
    
    // Check if the user already exists
    if (users.find(user => user.username === username)) {
        return res.status(400).send('User already exists.');
    }
    
    // Add new user to the list
    users.push({ username, password });
    
    // Save the new list to the JSON file
    fs.writeFileSync(usersFile, JSON.stringify(users, null, 2));
    
    res.redirect('/auth/login');
});

// Login Page
router.get('/login', (req, res) => {
    res.render('login', { title: 'Login' });
});

// Handle Login
router.post('/login', (req, res) => {
    const { username, password } = req.body;
    
    // Read users from the JSON file
    let users = JSON.parse(fs.readFileSync(usersFile));
    
    // Find the user
    const user = users.find(user => user.username === username && user.password === password);
    
    if (user) {
        res.redirect('/auth/dashboard');
    } else {
        res.status(400).send('Invalid credentials.');
    }
});

// Dashboard (only after login)
router.get('/dashboard', (req, res) => {
    res.render('dashboard', { title: 'Dashboard', message: 'Welcome to your dashboard!' });
});

module.exports = router;
