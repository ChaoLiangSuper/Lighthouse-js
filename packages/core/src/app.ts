import express from 'express';
import cors from 'cors';
import bodyparser from 'body-parser';
import routes from './routes';

const app = express();
app.use(cors());
app.use(bodyparser.json());
app.use('/', routes);

export default app;
