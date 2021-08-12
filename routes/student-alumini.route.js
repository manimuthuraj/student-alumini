const express = require("express")
const router = express.Router();
const fuser = require("../models/user")
const scheduling = require("../models/scheduling")
const controllers = require("../controllers/student-alumini.controller")
const middlewares = require("../middlewares/index")

//Display student slot Details
router.get("/student", middlewares.isLoggedIn, middlewares.checkStudentRouteOwnership, controllers.student)

//Create a new slot
router.post("/createSlot", middlewares.isLoggedIn, controllers.createSlot)

//get alumini 
router.get("/alumini", middlewares.isLoggedIn, middlewares.checkAluminiRouteOwnership, controllers.getAlumini)

//Alumini approve 
router.put("/slot/approve/:id", middlewares.isLoggedIn, controllers.approveSlot)

//Alumini reject 
router.put("/slot/reject/:id", middlewares.isLoggedIn, controllers.rejectSlot)


module.exports = router