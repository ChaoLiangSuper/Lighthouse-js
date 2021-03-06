import express from 'express';
import cors from 'cors';
import bodyparser from 'body-parser';
import cookieParser from 'cookie-parser';
import routes from './routes';
import gqlServer from './graphql';

const app = express();

app.use(cors());
app.use(bodyparser.json());
app.use(cookieParser());
app.use('/', routes);

gqlServer.applyMiddleware({ app, path: '/graphql' });

export default app;
