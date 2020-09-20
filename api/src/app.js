import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import morgan from 'morgan';
import helmet from 'helmet';
import hpp from 'hpp';

import productsRoute from './routes/product-router';

import handleNotFoundError from './middlewares/handle-not-found';
import handleError from './middlewares/handle-error';


const app = express();

// Enable helmet, prevent some atack's
app.use(helmet());

// Enable proxy and redirect from cloud proxie's
app.enable('trust proxy', true);
app.use(cors({ origin: process.env.CORS_ORIGINS }));
app.options(cors());

// Prevent parameter attack!
app.use(hpp({
  whitelist: [
    'size',
    'limit'
  ]
}))

// Logger from terminal develloper
if (process.env.NODE_ENV === 'dev') {
  app.use(morgan('dev'));
}

// Body Parser middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({ limit: '50mb'}));

// Routes
app.use('/api/v1/products', productsRoute);

// Set middleware from 404 not found
app.all('*', handleNotFoundError)

// Set handleError middleware
app.use(handleError);


export default app;