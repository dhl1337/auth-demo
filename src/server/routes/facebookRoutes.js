/**
 * Created by danle on 4/2/16.
 */
var passport = require('passport');

module.exports = function (app) {
    app.get('/auth/facebook', passport.authenticate('facebook', { scope: ['email']}));
    app.get('/auth/facebook/callback', passport.authenticate('facebook',
        {
            successRedirect: '/#/home',
            failureRedirect: '/#/'
        }));
    app.get('/auth/current', function (req, res) {
        if(req.isAuthenticated()) {
            res.json(req.user);
            //console.log('this is ',req.user);
        } else {
            res.sendStatus(401);
        }
    });
    app.get('/auth/logout', function (req, res) {
        req.logout();
        res.redirect('/#/');
    })
};