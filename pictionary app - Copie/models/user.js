const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    username: {type: String, required: true, unique: true},
    password: {type: String, required: true},   //à crypter cf suite utiliser bcryptjs
    email: {type: String, required: true, unique: true},
    admin: Boolean,
    gamesCreated: Array //array avec que des IDs de parties
});

UserSchema.pre('save', function(next){
    const user = this;
    bcrypt.hash(user.password, 15, function(error, encrypted){
        user.password = encrypted;
        //console.log(user.password);
        next();
    });
})

const User = mongoose.model('User', UserSchema);

module.exports = User;