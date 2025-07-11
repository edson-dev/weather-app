
import express from 'express';
const router = express.Router();
import authenticateJWT  from '../auth/middleware';
import axios from 'axios';
import env from '../../config';

var cache = require('express-redis-cache')();

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
router.get('/:city',authenticateJWT,cache?.route({
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

router.get('/coord/:city',cache?.route({
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
  try{
  const apiResponse = await axios.get(
    `http://api.weatherapi.com/v1/forecast.json?key=${env.API_KEY}&q=${city}&aqi=no&days=5`
  );

    let response = {
      city: apiResponse.data.location.name,
      region: apiResponse.data.location.region,
      country: apiResponse.data.location.country,
      latitude: apiResponse.data.location.lat,
      longitude: apiResponse.data.location.lon,
      temperatureC: apiResponse.data.current.temp_c,
      temperatureF: apiResponse.data.current.temp_f,
      summary: apiResponse.data.current.condition.text,
      uvIndex: apiResponse.data.current.uv,
      humidity: apiResponse.data.current.humidity,
      windSpeed: apiResponse.data.current.wind_kph,
      visibility: apiResponse.data.current.vis_km,
      pressure: apiResponse.data.current.pressure_mb,
      time: apiResponse.data.location.localtime,
      forecast: apiResponse.data.forecast.forecastday.map(day => ({
        date: day.date,
        temperatureC: day.day.avgtemp_c,
        temperatureF: day.day.avgtemp_f,
        summary: day.day.condition.text
      }))
    }
    response.forecast.toReversed();
  //console.log("Request sent to the API",apiResponse.data);
    return await response;
  }catch(error){
    return null
  }
}
export default router;