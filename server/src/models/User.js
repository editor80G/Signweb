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
        minlength: [4, 'Password must be at least 4 characters long!']
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
    ipAddress: {
        type: String,
        required: false
    },

}, { timestamps: true });

userSchema.pre('save', async function () {
    const user = this;
    user.password = await bcrypt.hash(user.password, 10);
}); // Hash the password before saving the user, using bcrypt with 10 rounds of salting

const User = model('User', userSchema);
export default User;