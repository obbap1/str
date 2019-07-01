const request = require('supertest');
const app = require('../app');
const faker = require('faker');
let token;

let name = faker.name.firstName();

describe('Test the Update Team controller', () => {
  beforeEach((done) => {
    request(app).post('/login').send({
      email: 'paschalobba@yahoo.com',
      password: '1234567',
    }).then((response) => {
      token = response.body;
    });
  });

  test('It should update the team with new details', done => request(app)
    .put('/update-team')
    .set('Authorization', `bearer ${token}`)
    .send({ name:'arsenal', abbreviation: 'ARS', coach: 'Pbaba' })
    .then((response) => {
      expect(response.statusCode).toBe(200);
      expect(response.body).toBeTruthy();
      done();
    })
    .catch(e => console.log(e))
    );
});
