const fuser = require("../models/user")
const bcrypt = require("bcryptjs")
const passport = require("passport")
const LocalStrategy = require("passport-local")
const flash = require("connect-flash");

module.exports = function(app) {
    app.use(flash());
    app.use(require("express-session")({
        secret: "mmr",
        resave: false,
        saveUninitialized: false
    }))
    app.use(passport.initialize())
    app.use(passport.session())
    passport.use(new LocalStrategy(fuser.authenticate()))

    passport.use(new LocalStrategy(
        async function(username, password, done) {
            try {
                var user = await fuser.findOne({ username: username })
                if (!user) {
                    return done(null, false, { message: "invalid Name" });
                }
                if (await bcrypt.compare(password, user.password)) {
                    return done(null, user);
                } else {
                    return done(null, false, { message: "invalid password" });
                }
            } catch (e) {
                console.log(e)
            }
        }
    ));

    passport.serializeUser(function(user, done) {
        done(null, user.id);
    });

    passport.deserializeUser(function(id, done) {
        fuser.findById(id, function(err, user) {
            done(err, user);
        });
    });


    //passport.deserializeUser(euser.deserializeUser())
    app.use(function(req, res, next) {
        res.locals.currentUser = req.user;
        res.locals.message = req.flash("error")
        next();
    })
}