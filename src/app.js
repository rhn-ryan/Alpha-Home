require('dotenv').config()
const express = require("express");
const app = express();
const path = require("path");
const mongoose = require("mongoose");
const port = process.env.PORT || 3000;
const db = require("./db/conn");
const Register = require("./models/registers")
const hbs = require("hbs");
const bcrypt = require("bcrypt");


const static_path = path.join(__dirname, "../public");
const view_path = path.join(__dirname, "../templates/views");
const partials_path = path.join(__dirname, "../templates/partials");

app.use(express.static(static_path));
app.set("view engine", "hbs");
app.set("views", view_path);
hbs.registerPartials(partials_path);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));


app.get("/", (req, res) => {
    res.render("login");
})
app.get("/login", (req, res) => {
    res.render("login");
})
app.get("/register", (req, res) => {
    res.render("register");
})
app.get("/index", (req, res) => {
    res.render("index");
})
app.get("/about", (req, res) => {
    res.render("about");
})
app.get("/contact", (req, res) => {
    res.render("contact");
})
app.get("/breed/german", (req, res) => {
    res.render("breed/german");
})
app.get("/breed/labrador", (req, res) => {
    res.render("breed/labrador");
})
app.get("/organisation/posh", (req, res) => {
    res.render("organisation/posh");
})
app.get("/organisation/apolo", (req, res) => {
    res.render("organisation/apolo");
})


app.post("/register", async (req, res) => {
    try {
        const registerUser = new Register({
            username: req.body.username,
            phone: req.body.number,
            email: req.body.email,
            password: req.body.password
        })

        const registered = await registerUser.save();

        res.status(201).render("login");


    } catch (error) {
        res.render('404page', {
            errorMsg: "Opps! Data entered not valid, go back to try again..."
        })
    }
})


app.post("/login", async (req, res) => {
    try {
        const email = req.body.email;
        const password = req.body.password;
        const loginemail = await Register.findOne({ email: email });
        const loginpass = await bcrypt.compare(password, loginemail.password);

        if (loginpass) {
            res.status(201).render("index");
        }
        else {
            res.send("Invalid details Entered");
        }

    } catch (err) {
        res.render('404page', {
            errorMsg: "Opps! Login Credentials mismatched, go back to try again..."
        })
    }
})


app.get("*", (req, res) => {
    res.render('404page', {
        errorMsg: "Opps! page not found, Click Here to go back"
    })
})



app.listen(port, () => {
    console.log(`listening on port ${port}`)
})