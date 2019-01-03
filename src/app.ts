import * as express from 'express';
import cors from 'cors';
import routes from './routes';

const app = express.default();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors({ origin: true }));
app.use('/', routes);

export default app;