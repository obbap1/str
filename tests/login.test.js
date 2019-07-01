const request = require("supertest");
const faker = require("faker");
const app = require("../app");

const user = {};

describe("Test the login controller", () => {
  beforeEach(done => {
    user.firstName = faker.name.firstName();
    user.lastName = faker.name.lastName();
    user.email = faker.internet.email();
    user.password = String(Math.round(Math.random() * 10 ** 6));
    user.type = "admin";
    request(app)
      .post("/signup")
      .send({
        firstname: user.firstName,
        lastname: user.lastName,
        email: user.email,
        password: user.password,
        type: user.type
      })
      .then(() => {
        done();
      });
  });

  afterEach(() => {
    Object.keys(user).forEach(key => {
      user[key] = "";
    });
  });

  test("It should respond with 422 for an invalid body", done =>
    request(app)
      .post("/login")
      .send({
        email: "",
        password: ""
      })
      .then(response => {
        expect(response.statusCode).toBe(422);
        expect(response.body).toHaveProperty("errors");
        done();
      }));

  test("It should pass", done =>
    request(app)
      .post("/login")
      .send({
        email: 'paschalobba@yahoo.com',
        password: '1234567'
      })
      .then(response => {
        expect(response.statusCode).toBe(200);
        expect(response.body).toBeTruthy();
        done();
      }));
});
