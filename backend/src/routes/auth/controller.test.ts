import { describe, it, expect } from 'vitest';
import request from 'supertest';
import app from '../../main.js';

describe('AUTH', () => {
    it('auth should return unauthorized', async () => {
        const del = await request(app).delete('/user/test').set('Content-Type', 'application/json');
        const payload = {
            username: 'test',
            password: 'test'
        }
        const res = await request(app).post('/auth').set('Content-Type', 'application/json').send(payload);
        expect(res.statusCode).toBe(401);
    });

    it('USER should return success at first created', async () => {
        const payload = {
        username: 'test',
        password: 'test',
        email: 'test@test.com'
    }
    const res = await request(app).post('/user').set('Content-Type', 'application/json').send(payload);
    expect(res.statusCode).toBe(201);
    });

    it('USER should return fail as second created with error body about username exists', async () => {
        const payload = {
        username: 'test',
        password: 'test',
        email: 'test@test.com'
    }
    const res = await request(app).post('/user').set('Content-Type', 'application/json').send(payload);
    expect(res.statusCode).toBe(400);
    });

    it('AUTH auth should return success after user been created', async () => {
        const payload = {
            username: 'test',
            password: 'test'
        }
        const res = await request(app).post('/auth').set('Content-Type', 'application/json').send(payload);
        expect(res.statusCode).toBe(200);
        expect(res.body).toHaveProperty('token');
        expect(res.body.token).toBeDefined();
    });

    it('USER delete should return success for cleanup database for test', async () => {
        const res = await request(app).delete('/user/test').set('Content-Type', 'application/json');
        expect(res.statusCode).toBe(200);

    });
});