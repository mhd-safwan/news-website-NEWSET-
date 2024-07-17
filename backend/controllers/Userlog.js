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
    const { name, email, password } = req.body;
    try {
      const User = await Userlogin.findOne({ email });
      if (!User || User.password !== password) {
        return res.status(400).send('Invalid credentials');
      }
      res.json({ message: 'Login successful'});
    } catch (error) {
      res.status(400).send('User login failed');
    }
  };
