// import mongoose
const mongoose = require('mongoose');

//imoort bcrypt
const bcrypt = require('bcrypt');


const UserSchema = new mongoose.Schema({
    name:{
        type: String,
        required: [true, 'must include user\'s name' ]
    },
    email:{
        type: String,
        required: [true, 'include email'],
        unique: [true, 'user with the given email already exist']
    },
    password:{
        type: String,
        required:[true, 'must include password'],
        min:6,
        max: 12,
        required: [true, 'password must be included']
    },
    confirmPassword:{
        type: String,
        required: true
    },
    role:{
        type: String,
        enum: ['admin', 'user'],
        default: 'user',
    }
},{
    timestamps: true
})

// we hash our password here
UserSchema.pre('save', async function(){
    this.password = await bcrypt.hash(this.password, 10);
    this.confirmPassword = await bcrypt.hash(this.confirmPassword, 10);
})

// create password check 
UserSchema.methods.correctPassword = async function(inputPassword, userPassword){
    return bcrypt.compare(inputPassword, userPassword)
}

const User = mongoose.model('User', UserSchema);

module.exports = User;