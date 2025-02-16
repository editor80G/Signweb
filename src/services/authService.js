import User from '../models/user.js';
import bcrypt from 'bcrypt';
import { generateToken } from '../utils/authUtils.js';

export const register = async (userData) => {

    if (userData.password !== userData.confirmPassword) {
        throw new Error('Passwords do not match');
    } // Check if the password and confirm password match

    const existingUser = await User.findOne({ email: userData.email }).select({ _id: 1 }).lean();
    if (existingUser) {
        throw new Error('User already exists');
    } // Check if the user already exists

    return generateToken(await User.create(userData));
} // Register a new user and return a JWT token

export const login = async (userData) => {
    const user = await User.findOne({ email: userData.email }).lean();
    if (!user) {
        throw new Error('Invalid email'); // TODO: Generalize error message for security
    } // Check if the user exists

    const isPasswordValid = await bcrypt.compare(userData.password, user.password);
    if (!isPasswordValid) {
        throw new Error('Invalid password');  // TODO: Generalize error message for security
    } // Check if the password is valid

    return generateToken(user);
}

const authService = {
    register,
    login
};

export default authService; 