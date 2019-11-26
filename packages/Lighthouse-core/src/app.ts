import express from 'express';
import cors from 'cors';
import bodyparser from 'body-parser';

const app = express();
app.use(cors());
app.use(bodyparser.json());

export default app;
