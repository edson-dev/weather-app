import { describe, it, expect, vi } from 'vitest';
import request from 'supertest';
import app from '../../main';

describe('WEATHER', () => {
    it('auth should return unauthorized', async () => {
        const res = await request(app).get('/weather/tiradentes');
        expect(res.statusCode).toBe(401);
    });

    it('weather should return 403', async () => {
        let token = '...';
        const res = await request(app).get('/weather/tiradentes').set('Authorization', `Bearer ${token}`);;
        expect(res.statusCode).toBe(403);
    });

    it('weather should return 403', async () => {
        let token = '...';
        const res = await request(app).get('/weather/tiradentes').set('Authorization', `${token}`);;
        expect(res.statusCode).toBe(403);
    });

    it('weather should return result', async () => {
        let token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InRlc3QiLCJpYXQiOjE3NTIxOTIzMTEsImV4cCI6MjA2NzU1MjMxMX0.T6zNtxeWcGsiYC9Kz5C3-rGJTsS-z0ovpDdEbv7Ubds';
        const res = await request(app).get('/weather/tiradentes').set('Authorization', `Bearer ${token}`);
        expect(res.statusCode).toBe(200);
    });
});