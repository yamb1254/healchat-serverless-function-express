import express from "express";

const app = express();
const port = process.env.PORT ? parseInt(process.env.PORT, 10) : 80;

app.get('/', (req, res) => res.send('Hello world!'));

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
