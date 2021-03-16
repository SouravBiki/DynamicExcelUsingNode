import express from 'express';
import { json } from 'body-parser';
import { CompanyRoute } from './routes/company';
import { errorHandler } from './middlewares/ErrorHandler';
import helmet from "helmet";
import cors from 'cors';
import dotenv from 'dotenv';
import * as mongodb from './database/config/db';


dotenv.config();
const port = process.env.PORT || 8080;
const allowedOrigin = process.env.ALLOWED_ORIGIN;
const app = express();
//app.use(cors);

const options: cors.CorsOptions = {
  allowedHeaders: [
    'Origin',
    'X-Requested-With',
    'Content-Type',
    'Accept',
    'X-Access-Token',
  ],
  credentials: true,
  methods: 'GET,HEAD,OPTIONS,PUT,PATCH,POST,DELETE',
  origin: allowedOrigin,
  preflightContinue: false,
};

app.use(helmet());
app.use(cors(options));
app.use(json());
app.set('trust proxy', true);
app.use(CompanyRoute);

app.use(errorHandler);

app.get('/', (req, res) => {
  res.send('OK');
});
mongodb.connectDB();
app.listen(port, () => {
  console.log(`server is listening on ${port}`);
});