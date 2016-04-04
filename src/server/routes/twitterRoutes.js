/**
 * Created by danle on 4/2/16.
 */
var passport = require('passport');

module.exports = function (app) {
    app.get('/auth/twitter', passport.authenticate('twitter'));
    app.get('/auth/twitter/callback', passport.authenticate('twitter',
        {
            successRedirect: '/#/home',
            failureRedirect: '/#/'
        }));
};


