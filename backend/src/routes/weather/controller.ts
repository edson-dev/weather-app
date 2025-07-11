
import express from 'express';
const router = express.Router();
import authenticateToken  from '../auth/middleware';
const axios = require("axios");
const redis = require("redis");
import env from '../../config';
let cache;

(async () => {
  cache = redis.createClient();

  cache.on("error", (error) => console.error(`Error : ${error}`));

  await cache.connect();
})();

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
router.get('/:city', authenticateToken, async (req, res) => {
    const city = req.params.city;

    const cachedData = await cache.get(city);
    if (cachedData) {
    // If data exists in the cache, return it
      console.log(`Cache HIT: ${city}`);
      res.send(JSON.parse(cachedData));
      return;
    }else{
      // If data does not exist in the cache, proceed to fetch it
      console.log(`Cache MISS: ${city}`);
      const weatherData = await fetchWeather(city);
      res.json(weatherData);
      cache.set(city, JSON.stringify(weatherData), 'EX', 60); // Cache for 1 hour
    }
});

async function fetchWeather(city) {
  const apiResponse = await axios.get(
    `http://api.weatherapi.com/v1/current.json?key=${env.API_KEY}&q=${city}&aqi=no`
  );
  console.log("Request sent to the API");
  return await apiResponse.data;
}
export default router;