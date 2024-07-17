import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import authRoutes from "./src/routes/authRoutes"; 
import chatRoutes from "./src/routes/chatRoutes";

const app = express();
const port = process.env.PORT || 80;

const allowedOrigins = [
  'https://ambitious-hill-0cd5d7c03.5.azurestaticapps.net',
  'http://localhost:3000',
  'https://asp-liked-redbird.ngrok-free.app',
  'healchatserver.azurewebsites.net'
];

app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true,
  allowedHeaders: ['Content-Type', 'Authorization']
}));


app.use(bodyParser.json());

app.get('/',(req,res)=>res.send('hello world!'));


app.use("/api/auth", authRoutes);
app.use("/api/chat", chatRoutes);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
  // console.log("Environment configuration:", process.env);
});
