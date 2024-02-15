import cors from 'cors';
import express, { Application, Request, Response } from 'express';
const app: Application = express();
import routes from './app/route';

//cors
app.use(cors());

//Parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/v1', routes);

app.get('/', (req: Request, res: Response) => {
  res.send(`Book Catalog website is running successfully`);
});

export default app;
