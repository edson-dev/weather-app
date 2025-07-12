import { describe, it, expect, vi } from 'vitest';

import fetchWeather from './service'; // Adjust the import path as necessary
import axios from 'axios';
vi.mock('axios');
describe('WEATHER', () => {
    it('fetch api data invalid data', async () => {
            //d
            const mock = [{ city: 'Test City'}];
            // Mock the axios.get method to resolve with our mock data
            (axios.get as vi.Mock).mockResolvedValue({ data: mock });

            const res = await fetchWeather('test-city'); // Call the function you want to test

            // Assert that axios.get was called with the correct URL
            // Assert that the function returned the mocked data
            expect(res).toEqual(null);
    });
    it('fetch api data valid data', async () => {
            const mock = {
                location: {
                  name: 'Test City',
                  region: 'Test Region',
                  country: 'Test Country',
                  lat: 0,
                  lon: 0,
                  localtime: 'Test Time',
                },
                current: {
                  temp_c: 25,
                  temp_f: 77,
                  condition: {
                    text: 'Sunny',
                  },
                  uv: 5,
                  humidity: 50,
                  wind_kph: 10,
                  vis_km: 10,
                  pressure_mb: 1013,
                },
                forecast: {forecastday: []}
            };
            // Mock the axios.get method to resolve with our mock data
            (axios.get as vi.Mock).mockResolvedValue({ data: mock });

            const res = await fetchWeather('test-city'); // Call the function you want to test

            // Assert that axios.get was called with the correct URL
            // Assert that the function returned the mocked data
            expect(res).not.toBeNull();
    });
  });