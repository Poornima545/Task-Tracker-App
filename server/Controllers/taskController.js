exports.getTasks = (req, res) => {
  req.db.all('SELECT * FROM tasks WHERE user_id = ?', [req.user.id], (err, tasks) => {
    res.send(tasks);
  });
};

exports.createTask = (req, res) => {
  const { title, description } = req.body;
  req.db.run('INSERT INTO tasks (title, description, status, user_id) VALUES (?, ?, ?, ?)', [title, description, 'active', req.user.id], function(err) {
    if (err) return res.status(500).send({ error: 'Task creation failed' });
    res.send({ id: this.lastID, title, description, status: 'active' });
  });
};

exports.updateTask = (req, res) => {
  const { title, description, status } = req.body;
  req.db.run('UPDATE tasks SET title = ?, description = ?, status = ? WHERE id = ? AND user_id = ?', [title, description, status, req.params.id, req.user.id], function(err) {
    if (err) return res.status(500).send({ error: 'Task update failed' });
    res.send({ message: 'Task updated' });
  });
};

exports.deleteTask = (req, res) => {
  req.db.run('DELETE FROM tasks WHERE id = ? AND user_id = ?', [req.params.id, req.user.id], function(err) {
    if (err) return res.status(500).send({ error: 'Task deletion failed' });
    res.send({ message: 'Task deleted' });
  });
};