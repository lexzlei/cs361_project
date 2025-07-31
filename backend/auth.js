import express from 'express';
const router = express.Router();
import User from './models/User.js';

// Register new user
router.post('/register', async (req, res) => {
    try {
        const { email, password } = req.body;
        const existing = await User.findOne({ email });
        if (existing){
            return res.status(400).json({ message: 'User already exists' });    
        } 
        const newUser = new User({ email, password });
        await newUser.save();
        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        console.error('Error registering user:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// Login user
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email, });

        if (!user || user.password !== password) {
            return res.status(401).json({ message: 'Invalid email or password' });
        };
        res.status(200).json({ message: 'Login successful' });
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
});

export default router;