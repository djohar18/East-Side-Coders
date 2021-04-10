
//reuired modules for user model
let mongoose = require('mongoose');
let passportLocalMongoose = require('passport-local-mongoose');

let userModel = new mongoose.Schema({
    username: {
        type: String,
        trim: true,
        required: 'username is required'
    },
    password: {
        type: String,
        trim: true,
        required: 'password is required'
    },
    email: {
        type: String,
        trim: true,
        required: 'email is required'
    },
    displayName: {
        type: String,
        trim: true
    }
},
{
    collection: "users"
}
);

let options = ({missingPasswordError: 'Wrong/missing password'});
userModel.plugin(passportLocalMongoose, options);

module.exports = mongoose.model('User', userModel);
