import express from 'express';
import {json} from 'body-parser';
import {FileDownloadRoute} from './routes/FileDownloadRoute';
import { errorHandler } from './middlewares/ErrorHandler';
const app = express();
const port = 3000;

app.set('trust proxy', true);
app.use(json());
app.use(FileDownloadRoute);

app.use(errorHandler);

app.get('/', (req, res) => {
  res.send('OK');
});
app.listen(port, () => {
  console.log(`server is listening on ${port}`);
});