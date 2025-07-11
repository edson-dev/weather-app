
import express from 'express';
const router = express.Router();
import authenticateJWT  from '../auth/middleware';
const axios = require("axios");
import env from '../../config';

var cache = require('express-redis-cache')();

/**
 * @swagger
 * /weather/{city}:
 *   get:
 *     security:
 *       - bearerAuth: []
 *     summary: Get weather forecast for a city
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
router.get('/:city',authenticateJWT, cache?.route({
    expire: {
      200: 60,
      xxx: 1
    }
  }), async (req, res) => {
      const city = req.params.city;
      const weatherData = await fetchWeather(city);
      if (weatherData === null || weatherData === undefined) {
         res.status(404).json({ error: 'city not found' });
      }else{
        res.json(weatherData);
      }
});

async function fetchWeather(city) {
  const apiResponse = await axios.get(
    `http://api.weatherapi.com/v1/current.json?key=${env.API_KEY}&q=${city}&aqi=no`
    ).then(response => {
      //console.log(response.data);
      if (response.status !== 200) {
        return null;
      }
      return response.data;
  }).catch(error => {
      //console.log(error);
      return null;
  });
return await apiResponse
}
export default router;