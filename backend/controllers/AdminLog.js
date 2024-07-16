const Admin = require('../models/adminmodel');

module.exports.loginProcess = async (req, res) => {
  const { username, password } = req.body;
  try {
    const admin = await Admin.findOne({ username });
    if (!admin || admin.password !== password) {
      return res.status(400).send('Invalid credentials');
    }
    req.session.adminId = admin._id;
    res.json({ message: 'Login successful', sessionId: req.sessionID });
  } catch (error) {
    res.status(400).send('Admin login failed');
  }
};

module.exports.logout = (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).send(' failed');
    }
    res.json({ message: 'Logout' });
  });
};
