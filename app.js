const express = require("express")
const app = express()
const bodyparse = require("body-parser")
app.use(express.static(__dirname + "/public"));
const methodOverride = require("method-override")
app.use(methodOverride("_method"))
const flash = require('connect-flash')
app.use(flash())

app.use(bodyparse.urlencoded({ extended: true }))
app.set("view engine", "ejs")

//db configuration
require("./config/dbconnection")

//Routes
const authRoute = require("./routes/auth")
const studentAluminiRoute = require("./routes/student-alumini.route")

//passport configuration
require("./config/passportconfig")(app)

//Using routes
app.use(authRoute)
app.use(studentAluminiRoute)

//server listening
app.listen(process.env.PORT || 3000, function() {
    console.log("started")
})