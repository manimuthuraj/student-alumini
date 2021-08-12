const express = require("express")
const router = express.Router();
const fuser = require("../models/user")
const bcrypt = require("bcryptjs")
const passport = require("passport")
const controllers = require("../controllers/auth")
const middlewares = require("../middlewares/index")


//redirecting according to user
router.get("/", function (req, res) {
  if (req.user && req.user.role == "student") {
    res.redirect("/student");
  } else if (req.user && req.user.role == "alumini") {
    res.redirect("/alumini");
  } else {
    res.redirect("/login");
  }
})

//Register user-Display registration form
router.get("/register", middlewares.isAlreadyLogedin, controllers.registerForm)

//Create new user
router.post("/register", middlewares.isAlreadyLogedin, controllers.createUser)

//Display Login form
router.get("/login", middlewares.isAlreadyLogedin, controllers.loginForm)

//Login user
router.post("/login", middlewares.isAlreadyLogedin, controllers.loginUser)

//Logout user
router.get("/logout", controllers.logoutUser)

module.exports = router