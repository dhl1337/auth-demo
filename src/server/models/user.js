/**
 * Created by danle on 4/2/16.
 */
var mongoose = require('mongoose'),
    userSchema = mongoose.Schema({
    facebook : {
        id: {type: String},
        token: {type: String},
        email: {type: String},
        name: {type: String},
        photo: {type: String},
        created: {type: String}
    }
});

module.exports = mongoose.model('User', userSchema);