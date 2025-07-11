import { describe, it, expect } from 'vitest';
import request from 'supertest';
import app from './main'; // Adjust the import path as necessary

describe('Routes', () => {
    it('ROOT / should return not found', async () => {
        const res = await request(app).get('/');
        expect(res.statusCode).toBe(404);
    });
});