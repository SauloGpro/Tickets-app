import request from 'supertest';
import mongoose from 'mongoose';
import app from '../app';
import server from '../server.js';
import Ticket from '../models/Ticket.js';
import User from '../models/User.js';

describe('Tickets API', () => {
    let token;

    beforeAll(async () => {
        await User.deleteMany();
        const response = await request(app)
            .post("/api/users/signup")
            .send({
                name: 'Test User',
                email: 'test@mail.com',
                password: '12345678',
                role: 'user'
            });
        token = response.body.token;  // Guarda el token de autenticación
    });

    beforeEach(async () => {
        await Ticket.deleteMany();  // Limpia los tickets antes de cada prueba
    });

    afterAll(async () => {
        server.close();
        await mongoose.connection.close();
    });

    test('Create ticket', async () => {
        const response = await request(app)
            .post('/api/tickets')
            .set('Authorization', `Bearer ${token}`)
            .send({
                tittle: 'Test Ticket',
                description: 'Ticket description',
                status: 'open'
            });

        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty('ticket');
        expect(response.body.ticket).toHaveProperty('tittle', 'Test Ticket');
    });
});
