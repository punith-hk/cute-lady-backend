const bcrypt = require("bcryptjs");

const User = require('../models/user');

const jwt = require("jsonwebtoken");

exports.createUser = (req, res, next) => {
    bcrypt.hash(req.body.password, 10).then(hash => {
        const role = "user"
        const user = new User({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            mobile: req.body.mobile,
            password: hash,
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
    })
}

exports.userLogin = (req, res, next) => {
    User.findOne({ mobile: req.body.mobile })
        .then(user => {
            if (!user) {
                return res.status(200).json({
                    message: "Auth failed, Email error",
                    errorCode: 401
                });
            }
            bcrypt.compare(req.body.password, user.password, (err, result) => {
                if (err) {
                    return res.status(500).json({
                        message: "Server error"
                    });
                }
                if (!result) {
                    return res.status(200).json({
                        message: "Auth failed, Password error!",
                        errorCode: 402
                    });
                }
                const token = jwt.sign(
                    { email: user.email, userId: user._id },
                    process.env.JWT_KEY,
                    { expiresIn: "1h" }
                );
                res.status(200).json({
                    token: token,
                    name: user.firstName + " " + user.lastName,
                    email: user.email,
                    role: user.role,
                    id: user._id
                });
            });
        })
        .catch(err => {
            res.status(500).json({
                message: "Server error"
            });
        });
};