const Userlogin = require("../models/Userlog");

module.exports.Reglogin = async (req, res) => {
    const { name, email, password } = req.body;

    try {
        const existingUser = await Userlogin.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }
        const newUser = new Userlogin({ name, email, password });
        await newUser.save(); 

        res.status(201).json({ message: 'User registered successfully', user: newUser });
    } catch (error) {
        res.status(500).json({ message: 'Registration failed', error: error.message });
    }
};


module.exports.Userlog = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await Userlogin.findOne({ email });
    if (!user || user.password !== password) {
      return res.status(400).send('Invalid credentials');
    }
    const sessionId ='123456789000' 
    res.json({ sessionId });
  } catch (error) {
    res.status(500).send('User login failed');
  }
};


module.exports. Userlogout = (req, res) => {
    try {
      req.session.destroy(err => {
        if (err) {
          return res.status(500).send('Logout failed');
        }
        res.status(200).send('Logged out successfully');
      });
    } catch (error) {
      res.status(500).send('Logout failed');
    }
  }
  