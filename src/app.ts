import cors from 'cors';
import express, { Application, Request, Response } from 'express';
const app: Application = express();

//cors
app.use(cors());

//Parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req: Request, res: Response) => {
  res.send(`Book Catalog website is running successfully`);
});

export default app;
