"use client"

import { useState, useEffect } from "react"
import { Search, MapPin, Droplets, Wind, Eye, Gauge } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import axios from 'axios';

interface WeatherData {
  city: string
  country: string
  temperature: number
  condition: string
  description: string
  humidity: number
  windSpeed: number
  visibility: number
  pressure: number
  feelsLike: number
  uvIndex: number
  forecast: {
    day: string
    high: number
    low: number
    condition: string
    icon: string
  }[]
}

// Mock weather data - in a real app, this would come from an API
const mockWeatherData: { [key: string]: WeatherData } = {
  "new york": {
    city: "New York",
    country: "United States",
    temperature: 22,
    condition: "Partly Cloudy",
    description: "Partly cloudy with a chance of rain",
    humidity: 65,
    windSpeed: 12,
    visibility: 10,
    pressure: 1013,
    feelsLike: 25,
    uvIndex: 6,
    forecast: [
      { day: "Today", high: 24, low: 18, condition: "Partly Cloudy", icon: "⛅" },
      { day: "Tomorrow", high: 26, low: 20, condition: "Sunny", icon: "☀️" },
      { day: "Wednesday", high: 23, low: 17, condition: "Rainy", icon: "🌧️" },
      { day: "Thursday", high: 25, low: 19, condition: "Cloudy", icon: "☁️" },
      { day: "Friday", high: 27, low: 21, condition: "Sunny", icon: "☀️" },
    ],
  },
}

async function fetchWeather(city) {
  const apiResponse = await axios.get(
    `http://localhost:3000/weather/${city}`,
    ).then(response => {
      console.log(response.data);
      if (response.status !== 200) {
        return null;
      }
      return response.data;
  }).catch(error => {
      console.log(error);
      return null;
  });
  mockWeatherData[city] = apiResponse;
  console.log(mockWeatherData);
  return await apiResponse
}

export default function WeatherApp() {
  const [searchQuery, setSearchQuery] = useState("")
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  // Load default weather data on component mount
  useEffect(() => {
    handleSearch("new york")
  }, [])

  const handleSearch = async (query?: string) => {
    const searchTerm = (query || searchQuery).toLowerCase().trim()
    fetchWeather(searchTerm)
    if (!searchTerm) {
      setError("Please enter a city name")
      return
    }

    setLoading(true)
    setError("")

    const data = mockWeatherData[searchTerm]
    if (data) {
      setWeatherData(data)
    } else {
      setError("City not found. Try 'New York', 'London', or 'Tokyo'")
      setWeatherData(null)
    }

    setLoading(false)
  }

  const getWeatherIcon = (condition: string) => {
    switch (condition.toLowerCase()) {
      case "sunny":
        return "☀️"
      case "partly cloudy":
        return "⛅"
      case "cloudy":
        return "☁️"
      case "rainy":
        return "🌧️"
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
            <div className="flex gap-2">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  type="text"
                  placeholder="Search for a city..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && handleSearch()}
                  className="pl-10 bg-white/20 border-white/30 text-white placeholder:text-gray-300"
                />
              </div>
              <Button
                onClick={() => handleSearch()}
                disabled={loading}
                className="bg-white/20 hover:bg-white/30 text-white border-white/30"
              >
                {loading ? "Searching..." : "Search"}
              </Button>
            </div>
            {error && <p className="text-red-200 mt-2 text-sm">{error}</p>}
          </CardContent>
        </Card>

        {weatherData && (
          <>
            {/* Current Weather */}
            <Card className="bg-white/10 backdrop-blur-md border-white/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-white">
                  <MapPin className="h-5 w-5" />
                  {weatherData.city}, {weatherData.country}
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="text-center md:text-left">
                    <div className="flex items-center justify-center md:justify-start gap-4 mb-4">
                      <span className="text-6xl">{getWeatherIcon(weatherData.condition)}</span>
                      <div>
                        <div className="text-5xl font-bold text-white">{weatherData.temperature}°C</div>
                        <div className="text-blue-100">Feels like {weatherData.feelsLike}°C</div>
                      </div>
                    </div>
                    <div className="text-white">
                      <div className="text-xl font-semibold">{weatherData.condition}</div>
                      <div className="text-blue-100">{weatherData.description}</div>
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

            {/* 5-Day Forecast */}
            <Card className="bg-white/10 backdrop-blur-md border-white/20">
              <CardHeader>
                <CardTitle className="text-white">5-Day Forecast</CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
                  {weatherData.forecast.map((day, index) => (
                    <div key={index} className="bg-white/10 rounded-lg p-4 text-center">
                      <div className="text-blue-100 text-sm font-medium mb-2">{day.day}</div>
                      <div className="text-3xl mb-2">{day.icon}</div>
                      <div className="text-white text-sm mb-1">{day.condition}</div>
                      <div className="flex justify-between text-white text-sm">
                        <span className="font-semibold">{day.high}°</span>
                        <span className="text-blue-200">{day.low}°</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </>
        )}
      </div>
    </div>
  )
}
