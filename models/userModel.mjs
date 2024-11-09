import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    address1: {
        type: String,
        required: false,
        default: null
    },
    address2: {
        type: String,
        required: false,
        default: null
    },
    postcode: {
        type: String,
        required: false,
        default: null
    },
    phone: {
        type: String
    },
    role: {
        type: String,
        default: 'user',
        required: true
    },
    created_at: {
        type: Date,
        default: Date.now
    }
});

userSchema.methods.generateAuthToken = function() {
    const user = this;
    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);
    return token;
};

const User = mongoose.model('User', userSchema);

export default User;
