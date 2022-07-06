const mongoose = require('mongoose');
const { Schema } = mongoose;
const Model = mongoose.model;
const bcrypt = require('bcrypt-nodejs');


const userSchema = new Schema({
    userEmail: {
        type: String,
        required: true
    },
    userPassword: {
        type: String,
        required: true
    }
});

userSchema.methods.encryptPassword = (password) => {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10));
};


userSchema.methods.validatePassword = function (password) {
    return bcrypt.compareSync(password, this.password);
}

module.exports = Model('User', userSchema)