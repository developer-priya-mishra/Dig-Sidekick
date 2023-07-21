const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const auth = require("../middleware/auth")
const User = require("../models/user.model");

// create
router.post("/register", async (req, res) => {
    try {
        let { name, email, password, confirmPassword } = req.body;

        if (!name || !email || !password || !confirmPassword)
            return res.status(400).json({ msg: "Not all fields have been entered." });

        else if (password.length < 8)
            return res
                .status(400)
                .json({ msg: "The password needs to be at least 8 characters long." });

        else if (password !== confirmPassword)
            return res
                .status(400)
                .json({ msg: "Password and Confirm Password must be same" });

        else {
            const existingUser = await User.findOne({ email: email });

            if (existingUser)
                return res
                    .status(400)
                    .json({ msg: "An account with this email already exists." });

            else {
                const salt = await bcrypt.genSalt();
                const passwordHash = await bcrypt.hash(password, salt);
                const newUser = new User({
                    name,
                    email,
                    password: passwordHash

                });
                const savedUser = await newUser.save();
                return res.status(200).json({ msg: "Successfully registered" });
            }
        }
    } catch (error) {
        return res.status(500).json({ msg: error.message });
    }
});

// read
router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password)
            return res.status(400).json({ msg: "Not all fields have been entered." });

        else {
            const user = await User.findOne({ email: email });

            if (!user)
                return res
                    .status(400)
                    .json({ msg: "No account with this email has been registered." });

            else {
                const isMatch = await bcrypt.compare(password, user.password);

                if (!isMatch)
                    return res.status(400).json({ msg: "Invalid credentials." });

                else {
                    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

                    return res.status(200).json({
                        token,
                        user: {
                            id: user._id,
                            name: user.name,
                            email: user.email
                        },
                    });
                }
            }
        }
    } catch (error) {
        return res.status(500).json({ msg: error.message });
    }
});

// read
router.get("/getAllUsers", async (req, res) => {
    try {
        const users = await User.find();

        return res.status(200).json(users);
    } catch (error) {
        return res.status(500).json({ msg: error.message });
    }
})

// update
router.put('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { name, email } = req.body;

        const updatedUser = await User.findByIdAndUpdate(id, { name, email }, { new: true });
        console.log("ok")
        return res.status(200).json(updatedUser);
    } catch (error) {
        return res.status(500).json({ msg: error.message });
    }
});

// delete
router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;

        await User.findByIdAndRemove(id);

        return res.status(200).json({ msg: 'User deleted successfully' });
    } catch (error) {
        return res.status(500).json({ msg: error.message });
    }
});

// read, search
router.post("/search", async (req, res) => {
    const { searchQuery } = req.body;

    try {
        const users = await User.find();

        const matchedUsers = []

        for(var i=0; i<users.length; i++){
            if(users[i].name.split(" ").join("").toLowerCase().includes(searchQuery.toLowerCase()) || users[i].email.toLowerCase().includes(searchQuery.toLowerCase())){
                matchedUsers.push(users[i]);
            }
        }

        return res.status(200).json(matchedUsers);
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({ msg: error.message });
    }
})

module.exports = router;