/**
 * Created by danle on 4/2/16.
 */

// Dependencies
var bodyParser = require('body-parser'),
    express = require('express'),
    expressSession = require('express-session'),
    db = require('./config/database.js'),
    mongoose = require('mongoose'),
    passport = require('passport'),
    config = require('./config/config.js');

// Express
var app = express ();

mongoose.connect(db.url);
mongoose.connection.once('open', function () {
    console.log("Successfully connected to mongodb")
});

require('./config/passport.js')(passport);

// Express Middleware
app.use(expressSession(config.session));
app.use(passport.initialize());
app.use(passport.session());
app.use(bodyParser.json());
app.use(express.static(__dirname + '/../public'));

var User = require('./models/user.js');

app.delete('/api/user/:id', function (req, res) {
    User.remove({_id: req.params.id}, function (err, result) {
        if(err) {
            res.status(500).send('failed to delete');
        } else {
            res.json('Success!');
        }
    })
});

app.get('/api/users',function (req, res){
    User.find({})
        .exec(function (err, result) {
            if (err) {
                res.status(500).send(err)
            } else {
                res.json(result);
            }
        })
});

// Facebook Authentication Endpoints
require('./routes/facebookRoutes.js')(app);

// Twitter Authentication Endpoints
require('./routes/twitterRoutes.js')(app);

// Local Endpoints
require('./routes/localRoutes.js')(app);

// Connections
var port = config.port;
app.listen(port, function () {
    console.log('listening on port ' + port);
});