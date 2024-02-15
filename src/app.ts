import express from "express";
const app = express();
const port = 3000;

app.get("/", (req, res) => {
  res.send(`Book Catalog website is running successfully`);
});

export default app;
