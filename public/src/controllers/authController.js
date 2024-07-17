"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserInfo = exports.resetPassword = exports.validateUser = exports.login = exports.signup = void 0;
const userModel_1 = __importDefault(require("../models/userModel"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const envConfig_1 = require("../config/envConfig");
// Function to handle user signup
const signup = async (req, res) => {
    const { email, password, username } = req.body;
    try {
        const hashedPassword = await bcrypt_1.default.hash(password, 10);
        const user = await userModel_1.default.create({
            email,
            password: hashedPassword,
            username,
            role: "user",
        });
        res.status(201).json({ message: "User created successfully", user });
    }
    catch (error) {
        res.status(500).json({ message: "Internal server error", error });
    }
};
exports.signup = signup;
// Function to handle user login
const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await userModel_1.default.findOne({ where: { email } });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        const isPasswordValid = await bcrypt_1.default.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: "Invalid password" });
        }
        const token = jsonwebtoken_1.default.sign({ userId: user.id }, envConfig_1.config.jwtSecret, {
            expiresIn: "1h",
        });
        res
            .status(200)
            .json({ message: "Login successful", token, username: user.username });
    }
    catch (error) {
        res.status(500).json({ message: "Internal server error", error });
    }
};
exports.login = login;
// Function to validate username and email for password reset
const validateUser = async (req, res) => {
    const { username, email } = req.body;
    try {
        const user = await userModel_1.default.findOne({ where: { username, email } });
        if (!user) {
            return res.status(404).json({ message: "Invalid username or email" });
        }
        const token = jsonwebtoken_1.default.sign({ userId: user.id }, envConfig_1.config.jwtSecret, {
            expiresIn: "10m",
        });
        res.status(200).json({ message: "Validation successful", token });
    }
    catch (error) {
        res.status(500).json({ message: "Internal server error", error });
    }
};
exports.validateUser = validateUser;
// Function to handle reset password
const resetPassword = async (req, res) => {
    const { token, newPassword } = req.body;
    try {
        const decoded = jsonwebtoken_1.default.verify(token, envConfig_1.config.jwtSecret);
        const hashedPassword = await bcrypt_1.default.hash(newPassword, 10);
        const user = await userModel_1.default.findByPk(decoded.userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        user.password = hashedPassword;
        await user.save();
        res.status(200).json({ message: "Password reset successful" });
    }
    catch (error) {
        res.status(500).json({ message: "Invalid or expired token" });
    }
};
exports.resetPassword = resetPassword;
// Add this function to get user information
const getUserInfo = async (req, res) => {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
        return res.status(401).json({ message: "No token provided" });
    }
    try {
        const decoded = jsonwebtoken_1.default.verify(token, envConfig_1.config.jwtSecret);
        const user = await userModel_1.default.findByPk(decoded.userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json({ username: user.username, email: user.email });
    }
    catch (error) {
        res.status(500).json({ message: "Internal server error", error });
    }
};
exports.getUserInfo = getUserInfo;
