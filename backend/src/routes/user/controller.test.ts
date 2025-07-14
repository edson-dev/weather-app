import { describe, it, expect } from 'vitest';
import request from 'supertest';
import app from '../../main.js';

let token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InRlc3QiLCJpYXQiOjE3NTIxOTIzMTEsImV4cCI6MjA2NzU1MjMxMX0.T6zNtxeWcGsiYC9Kz5C3-rGJTsS-z0ovpDdEbv7Ubds';


describe('USER', () => {

    it('USER should return success at first created', async () => {
        const payload = {
            username: 'test2',
            password: 'test2',
            email: 'test@test.com'
        }
        const del = await request(app).delete('/user/test2')
            .set('Authorization', `Bearer ${token}`);
        const res = await request(app).post('/user')
            .set('Content-Type', 'application/json').send(payload);
        expect(res.statusCode).toBe(201);
    });

    it('USER should return fail as second created with error body about username exists', async () => {
        const payload = {
            username: 'test2',
            password: 'test2',
            email: 'test@test.com'
        }
        const res = await request(app).post('/user').set('Content-Type', 'application/json').send(payload);
        expect(res.statusCode).toBe(400);
    });

    it('USER update should return success', async () => {
        const payload = {
            username: 'test2',
            password: 'test2'
        }
        const res = await request(app).put('/user/test2')
            .set('Authorization', `Bearer ${token}`)
            .send(payload);
        expect(res.statusCode).toBe(200);
    });

    it('USER delete should return success for cleanup database for test', async () => {
        const res = await request(app).delete('/user/test2').set('Authorization', `Bearer ${token}`);
        expect(res.statusCode).toBe(200);

    });
});