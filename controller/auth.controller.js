const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');

const User = require('../models/user.model');
const { required } = require('nodemon/lib/config');

// const hashPassword = async (password) => {
//     const saltRounds = 10;
//     const hashedPassword = await bcrypt.hash(password, saltRounds);
//     return hashedPassword;
// };

// // Function to compare a password with a hashed password
// const comparePassword = async (password, hashedPassword) => {
//     const match = await bcrypt.compare(password, hashedPassword);
//     return match;
// };

// Signup
router.post('/signup', async (req, res) => {
    try {
        const { username, password } = req.body;

        // Hash the password before saving it to the database
        const hashedPassword = await bcrypt.hash(password, 10);

        const user = new User({
            username,
            password: hashedPassword,
        });

        const savedUser = await user.save();
        res.status(201).json(savedUser);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Signin
router.post('/signin', async (req, res) => {
    try {
        const { username, password } = req.body;

        const user = await User.findOne({ username });

        if (!user) {
            return res.status(401).json({ message: 'Invalid username or password' });
        }

        const passwordMatch = await bcrypt.compare(password, user.password);

        if (!passwordMatch) {
            return res.status(401).json({ message: 'Invalid username or password' });
        }

        const token = jwt.sign({ username: user.username, userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        // Include the token in the response
        res.status(200).json({ message: 'Signin successful', token });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;

