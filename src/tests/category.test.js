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
})

test('GET /categories', async () => {
    const res = await request(app).get('/categories');
    console.log(res.body);
    expect(res.status).toBe(200);
    expect(res.body).toBeInstanceOf(Array);
});

test('POST /categories', async () => {
    const body = {
        name: 'Smartwatchs'
    }
    const res = await request(app)
    .post('/categories')
    .send(body)
    .set('Authorization', `Bearer ${token}`);
    id = res.body.id;
    expect(res.status).toBe(201);
    expect(res.body.id).toBeDefined();
    expect(res.body.name).toBe(body.name);
});

test('PUT /categories/id actualizar', async () => {
    const body = { name: "Radios"}
    const res = await request(app)
    .put(`/categories/${id}`)
    .send(body)
    .set('Authorization', `Bearer ${token}`);
});

test('DELETE /categories/id', async () => {
    const res = await request(app)
    .delete(`/categories/${id}`)
    .set('Authorization', `Bearer ${token}`);
    expect(res.status).toBe(204);
});
