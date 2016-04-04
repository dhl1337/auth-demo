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
    app.get('/connect/twitter', passport.authorize('twitter', { scope: ['email']}));
    app.get('/unlink/twitter', function (req, res) {
        var user = req.user;

        user.twitter.id = undefined;
        user.twitter.token = undefined;
        user.twitter.name = undefined;
        user.twitter.email = undefined;
        user.twitter.created = undefined;

        user.save(function(err) {
            if (err)
                throw err;
            res.redirect('/home');
        })
    })
};


