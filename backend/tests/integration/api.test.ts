import { beforeAll, afterAll, describe, expect, it } from 'vitest';
import request from 'supertest';
import app from '../../src/app';
import sequelize from '../../src/db/db';

const SEED_CREDENTIALS = { username: 'thauser', password: 'thauser' };

describe('API Integration', () => {
    beforeAll(async () => {
        await sequelize.authenticate();
    });

    afterAll(async () => {
        await sequelize.close();
    });

    it('GET /users returns the seeded users', async () => {
        const res = await request(app).get('/users');
        expect(res.status).toBe(200);
        expect(Array.isArray(res.body)).toBe(true);
        expect(res.body.length).toBeGreaterThanOrEqual(3);
        expect(res.body[0]).not.toHaveProperty('password');
    });

    it('GET /users/thauser resolves by username', async () => {
        const res = await request(app).get('/users/thauser');
        expect(res.status).toBe(200);
        expect(res.body.username).toBe('thauser');
    });

    it('GET /users/:uuid resolves by UUID', async () => {
        const res = await request(app).get('/users/thauser');
        const uuid = res.body.id;

        const byId = await request(app).get(`/users/${uuid}`);
        expect(byId.status).toBe(200);
        expect(byId.body.id).toBe(uuid);
    });

    it('GET /users/nonexistent returns 404', async () => {
        const res = await request(app).get('/users/doesnotexist');
        expect(res.status).toBe(404);
    });

    it('GET /users/thauser/projects returns projects', async () => {
        const res = await request(app).get('/users/thauser/projects');
        expect(res.status).toBe(200);
        expect(Array.isArray(res.body)).toBe(true);
        expect(res.body.length).toBeGreaterThanOrEqual(1);
    });

    it('GET /categories returns categories', async () => {
        const res = await request(app).get('/categories');
        expect(res.status).toBe(200);
        expect(res.body).toEqual(
            expect.arrayContaining([
                expect.objectContaining({ name: 'Studienarbeit' }),
            ])
        );
    });

    it('GET /projects returns projects', async () => {
        const res = await request(app).get('/projects');
        expect(res.status).toBe(200);
        expect(Array.isArray(res.body)).toBe(true);
    });

    it('GET /projects/elements returns the project by name', async () => {
        const res = await request(app).get('/projects/elements');
        expect(res.status).toBe(200);
        expect(res.body.name).toBe('elements');
        expect(res.body.category).toHaveProperty('name');
    });

    it('POST /auth/login succeeds with valid credentials', async () => {
        const res = await request(app)
            .post('/auth/login')
            .send(SEED_CREDENTIALS);
        expect(res.status).toBe(200);
        expect(res.body.username).toBe('thauser');
        expect(res.body).not.toHaveProperty('password');
    });

    it('POST /auth/login succeeds with email', async () => {
        const res = await request(app)
            .post('/auth/login')
            .send({
                username: 'teresa.hauser@hs-augsburg.de',
                password: 'thauser',
            });
        expect(res.status).toBe(200);
    });

    it('POST /auth/login fails with wrong password (401)', async () => {
        const res = await request(app)
            .post('/auth/login')
            .send({ username: 'thauser', password: 'wrong' });
        expect(res.status).toBe(401);
    });

    it('POST /auth/login fails without credentials (400)', async () => {
        const res = await request(app).post('/auth/login').send({});
        expect(res.status).toBe(400);
    });

    it('POST /auth/logout succeeds', async () => {
        const res = await request(app).post('/auth/logout');
        expect(res.status).toBe(200);
    });

    it('POST /users/create creates a user and stores a hashed password', async () => {
        const res = await request(app).post('/users/create').send({
            userData: {
                lastname: 'Test',
                username: 'integrationuser',
                email: 'integration@test.de',
                password: 'geheim123',
                firstname: 'Integration',
            },
        });
        expect(res.status).toBe(201);

        const login = await request(app)
            .post('/auth/login')
            .send({ username: 'integrationuser', password: 'geheim123' });
        expect(login.status).toBe(200);
    });

    it('POST /users/create rejects invalid data (400)', async () => {
        const res = await request(app).post('/users/create').send({
            userData: { username: 'x', password: 'y' },
        });
        expect(res.status).toBe(400);
    });

    it('POST /projects/create creates a project from form data', async () => {
        const login = await request(app)
            .post('/auth/login')
            .send(SEED_CREDENTIALS);
        const creatorId = login.body.id;

        const res = await request(app)
            .post('/projects/create')
            .field(
                'projectData',
                JSON.stringify({
                    creatorId,
                    title: 'Integration Project',
                    art: 'Web',
                    tools: 'Vue',
                    descr: 'Created by tests',
                    category: 1,
                    collabs: 'Team',
                })
            )
            .attach('pics', Buffer.from('fake image content'), 'teaser.jpg');

        expect(res.status).toBe(201);
        expect(res.body.name).toBe('Integration Project');
        expect(res.body.description).toBe('Created by tests');
        expect(res.body.teaserImage).toMatch(/^\/public\/projects\//);
    });

    it('POST /projects/create rejects missing title (400)', async () => {
        const res = await request(app)
            .post('/projects/create')
            .field('projectData', JSON.stringify({ art: 'Web' }));
        expect(res.status).toBe(400);
    });

    it('POST /projects/create rejects non-image files (400)', async () => {
        const login = await request(app)
            .post('/auth/login')
            .send(SEED_CREDENTIALS);

        const res = await request(app)
            .post('/projects/create')
            .field(
                'projectData',
                JSON.stringify({
                    creatorId: login.body.id,
                    title: 'No Image Project',
                    art: 'Web',
                    category: 1,
                })
            )
            .attach('pics', Buffer.from('not an image'), 'evil.txt');

        expect(res.status).toBe(400);
        expect(res.body.error).toContain('Unsupported file type');
    });
});
