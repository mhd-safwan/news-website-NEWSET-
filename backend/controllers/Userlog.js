const bcrypt = require("bcrypt");
const Userlogin = require("../models/Userlog");

module.exports.Reglogin = async (req, res) => {
    const { name, email, password } = req.body;

    try {
        const existingUser = await Userlogin.findOne({ email });
        if (existingUser) {
            return res.status(400).send('User already exists');
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new Userlogin({ name, email, password: hashedPassword });
        await newUser.save();
        
        res.status(201).send('User registered successfully');
    } catch (error) {
        res.status(500).send('Registration failed');
    }
};




