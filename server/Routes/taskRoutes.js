const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();

module.exports = (db) => {
    // Middlewares to verify JWT
    function verifyToken(req, res, next) {
        const token = req.headers['authorization'];
        if (!token) return res.status(401).json({ error: 'No token provided' });

        jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
            if (err) return res.status(500).json({ error: 'Failed to authenticate token' });

            req.userId = decoded.id;
            next();
        });
    }

    // Get All Tasks for logged-in User
    router.get('/', verifyToken, (req, res) => {
        db.all(`SELECT * FROM tasks WHERE user_id = ?`, [req.userId], (err, rows) => {
            if (err) return res.status(500).json({ error: 'Failed to fetch tasks' });
            res.json(rows);
        });
    });

    // Create a New Task
    router.post('/', verifyToken, (req, res) => {
        const { title, description } = req.body;

        db.run(`INSERT INTO tasks (title, description, user_id) VALUES (?, ?, ?)`, 
            [title, description, req.userId], 
            function(err) {
                if (err) return res.status(500).json({ error: 'Failed to create task' });
                res.json({ id: this.lastID, title, description, status: 'active' });
            }
        );
    });

    // Update Task Status or Content
    router.put('/:id', verifyToken, (req, res) => {
        const { title, description, status } = req.body;
        const { id } = req.params;

        db.run(`UPDATE tasks SET title = ?, description = ?, status = ? WHERE id = ? AND user_id = ?`,
            [title, description, status, id, req.userId],
            function(err) {
                if (err) return res.status(500).json({ error: 'Failed to update task' });
                if (this.changes === 0) return res.status(404).json({ error: 'Task not found' });
                res.json({ message: 'Task updated' });
            }
        );
    });

    // Delete a Task
    router.delete('/:id', verifyToken, (req, res) => {
        const { id } = req.params;

        db.run(`DELETE FROM tasks WHERE id = ? AND user_id = ?`, [id, req.userId], function(err) {
            if (err) return res.status(500).json({ error: 'Failed to delete task' });
            if (this.changes === 0) return res.status(404).json({ error: 'Task not found' });
            res.json({ message: 'Task deleted' });
        });
    });

    return router;
};
