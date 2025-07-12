"use client"

// TODO : break this file into smaller components
// TODO : add tests
import { useState, useEffect } from "react"
import { Search, MapPin, Droplets, Wind, Eye, Gauge } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import axios from 'axios';

import env from "../app/config"

interface WeatherData {
  city: string
  region: string
  country: string
  latitude: number
  longitude: number
  temperatureC: number
  temperatureF: number
  condition: string
  summary: string
  humidity: number
  windSpeed: number
  visibility: number
  pressure: number
  uvIndex: number
  forecast: {
    date: string
    summary: string
    temperatureC: number
    temperatureF: number
  }[]
}


export default function WeatherApp() {
  const [searchQuery, setSearchQuery] = useState("")
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [history, setHistory] = useState<WeatherData[]>([])
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [token, setToken] = useState(null)

    useEffect(() => {
        navigator.geolocation?.getCurrentPosition((position) => {
          const {latitude, longitude} = position.coords;
          console.log(`Latitude: ${latitude}, Longitude: ${longitude}`);
          handleSearch(`${latitude},${longitude}`, "/coord");
        });
    }, []); // Empty dependency array means this effect runs once on component mount


const handleSearch = async (query?: string, endpoint: string= "") => {
            try {
                if (query) {
                  setSearchQuery(query.toLowerCase().trim() || searchQuery);
                }
                setLoading(true);
                const response = await axios.get(`http://${env.API_URL}/weather${endpoint}/${query}`, { headers: { Authorization: `Bearer ${token}` } });
                if (!response.data) {
                    setError("No weather data found for this city");
                    setWeatherData(null);
                    return;
                }else {
                  setWeatherData(response.data);
                  if (history?.length >= 5) {
                    history.shift(); // Remove the oldest entry if we have 5 already
                  }
                  history.push(response.data)
                  if (username && token) {
                    axios.post(`http://${env.API_URL}/user/${username}`, history,
                      { headers: { Authorization: `Bearer ${token}` } });
                  }
                  setError("");
                }
            } catch (error) {
                console.error("Error fetching weather data:", error);
                setWeatherData(null);
                setError("An error occurred while fetching weather data");
            } finally {
                setLoading(false); // Set loading to false after the request completes (success or error)
            }
        };

const handleAutentication = async () => {
    try {
        const response = await axios.post(`http://${env.API_URL}/auth`, { username: username, password: password });
        if (response.data) {
            setToken(response.data.token);
            setHistory(response.data.history || []);
            setError("");
        }else {
          setToken(null);
          setError("Invalid credentials");
        }
    } catch (error) {
        console.error("Error fetching weather data:", error);
        setToken(null);
        setError("Invalid credentials");
    }
};

const getWeatherIcon = (condition: string) => {
  const condit = condition.toLowerCase();
  switch (true) {
    case condit.includes("sunny"):
        return "☀️"
    case condit.includes("cloudy"):
        return "⛅"
    case condit.includes("rainy"):
        return "🌧️"
    case condit.includes("partly"):
        return "⛅"
    default:
        return "🌤️"
  }
}
const getUVIndexColor = (uvIndex: number) => {
  if (uvIndex <= 2) return "bg-green-500"
  if (uvIndex <= 5) return "bg-yellow-500"
  if (uvIndex <= 7) return "bg-orange-500"
  return "bg-red-500"
}

return (
  <div className="min-h-screen bg-gradient-to-br from-blue-400 via-blue-500 to-blue-600 p-4">

    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="text-center text-white mb-8">
        <h1 className="text-4xl font-bold mb-2">Weather App</h1>
        <p className="text-blue-100">Get current weather and forecasts for any city</p>
      </div>

      {/* Search */}
      <Card className="bg-white/10 backdrop-blur-md border-white/20">
        <CardContent className="p-6">
          {token && (
          <div className="flex gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                type="text"
                placeholder="Search for a city..."
                value={searchQuery}
                role="search"
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleSearch(searchQuery)}
                className="pl-10 bg-white/20 border-white/30 text-white placeholder:text-gray-300"
              />
            </div>
            <Button
              onClick={() => handleSearch(searchQuery)}
              disabled={loading}
              className="bg-white/20 hover:bg-white/30 text-white border-white/30"
            >
              {loading ? "Searching..." : "Search"}
            </Button>
          </div>
          )}
            {!token && (<div>
          <Input
            type="text"
            placeholder="username"
            onChange={(e) => setUsername(e.target.value)}
            value={username}
            role="username"
            className="pl-10 bg-white/20 border-white/30 text-white placeholder:text-gray-300"
            />

          <br />

          <Input
          type="text"
          placeholder="password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          role="password"
          className="pl-10 bg-white/20 border-white/30 text-white placeholder:text-gray-300"
          />

          <br />
          <Button
              className="bg-white/20 hover:bg-white/30 text-white border-white/30"
              name="login"
              onClick={() => handleAutentication()}
            >Login</Button>
        </div>)}
          {error && <p className="text-red-200 mt-2 text-sm">{error}</p>}
        </CardContent>
      </Card>

      {weatherData && (
        <div>
          {/* Current Weather */}
          <Card className="bg-white/10 backdrop-blur-md border-white/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-white">
                <MapPin className="h-5 w-5" />
                {weatherData.latitude}, {weatherData.longitude}
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="text-center md:text-left">
                  <div className="flex items-center justify-center md:justify-start gap-4 mb-4">
                    <span className="text-6xl">{getWeatherIcon(weatherData.summary)}</span>
                    <div>
                      <div className="text-5xl font-bold text-white">{weatherData.city}</div>
                      <div className="text-blue-100">Feels like {weatherData.temperatureC}°C</div>
                    </div>
                  </div>
                  <div className="text-white">
                    <div className="text-xl font-semibold">{weatherData.region}</div>
                    <div className="text-blue-100">{weatherData.country}</div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white/10 rounded-lg p-3">
                    <div className="flex items-center gap-2 text-blue-100 mb-1">
                      <Droplets className="h-4 w-4" />
                      <span className="text-sm">Humidity</span>
                    </div>
                    <div className="text-white font-semibold">{weatherData.humidity}%</div>
                  </div>
                  <div className="bg-white/10 rounded-lg p-3">
                    <div className="flex items-center gap-2 text-blue-100 mb-1">
                      <Wind className="h-4 w-4" />
                      <span className="text-sm">Wind</span>
                    </div>
                    <div className="text-white font-semibold">{weatherData.windSpeed} km/h</div>
                  </div>
                  <div className="bg-white/10 rounded-lg p-3">
                    <div className="flex items-center gap-2 text-blue-100 mb-1">
                      <Eye className="h-4 w-4" />
                      <span className="text-sm">Visibility</span>
                    </div>
                    <div className="text-white font-semibold">{weatherData.visibility} km</div>
                  </div>
                  <div className="bg-white/10 rounded-lg p-3">
                    <div className="flex items-center gap-2 text-blue-100 mb-1">
                      <Gauge className="h-4 w-4" />
                      <span className="text-sm">Pressure</span>
                    </div>
                    <div className="text-white font-semibold">{weatherData.pressure} hPa</div>
                  </div>
                </div>
              </div>

              <div className="mt-6 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-blue-100 text-sm">UV Index:</span>
                  <Badge className={`${getUVIndexColor(weatherData.uvIndex)} text-white`}>
                    {weatherData.uvIndex}
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          <br />
          {/* 5-Day Forecast */}
          <Card className="bg-white/10 backdrop-blur-md border-white/20">
            <CardHeader>
              <CardTitle className="text-white">5-Day Forecast</CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
                {weatherData.forecast.map((day, index) => (
                  <div key={index} className="bg-white/10 rounded-lg p-4 text-center">
                    <div className="text-blue-100 text-sm font-medium mb-2">{day.date}</div>
                    {/* <div className="text-3xl mb-2">{day.icon}</div> */}
                    <div className="text-white text-sm mb-1">{getWeatherIcon(day.summary)}</div>
                    <div className="flex justify-between text-white text-sm">
                      <span className="font-semibold">{day.temperatureC}° C</span>
                      <span className="text-blue-200">{day.temperatureF}° F</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
          <br />
          {/* Historical Search */}
          { history.length > 0 && (
          <Card className="bg-white/10 backdrop-blur-md border-white/20">
            <CardHeader>
              <CardTitle className="text-white">Historic Search</CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4">
                {history.map((record, index) => (
                  <div key={index} className="bg-white/10 rounded-lg p-4 text-center">
                    <div className="text-blue-100 text-sm font-medium mb-2">{record.city}</div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
          )}
        </div>
      )}
    </div>
  </div>
)
}
