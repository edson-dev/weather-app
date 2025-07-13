import axios from 'axios';
import env from '../../config';

async function fetchWeather(city: string) {
    try {
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
    } catch (error) {
        return null
    }
}

export default fetchWeather;