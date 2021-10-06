const express = require("express");
const bcryptjs = require('bcryptjs');
const router = express.Router();
const jwt = require('jsonwebtoken');

const authenticate = require("../middleware/authenticate");
require('../db/conn');
const User = require("../model/userSchema");
const { Router } = require("express");

router.get("/", (req, res) => {
    res.send("<h1>This is MERN Stack Home Page in auth.js</h1>");
});

// Using Promises.
// router.post('/register', (req, res) => {

//     const { name, email, phone, work, password, cpassword } = req.body;

//     if (!name || !email || !phone || !work || !password || !cpassword) {
//         return res.status(422).json({ error: "Plzz filled the filed properly" });
//     }

//     User.findOne({ email: email })
//         .then((userExist) => {
//             if (userExist) {
//                 return res.status(422).json({ error: "Email already exist!!" });
//             }
//             const user = new User({ name, email, phone, work, password, cpassword });

//             user.save().then(() => {
//                 res.status(201).json({ message: "User Registerd Successfully" });
//             }).catch((err) => res.status(500).json({ error: "Failed to registerd" }));
//         }).catch(err => { console.log(err) });
// });

// Using Async - Await
router.post('/register', async (req, res) => {

    const { name, email, phone, work, password, cpassword } = req.body;

    if (!name || !email || !phone || !work || !password || !cpassword) {
        return res.status(422).json({ error: "Plzz filled the filed properly" });
    }

    try {
        const userExist = await User.findOne({ email: email });
        if (userExist) {
            return res.status(422).json({ error: "Email already exist!!" });
        } else if (password != cpassword) {
            return res.status(422).json({ error: "Password and Confirmed Password does not matching!" });
        } else {
            const user = new User({ name, email, phone, work, password, cpassword });

            await user.save();
            res.status(201).json({ message: "User Registerd Successfully" });
        }
    } catch (err) {
        console.log(err);
    }
});

// Login Route
router.post('/signin', async (req, res) => {
    try {
        let token;
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ error: "Plzz Filled The Data" })
        }

        const userLogin = await User.findOne({ email: email });
        // console.log(userLogin);

        if (userLogin) {
            const isMatch = await bcryptjs.compare(password, userLogin.password);

            token = await userLogin.genrateAuthToken();
            console.log(token);

            res.cookie("jwtoken", token, {
                expires: new Date(Date.now() + 25892000000),
                httpOnly: true
            });

            if (!isMatch) {
                res.status(400).json({ error: "Invalid Credientials pass" });
            } else {
                res.json({ message: "User Signin Successfully" });
            }
        } else {
            res.status(400).json({ error: "Invalid Credientials" });
        }
    } catch (err) {
        console.log(err);
    }
});

// ABOUT US PAGE
router.get("/about", authenticate, (req, res) => {
    res.send(req.rootUser);
});

// GET USER DATA FOR CONTACT US & HOME PAGE.
router.get("/getData", authenticate, (req, res) => {
    res.send(req.rootUser);
});

// Contact Us Page 
router.post("/contact", authenticate, async (req, res) => {
    try {
        const { name, email, phone, message } = req.body;

        if (!name || !email || !phone || !message) {
            console.log("Error in contact form");
            return res.json({ error: "plzz filled the contact form" })
        }

        const userContact = await User.findOne({ _id: req.userID });

        if (userContact) {

            const userMessage = await userContact.addMessage(name, email, phone, message);
            await userContact.save();
            res.status(201).json({ message: "User Contact Successfully" })
        }
    }
    catch (error) {
        console.log(error);
    }
});

// LOGOUT US PAGE
router.get("/logout", (req, res) => {
    res.clearCookie('jwtoken', { path: '/' })
    res.status(200).send('User logout');
});

module.exports = router;