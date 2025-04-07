import { Schema, model } from "mongoose";
import bcrypt from 'bcrypt';

const userSchema = new Schema({
    email: {
        type: String,
        required: [true, 'Email is required!'],
        minlength: [10, 'Email must be at least 10 characters long!']
    },
    phoneNumber: {
        type: String,
        required: false
    },
    password: {
        type: String,
        required: [true, 'Password is required!'],
        minlength: [8, 'Password must be at least 8 characters long!']
    },
    businessType: {
        type: String,
        required: [true, 'Business Type is required!'],
    },
    jobTitle: {
        type: String,
        required: [true, 'Job Title is required!'],
    },
    country: {
        type: String,
        required: [true, 'Country is required!'],
    },
    isActive: {
        type: Boolean,
        default: false
    },
    userRole: {
        type: [String],
        enum: ['admin', 'user', 'publisher'],
        default: 'user'
    },
    loginAttempts: {
        type: Number,
        default: 0
    },
    ipAddress: {
        type: String,
        required: false
    },
    lastLogin: {
        type: Date,
        required: false
    },

}, { timestamps: true });

userSchema.pre('save', async function () {
    const user = this;
    const saltRounds = 11; // Number of rounds for salting recommended to be between 10-12
    user.password = await bcrypt.hash(user.password, saltRounds);
}); // Hash the password before saving the user, using bcrypt with 10 rounds of salting

const User = model('User', userSchema);
export default User;