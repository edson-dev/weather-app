import { describe, it, expect, vi, Mock } from 'vitest';

import fetchWeather from './service';
import axios from 'axios';
vi.mock('axios');
describe('WEATHER', () => {
    it('fetch api data invalid data', async () => {
        const mock = [{ city: 'Test City' }];
        (axios.get as Mock).mockResolvedValue({ data: mock });

        const res = await fetchWeather('test-city');

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
            forecast: { forecastday: [] }
        };
        (axios.get as Mock).mockResolvedValue({ data: mock });

        const res = await fetchWeather('test-city');

        expect(res).not.toBeNull();
    });
});