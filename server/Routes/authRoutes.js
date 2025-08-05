const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();

module.exports = (db) => {
    // Register Route
    router.post('/register', (req, res) => {
        const { userName, email, phone, password } = req.body;
         console.log("New user registered!:", { userName, email, phoneNumber, password });
        

        if (!userName || !email || !phone || !password) {
            return res.status(400).json({ error: 'All fields are required' });
        }

        db.run(`INSERT INTO users (userName, email, phone, password) VALUES (?, ?, ?, ?)`,
            [userName, email, phone, password],
            function (err) {
                if (err) {
                    console.error(err);
                    return res.status(400).json({ error: 'Email already exists' });
                }
                res.json({ message: 'Registration Successful' });
            }
        );
    });

    // login Route
    router.post('/login', (req, res) => {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ error: 'Email and Password are required' });
        }

        db.get(`SELECT * FROM users WHERE email = ?`, [email], (err, user) => {
            if (err) {
                console.error('DB Error:', err);
                return res.status(500).json({ error: 'Database Error' });
            }

            if (!user) {
                console.log("No user found with email:", email);
                return res.status(400).json({ error: 'Invalid Email or Password' });
            }

            console.log("User found:", user);

            if (user.password !== password) {
                alert('Incorrect password for user:', email);
                return res.status(400).json({ error: 'Invalid Email or Password' });
            }

            const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '1h' });
            return res.json({ token });
        });
    });

    return router;
};
