import cors from 'cors';
import express, { Application } from 'express';
const app: Application = express();
import routes from './app/route';
import globalErrorHandler from './app/middlewares/globalErrorHandler';

//cors
app.use(cors());

//Parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/v1', routes);

// app.get('/', (req: Request, res: Response) => {
//   // res.send(`Book Catalog website is running successfully`);
//   throw new Error(`Ore baba error d`)
// });

app.use(globalErrorHandler);

export default app;
