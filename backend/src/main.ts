import env from './config';
import 'reflect-metadata';
const express = require('express');
import cors from 'cors';
const bodyParser = require('body-parser')
import { specs, swaggerUi } from './openapi';
import weather from './routes/weather/controller';
import auth from './routes/auth/controller';
import user from './routes/user/controller';
import health from './routes/health';

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
app.use('/health', health);
app.use('/auth', auth);
app.use('/weather', weather);
app.use('/user', user);

if (process.env.NODE_ENV !== 'test') {
    app.listen(env.PORT, () => {
        console.log(`Server running at http://${env.HOST}:${env.PORT}`);
    });
}
export default app;