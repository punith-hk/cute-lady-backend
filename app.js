const http = require('http');

const express = require('express');

const bodyParser = require('body-parser');

const app = express();

const routes = require("./routes/routes");
const userRoutes = require("./routes/auth");

const mongoose = require('mongoose');

const uri = "mongodb+srv://puneeth:Punith%401903.@cluster0.537wsyw.mongodb.net/node-angular?retryWrites=true&w=majority";

mongoose.connect(uri)
    .then(() => {
        console.log("connected to data base")
    })
    .catch(() => {
        console.log("failed")
    })

app.use(bodyParser.json());

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept"
    );
    res.setHeader(
        "Access-Control-Allow-Methods",
        "PUT, GET, HEAD, POST, DELETE, OPTIONS"
    );
    next()
});

app.use("/api/data", routes);
app.use("/api/user", userRoutes);

app.listen(7000);