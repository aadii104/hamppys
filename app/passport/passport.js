var FacebookStrategy = require('passport-facebook').Strategy;
var GoogleSrategy = require('passport-google-oauth').OAuth2Strategy;
var User = require('../models/user');
var session = require('express-session');
var jwt = require('jsonwebtoken');
var secret = 'harrypotter';



module.exports = function (app, passport) {
    app.use(passport.initialize());
    app.use(passport.session());
    app.use(session({
        secret: 'keyboard cat',
        resave: false,
        saveUninitilized: true,
        cookie: {
            secure: false
        }
    }));

    passport.serializeUser(function (user, done) {
        token = jwt.sign({
            success: false,
            email: user.email
        }, secret, {
            expiresIn: '24h'
        });
        done(null, user.id);
    });
    passport.deserializeUser(function (id, done) {
        User.findById(id, function (id, user) {
            done(err, user);
        });
    });


    passport.use(new FacebookStrategy({
            clientID: '1893045187618838',
            clientSecret: '4dacccc8181b1a425a05661ca35bde9d',
            callbackURL: "http://localhost:5000/auth/facebook/callback",
            profileFields: ['id','displayName', 'photos', 'email']
        },
        function (accessToken, refreshToken, profile, done) {
            User.findOne({email: profile._json.email}).select('username active password email').exec(function (err, user) {
                if (err) done(err);
                if (user && user !== null) {
                    done(null, user);
                } else {
                    console.log(profile.emails[0].value);
                    var user = new User();

                    user.username = profile._json.name;               
                    //     newUser.facebook.name  = profile.name.givenName + ' ' + profile.name.familyName; // look at the passport user profile to see how names are returned
                    user.email = profile.emails[0].value;
                    user.save();
                }
            });
            done(null, profile);
        }
    ));

    passport.use(new GoogleSrategy({
            clientID: '810441631089-rhd3dv8tbnv5oodsgu90muprnmojp2fq.apps.googleusercontent.com',
            clientSecret: 'odlhXYl4onhGLB9whN6OqPJU',
            callbackURL: "http://localhost:5000/auth/google/callback"
        },
        function (accessToken, refreshToken, profile, done) {
            // console.log(profile);
              User.findOne({email: profile._json.email}).select('username active password email').exec(function (err, user) {
                if (err) done(err);
                if (user && user !== null) {
                    done(null, user);
                } else {
                    // console.log(profile._json.displayName);
                    // console.log(profile._json.emails[0].value);
                    var user = new User();

                    user.username = profile._json.displayName;               
                    user.email = profile._json.emails[0].value;
                    user.save();
                }
            });

            done(null, profile);

        }
    ));


    app.get('/auth/google/callback', passport.authenticate('google', {
        failureeRedirect: '/googleerror'
    }), function (req, res) {
        res.redirect('/google' + token);
    });

    app.get('/auth/facebook/callback', passport.authenticate('facebook', {
        failureRedirect: '/facebookerror'
    }), function (req, res) {
        res.redirect('/facebook/' + token);
    });

    app.get('/auth/google', passport.authenticate('google', {
        scope: ['https://www.googleapis.com/auth/plus.login', 'profile', 'email']
    }));
   

    app.get('/auth/facebook', function (req, res, next) {
        console.log("request received");
        next();
    }, passport.authenticate('facebook', {
        scope: 'email'
    }));




    return passport;
}