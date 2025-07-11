import 'reflect-metadata';
const express = require('express');
import e from 'express';
import cors from 'cors';

const bodyParser = require('body-parser')

import env  from './config';


import { specs, swaggerUi } from './openapi';

import weather from './routes/weather/controller';
import auth from './routes/auth/controller';


const app = express();

app.use(cors())

app.use(express.json());
app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)

// openapi docs using jsdoc notation
app.use('/docs', swaggerUi.serve, swaggerUi.setup(specs));

//routes
app.use('/', auth);
app.use('/weather', weather);

if (process.env.NODE_ENV !== 'test') {
  app.listen( env.PORT, () => {
    console.log(`Server running at http://${env.HOST}:${env.PORT}`);
  });
}
export default app;