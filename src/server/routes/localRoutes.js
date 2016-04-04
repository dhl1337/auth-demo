/**
 * Created by danle on 4/3/16.
 */
var passport = require('passport');

module.exports = function (app) {
    app.post('/auth/signup', passport.authenticate('local-signup', {
        successRedirect: '/#/home',
        failureRedirect: '/#/'
    }));
    app.post('/auth/login', passport.authenticate('local-login', {
        successRedirect: '/#/home',
        failureRedirect: '/#/'
    }));
};
