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
        console.log('hey',user);
        done(null, user._id);
    });

    passport.deserializeUser(function(_id, done) {
        User.findById(_id, function(err, user) {
            done(err, user);
        });
    });

    passport.use('local-signup', new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback: true
    },
    function(req, email, password, done) {
        process.nextTick(function() {
            User.findOne({'local.email' : email}, function (err, user) {
                if (err)
                    return done(err);
                if (user)
                    return done(null, false, console.log('email been taken.'));
                if (!req.user) {
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
                } else {
                    var user = req.user;

                    user.local.email = email;
                    user.local.password = user.generateHash(password);

                    // save our user to the database
                    user.save(function(err) {
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
                        return done(null, false, console.log('no user found.'));
                    if (!user.validPassword(password))
                        return done(null, false, console.log('bad password.'));
                    return done(null, user);
                })
            })
        }));

    passport.use(new FacebookStrategy({
            clientID: configAuth.facebookAuth.clientID,
            clientSecret: configAuth.facebookAuth.clientSecret,
            callbackURL: configAuth.facebookAuth.callbackURL,
            profileFields: ['emails', 'photos', 'name'],
            passReqToCallback : true
        },
        function(req, accessToken, refreshToken, profile, done) {
            //console.log('hello',profile);
            process.nextTick(function () {
                if(!req.user){
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
                } else {
                    var user = req.user;
                    user.facebook.id = profile.id;
                    user.facebook.token = accessToken;
                    user.facebook.name = profile.name.givenName + ' ' + profile.name.familyName;
                    user.facebook.email = profile.emails[0].value;

                    user.save(function (err) {
                        if(err)
                            throw err;
                        return done(null, user);
                    })
                }
            });
        }
    ));

    passport.use(new TwitterStrategy({
        consumerKey: configAuth.twitterAuth.consumerKey,
        consumerSecret: configAuth.twitterAuth.consumerSecret,
        callbackURL: configAuth.twitterAuth.callbackURL,
        passReqToCallback : true
    },
        function(req, accessToken, refreshToken, profile, done) {
            //console.log('hello',profile);
            process.nextTick(function () {
                if (!req.user){
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
                            newUser.twitter.created = new Date().getTime();

                            // save our user to the database
                            newUser.save(function(err) {
                                if (err)
                                    throw err;

                                // if successful, return the new user
                                return done(null, newUser);
                            });
                        }
                    });
                } else {
                    var user = req.user;
                    user.twitter.id = profile.id;
                    user.twitter.token = accessToken;
                    user.twitter.name = profile.displayName;

                    user.save(function (err) {
                        if(err)
                            throw err;
                        return done(null, user);
                    })
                }
            });
        }
    ));
};