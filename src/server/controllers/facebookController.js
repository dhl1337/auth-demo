/**
 * Created by danle on 4/2/16.
 */
module.exports = {
    logout: function (req, res) {
        req.logout();
        res.redirect('/#/home/index');
    },
    currentUser: function (req, res){
        if(req.isAuthenticated()) {
            res.json(req.user);
        } else {
            res.sendStatus(401);
        }
    }
};