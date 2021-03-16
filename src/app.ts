import express from 'express';
import {json} from 'body-parser';
import {FileDownloadRoute} from './routes/company';
import { errorHandler } from './middlewares/ErrorHandler';
import dotenv from 'dotenv';
import * as mongodb from './database/config/db';

dotenv.config();
const app = express();
const port = process.env.PORT || 8080;

app.set('trust proxy', true);
app.use(json());
app.use(FileDownloadRoute);

app.use(errorHandler);

app.get('/', (req, res) => {
  res.send('OK');
});
mongodb.connectDB();
app.listen(port, () => {
  console.log(`server is listening on ${port}`);
});