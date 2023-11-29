const request = require('supertest');
const app = require('../app');
require('../models');
let token;
let id;

beforeAll(async()=> {
    const user = {
        email: "test@gmail.com",
        password: "test1234"
    }
    const res = await request(app).post('/users/login').send(user);
    token = res.body.token;
});

test('GET /products', async () => {
    const res = await request(app).get('/products');
    expect(res.status).toBe(200);
    expect(res.body).toBeInstanceOf(Array);
});

test('POST /products', async () => {
    const body = {
        title: 'led LG',
        description: 'Televisor',
        brand: 'LG',
        price: '899'
    }
    const res = await request(app)
    .post('/products')
    .send(body)
    .set('Authorization', `Bearer ${token}`);
    id = res.body.id;
    expect(res.status).toBe(201);
    expect(res.body.id).toBeDefined();
    expect(res.body.title).toBe(body.title);
});

test('DELETE /products/id', async () => {
    const res = await request(app)
    .delete(`/products/${id}`)
    .set('Authorization', `Bearer ${token}`);
    expect(res.status).toBe(204);
});
