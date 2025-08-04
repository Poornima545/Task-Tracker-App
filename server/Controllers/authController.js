const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const SECRET_KEY = 'your_secret_key';

exports.registerUser = (req, res) => {
  const { userName, email, phone, password } = req.body;
  const hashedPassword = bcrypt.hashSync(password, 8);
  req.db.run('INSERT INTO users (userName, email, phone, password) VALUES (?, ?, ?, ?)', [userName, email, phone, hashedPassword], function(err) {
    if (err) return res.status(400).send({ error: 'User registration failed. Email might already exist.' });
    res.send({ id: this.lastID, email });
  });
};

exports.loginUser = (req, res) => {
  const { email, password } = req.body;
  req.db.get('SELECT * FROM users WHERE email = ?', [email], (err, user) => {
    if (err || !user || !bcrypt.compareSync(password, user.password)) {
      return res.status(401).send({ error: 'Invalid credentials' });
    }
    const token = jwt.sign({ id: user.id, email: user.email }, SECRET_KEY);
    res.send({ token });
  });
};

exports.forgotPassword = (req, res) => {
  const { email } = req.body;
  req.db.get('SELECT * FROM users WHERE email = ?', [email], (err, user) => {
    if (err || !user) {
      return res.status(404).send({ error: 'User not found' });
    }
    res.send({ message: 'Password reset link has been sent to your email (mock)' });
  });
};