const express = require("express");

const User = require('../models/user');

const router = express.Router();

router.post("/signup", (req, res, next) => {
    const role = "user"
    const user = new User({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        mobile: req.body.mobile,
        password: req.body.password,
        role: role
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

module.exports = router;