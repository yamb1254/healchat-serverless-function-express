"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
console.log("Loaded environment variables:", process.env);
console.log("DATABASE_URL:", process.env.DATABASE_URL);
exports.config = {
    port: process.env.PORT || 5000,
    databaseUrl: process.env.DATABASE_URL,
    jwtSecret: process.env.JWT_SECRET || "your_secret_key",
    emailUser: process.env.EMAIL_USER,
    emailPass: process.env.EMAIL_PASS,
    resetTokenSecret: process.env.RESET_TOKEN_SECRET || "your_reset_token_secret",
};
