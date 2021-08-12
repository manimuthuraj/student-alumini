const fuser = require("../models/user")
const bcrypt = require("bcryptjs")
const passport = require("passport")

const registerForm = function(req, res) {
    res.render("auth/register")
}

const createUser = async function(req, res) {
    try {
        let hashedPassword = await bcrypt.hash(req.body.password, 10) //Hasing password
        let user = { username: req.body.username, password: hashedPassword, }
        let createUser = await fuser.create(user)
        req.flash("error", "Now please Login")
        res.redirect("/login")
    } catch (e) {
        console.log(e)
        req.flash("error", "Some Thing went wrong please try again or use differnt name")
        res.redirect("/register")
    }
}

const loginForm = function(req, res) {
    res.render("auth/login")
}

const loginUser = passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/login",
    failureFlash: true
})

const logoutUser = function(req, res) {
    req.logout();
    req.flash("error", "Loged Out successfully")
    res.redirect("/login")
}

module.exports = { registerForm, createUser, loginForm, loginUser, logoutUser }