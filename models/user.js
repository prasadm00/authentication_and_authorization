let mongoose = require('mongoose')
// Schema = mongoose.Schema;

let userSchema = mongoose.Schema({
    fullName: String,
    email: String,
    role: String,
    password: String,
    created: Date,
});


const User = mongoose.model('User', userSchema);

module.exports = User