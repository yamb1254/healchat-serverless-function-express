import express, { Request, Response } from "express";
import bodyParser from "body-parser";
import cors from "cors";
import authRoutes from "./src/routes/authRoutes";
import chatRoutes from "./src/routes/chatRoutes";

const app = express();
const port = process.env.PORT ;

app.use(cors());
app.use(bodyParser.json());

app.get('/', (req: Request, res: Response) => res.send('Hello world!'));

app.use("/api/auth", authRoutes);
app.use("/api/chat", chatRoutes);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
