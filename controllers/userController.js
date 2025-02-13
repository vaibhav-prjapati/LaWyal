const User = require('../models/user');

const createUser = async (req, res) => {
    const { name, email } = req.body;

    try {
        const user = new User({ name, email });
        await user.save();
        res.status(201).json(user);
    } catch (error) {
        res.status(500).json({ message: "Error creating user", error });
    }
};

module.exports = { createUser };