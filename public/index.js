"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const authRoutes_1 = __importDefault(require("./src/routes/authRoutes"));
const chatRoutes_1 = __importDefault(require("./src/routes/chatRoutes"));
const app = (0, express_1.default)();
const port = process.env.PORT ? parseInt(process.env.PORT, 10) : 5000;
app.use((0, cors_1.default)());
app.use(body_parser_1.default.json());
app.get('/', (req, res) => res.send('Hello world!'));
app.use("/api/auth", authRoutes_1.default);
app.use("/api/chat", chatRoutes_1.default);
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
