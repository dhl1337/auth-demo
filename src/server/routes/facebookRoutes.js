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
    app.get('/connect/facebook', passport.authorize('facebook', { scope: ['email']}));
    app.get('/unlink/facebook', function (req, res) {
        var user = req.user;

        user.facebook.token = undefined;
        user.facebook.email = undefined;
        user.facebook.id = undefined;
        user.facebook.created = undefined;
        user.facebook.name = undefined;

        user.save(function(err) {
            if (err)
                throw err;
            res.redirect('/#/home');
        })
    });



    app.get('/auth/current', isLoggedIn,function (req, res) {
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
    });
    function isLoggedIn(req, res, next) {

        // if user is authenticated in the session, carry on
        if (req.isAuthenticated())
            return next();

        // if they aren't redirect them to the home page
        res.redirect('/#/');
    }
};