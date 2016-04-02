/**
 * Created by danle on 4/2/16.
 */
var passport = require('passport');
var facebookController = '../controllers/facebookController.js';

module.exports = function (app) {
    app.get('/auth/facebook', passport.authenticate('facebook'));
    app.get('/auth/facebook/callback', passport.authenticate('facebook',
        {
            successRedirect: '/#/home/user',
            failureRedirect: '/#/home/index'
        }));
    app.get('/auth/current', function (req, res) {
        if(req.isAuthenticated()) {
            res.json(req.user);
        } else {
            res.sendStatus(401);
        }
    });
    app.get('/auth/logout', function (req, res) {
        req.logout();
        res.redirect('/#/home/index');
    })
};