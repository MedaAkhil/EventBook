const mongoose = require('mongoose');

const users = new mongoose.Schema({
    email:String,
    password:String
});

mongoose.model('Users', users);