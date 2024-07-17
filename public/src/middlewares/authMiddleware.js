"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const envConfig_1 = require("../config/envConfig");
const verifyToken = (req, res, next) => {
    const token = req.header("Authorization");
    console.log(" hello", req.header("Authorization"));
    //const token = req.cookies.
    if (!token) {
        return res.status(401).json({ error: "Access denied" });
    }
    try {
        const verified = jsonwebtoken_1.default.verify(token, envConfig_1.config.jwtSecret);
        if (verified)
            next();
        else
            return res.status(401).json({ error: "Access denied" });
    }
    catch (error) {
        res.status(400).json({ error: "Invalid token" });
    }
};
exports.verifyToken = verifyToken;
