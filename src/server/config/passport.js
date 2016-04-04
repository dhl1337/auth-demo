/**
 * Created by danle on 4/2/16.
 */
var FacebookStrategy = require('passport-facebook').Strategy,
    TwitterStrategy = require('passport-twitter').Strategy,
    LocalStrategy = require('passport-local').Strategy,
    User = require('./../models/user.js'),
    configAuth = require('./auth');

module.exports = function (passport) {
    passport.serializeUser(function(user, done) {
        done(null, user.id);
    });

    passport.deserializeUser(function(id, done) {
        User.findById(id, function(err, user) {
            done(err, user);
        });
    });

    passport.use('local-signup', new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback : true
    },
    function(req, email, password, done) {
        process.nextTick(function() {
            User.findOne({'local.email' : email}, function (err, user) {
                if (err)
                    return done(err);
                if (user) {
                    return done(null, false, console.log('email already taken'));
                } else {
                    var newUser = new User();

                    newUser.local.email = email;
                    newUser.local.password = newUser.generateHash(password);

                    // save our user to the database
                    newUser.save(function(err) {
                        if (err)
                            throw err;
                        // if successful, return the new user
                        return done(null, newUser);
                    });
                }
            })
        })
    }));

    passport.use('local-login', new LocalStrategy({
            usernameField: 'email',
            passwordField: 'password',
            passReqToCallback : true
        },
        function(req, email, password, done){
            process.nextTick(function() {
                User.findOne({'local.email' : email}, function(err, user) {
                    if (err)
                        return done(err);
                    if (!user)
                        return done(null, false, console.log('uh oh','failed'));
                    if (!user.validPassword(password))
                        return done(null, false, console.log('bad password'));
                    return done(null, user);
                })
            })
        }));

    passport.use(new FacebookStrategy({
            clientID: configAuth.facebookAuth.clientID,
            clientSecret: configAuth.facebookAuth.clientSecret,
            callbackURL: configAuth.facebookAuth.callbackURL,
            profileFields: ['emails', 'photos', 'name']
        },
        function(accessToken, refreshToken, profile, done) {
            //console.log('hello',profile);
            process.nextTick(function () {
                User.findOne({'facebook.id' : profile.id}, function (err, user) {
                    if (err)
                        return done(err);
                    if (user) {
                        return done(null, user);
                    } else {
                        var newUser            = new User();

                        newUser.facebook.id    = profile.id;
                        newUser.facebook.token = accessToken;
                        newUser.facebook.name  = profile.name.givenName + ' ' + profile.name.familyName;
                        newUser.facebook.email = profile.emails[0].value;
                        newUser.facebook.photo = profile.photos[0].value;
                        newUser.facebook.created = new Date().getTime();
                        //console.log(profile._json.location);

                        // save our user to the database
                        newUser.save(function(err) {
                            if (err)
                                throw err;

                            // if successful, return the new user
                            return done(null, newUser);
                        });
                    }
                });
            });
        }
    ));

    passport.use(new TwitterStrategy({
        consumerKey: configAuth.twitterAuth.consumerKey,
        consumerSecret: configAuth.twitterAuth.consumerSecret,
        callbackURL: configAuth.twitterAuth.callbackURL
    },
        function(accessToken, refreshToken, profile, done) {
            //console.log('hello',profile);
            process.nextTick(function () {
                User.findOne({'twitter.id' : profile.id}, function (err, user) {
                    if (err)
                        return done(err);
                    if (user) {
                        return done(null, user);
                    } else {
                        console.log('hello', profile);
                        var newUser            = new User();

                        newUser.twitter.id    = profile.id;
                        newUser.twitter.token = accessToken;
                        newUser.twitter.name  = profile.displayName;
                        newUser.twitter.photo = profile.photos[0].value;
                        newUser.twitter.created = new Date().getTime();
                        //console.log(profile._json.location);

                        // save our user to the database
                        newUser.save(function(err) {
                            if (err)
                                throw err;

                            // if successful, return the new user
                            return done(null, newUser);
                        });
                    }
                });
            });
        }
    ));
};