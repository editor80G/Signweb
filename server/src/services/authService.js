import User from '../models/User.js';
import bcrypt from 'bcrypt';
import { generateToken } from '../utils/authUtils.js';

export const register = async (userData) => {
    if (userData.password !== userData.confirmPassword) {
        throw new Error('Passwords do not match');
    }

    const existingUser = await User.findOne({ email: userData.email }).select({ _id: 1 }).lean();
    if (existingUser) {
        throw new Error('User already exists');
    }

    return generateToken(await User.create(userData));

}
export const login = async (userData) => {
    const user = await User.findOne({ email: userData.email }).lean();
    if (!user) {
        throw new Error('Email or password does not match our records');
    }

    const isPasswordValid = await bcrypt.compare(userData.password, user.password);
    if (!isPasswordValid) {
        throw new Error('Email or password does not match our records');
    }

    return generateToken(user);
}

const authService = {
    register,
    login
};

export default authService; 