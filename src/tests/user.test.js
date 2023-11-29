const request = require('supertest');
const app = require('../app');

let id;
let token;

test('POST /users', async () => {
    const user= {
        firstName: "Manuel",
        lastName: "Gonzales",
        email: "gonzales@gmail.com",
        password: "gonzales1234",
        phone: "15352105"
    }
    const res = await request(app).post('/users').send(user);
    console.log(res.body)
    id= res.body.id;
    expect(res.status).toBe(201);
    expect(res.body.firstName).toBe(user.firstName);
    expect(res.body.id).toBeDefined();
});



test('POST /user/login', async () => {
    const user = {
        email: "gonzales@gmail.com",
        password: "gonzales1234"
    }
    const res = await request(app).post('/users/login').send(user);
    token = res.body.token;
    expect(res.status).toBe(200);
    expect(res.body.token).toBeDefined();
});

test('POST /user/login debe regresar incorrecto', async () => {
    const user = {
        email: "gonzalete@gmail.com",
        password: "gonzalete1234"
    }
    const res = await request(app).post('/users/login').send(user);
    expect(res.status).toBe(401);
});
test('GET / users', async () => {
    const res = await request(app)
    .get('/users')
    .set('Authorization',`Bearer ${token}`);
    expect(res.status).toBe(200);
    expect(res.body).toBeInstanceOf(Array);
});

test('PUT /users/id', async () => {
    const user = { firstName: "Leandro"}
    const res = await request(app)
    .put(`/users/${id}`)
    .send(user)
    .set('Authorization',`Bearer ${token}`);
    expect(res.status).toBe(200);
    expect(res.body.firstName).toBe(user.firstName);
});

test('DELETE /users/id', async () => {
    const res = await request(app)
    .delete(`/users/${id}`)
    .set('Authorization',`Bearer ${token}`);
    expect(res.status).toBe(204);
});