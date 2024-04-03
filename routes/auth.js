const express = require("express");

const User = require('../models/user');

const jwt = require("jsonwebtoken");

const router = express.Router();

router.post("/signup", (req, res, next) => {
    const role = "user"
    const user = new User({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        mobile: req.body.mobile,
        password: req.body.password,
        role: role,
        expiresIn: 3600
    });
    user.save()
        .then(result => {
            res.status(200).json({
                message: "User created",
                result: result
            });
        })
        .catch(err => {
            res.status(500).json({
                error: err
            });
        });
});

router.post("/login", (req, res, next) => {
    let fetchedUser;
    User.findOne({ mobile: req.body.mobile })
        .then(user => {
            console.log(user)
            if (!user) {
                return res.status(401).json({
                    message: "Auth failed, Email error"
                });
            }
            fetchedUser = user
            if (user.password !== req.body.password) {
                return res.status(402).json({
                    message: "Auth failed, Password error"
                });
            }
            const token = jwt.sign(
                { email: fetchedUser.email, userId: fetchedUser._id },
                'secret_setup',
                { expiresIn: "1h" }
            );
            res.status(200).json({
                token: token,
                name: fetchedUser.firstName + " " + fetchedUser.lastName,
                email: fetchedUser.email,
                role: fetchedUser.role,
                id: fetchedUser._id
            })
        })
        .catch(err => {
            return res.status(401).json({
                message: "Auth failed"
            });
        })
});

module.exports = router;