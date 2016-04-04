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
    app.post('/connect/local', passport.authenticate('local-signup', {
        successRedirect: '/#/home',
        failureRedirect: '/#/home'
    }));
    app.get('/unlink/local', function (req, res) {
        var user = req.user;

        user.local.email = undefined;
        user.local.password = undefined;

        user.save(function(err) {
            if (err)
                throw err;
            res.redirect('/#/home');
        })
    })
};
