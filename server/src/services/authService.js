import User from '../models/User.js';
import bcrypt from 'bcrypt';
import { generateToken } from '../utils/authUtils.js';
import { config } from '../config.js';
import fetch from 'node-fetch';

export const register = async (userData) => {
    if (userData.password !== userData.confirmPassword) {
        throw new Error('ERROR_REGISTER_PASSWORDS_DO_NOT_MATCH');
    }
    const existingUser = await User.findOne({ email: userData.email }).select({ _id: 1 }).lean();
    if (existingUser) {
        throw new Error('ERROR_REGISTER_USER_ALREADY_EXISTS');
    }
    return generateToken(await User.create(userData));
}

export const login = async (userData) => {
    const user = await User.findOne({ email: userData.email });
    if (!user) {
        throw new Error('ERROR_AUTH_INVALID_CREDENTIALS');
    }

    const isPasswordValid = await bcrypt.compare(userData.password, user.password);

    if (!user.isActive) {
        throw new Error('ERROR_LOGIN_USER_NOT_ACTIVE');
    }
    if (!isPasswordValid && user.loginAttempts <= 5) {
        // user.loginAttempts += 1;
        // await user.save();
        // If you are using .lean() (plain JavaScript object) but using updateOne is more efficient if you only need to update a single field.:
        await User.updateOne(
            { email: userData.email }, // Filter
            { $inc: { loginAttempts: 1 } } // Increment loginAttempts by 1
        );
        throw new Error('ERROR_AUTH_INVALID_CREDENTIALS');
    } else if (!isPasswordValid && user.loginAttempts > 5) {
        throw new Error('ERROR_LOGIN_ATTEMPTS_EXCEEDED');
    } else {
        await User.updateOne(
            { email: userData.email },
            {
                $set: {
                    loginAttempts: 0,
                    lastLogin: new Date()
                }
            }
        );
        return generateToken(user);
    }
}

const verifyCaptcha = async (captchaVerificationToken) => {
    const verifyUrl = `https://www.google.com/recaptcha/api/siteverify?secret=${config.RECAPTCHA_SECRET_KEY}&response=${captchaVerificationToken}`;
    const response = await fetch(verifyUrl, { method: "POST" });
    const data = await response.json();
    const isCaptchaValid = data.success && data.score >= 0.5;
    //const isCaptchaValid = false; // For testing purposes, always return false

    if (isCaptchaValid) {
        return true;
    } else {
        throw new Error('ERROR_AUTH_CAPTCHA_VERIFICATION_FAILED');
    }
};


const authService = {
    register,
    login,
    verifyCaptcha,
};

export default authService; 