
import express from 'express';
const router = express.Router();
import authenticateJWT from '../auth/middleware';

import { cache } from '../../databases';
import fetchWeather from './service';

/**
 * @swagger
 * /weather/{city}:
 *   get:
 *     security:
 *       - bearerAuth: []
 *     summary: get weather forecast for a city
 *     parameters:
 *       - in: path
 *         name: city
 *         schema:
 *           type: string
 *         required: true
 *         description: The city to get the forecast for
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   date:
 *                     type: string
 *                     format: date
 *                   temperatureC:
 *                     type: integer
 *                   temperatureF:
 *                     type: integer
 *                   summary:
 *                     type: string
 *     tags:
 *       - Weather
 */
router.get('/:city', authenticateJWT, cache?.route({
    expire: {
        200: 60,
        xxx: 1
    }
}), async (req, res) => {
    const city = req.params.city;
    const weatherData = await fetchWeather(city);
    if (weatherData === null || weatherData === undefined) {
        res.status(404).json({ error: 'city not found' });
    } else {
        res.json(weatherData);
    }
});

router.get('/coord/:city', cache?.route({
    expire: {
        200: 60 * 60 * 24, // 1 day
        xxx: 1
    }
}), async (req, res) => {
    const city = req.params.city;
    const weatherData = await fetchWeather(city);
    if (weatherData === null || weatherData === undefined) {
        res.status(404).json({ error: 'city not found' });
    } else {
        res.json(weatherData);
    }
});


export default router;