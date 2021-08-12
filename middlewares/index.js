//checking ownership of the routes
function checkAluminiRouteOwnership(req, res, next) {
    if (req.isAuthenticated()) {
        if(req.user.role == 'alumini'){
            next()
        } else {
            req.flash("error", "Cant'access")
            res.redirect("/student")
        }
    } else {
        req.flash("error", "Please login")
        res.redirect("/login")
    }
}

//checking ownership of the routes
function checkStudentRouteOwnership(req, res, next) {
    if (req.isAuthenticated()) {
        if(req.user.role == 'student'){
            next()
        } else {
            req.flash("error", "Cant'access")
            res.redirect("/alumini")
        }
    } else {
        req.flash("error", "Please login")
        res.redirect("/login")
    }
}

//checking ownership of the routes
function checkAluminiRouteOwnership(req, res, next) {
    if (req.isAuthenticated()) {
        if(req.user.role == 'alumini'){
            next()
        } else {
            req.flash("error", "Cant'access")
            res.redirect("/student")
        }
    } else {
        req.flash("error", "Please login")
        res.redirect("/login")
    }
}

//Checkking is logged in or not and also checking y
function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
            return next();
    }
    req.flash("error", "Please login")
    res.redirect("/login")
}

//checing logedin or not and if yes restricting from registration and login page
async function isAlreadyLogedin(req, res, next) {
    if (req.isAuthenticated()) {
        return res.redirect("/")
    }
    next()
}

module.exports = {  checkStudentRouteOwnership, isLoggedIn, isAlreadyLogedin, checkAluminiRouteOwnership }