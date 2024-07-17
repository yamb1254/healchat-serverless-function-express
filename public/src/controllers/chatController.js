"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMessages = exports.sendMessage = exports.uploadMiddleware = void 0;
const axios_1 = __importDefault(require("axios"));
const multer_1 = __importDefault(require("multer"));
const chatModel_1 = __importDefault(require("../models/chatModel"));
const userModel_1 = __importDefault(require("../models/userModel"));
const storage = multer_1.default.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/");
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    },
});
const upload = (0, multer_1.default)({ storage });
exports.uploadMiddleware = upload.single("image");
const sendMessage = async (req, res) => {
    const { username, content } = req.body;
    const user = await userModel_1.default.findOne({ where: { username } });
    const userId = user?.id;
    if (!userId) {
        return res.status(400).json({ error: "User ID is required" });
    }
    try {
        const newMessage = await chatModel_1.default.create({
            userId,
            content,
            timestamp: new Date(),
        });
        // Call the Python model server
        const response = await axios_1.default.post('https://093b-104-154-83-69.ngrok-free.app/generate', { text: content });
        const modelResponse = response.data.response;
        res.status(201).json({ newMessage, modelResponse });
    }
    catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
};
exports.sendMessage = sendMessage;
const getMessages = async (req, res) => {
    try {
        const messages = await chatModel_1.default.findAll({
            include: [{ model: userModel_1.default, attributes: ["username"] }],
        });
        res.status(200).json(messages);
    }
    catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
};
exports.getMessages = getMessages;
