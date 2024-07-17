// app.ts
import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import authRoutes from "./src/routes/authRoutes"; 
import chatRoutes from "./src/routes/chatRoutes";

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.get('/', (req, res) => res.send('Hello world!'));

app.use("/api/auth", authRoutes);
app.use("/api/chat", chatRoutes);

export default app;
