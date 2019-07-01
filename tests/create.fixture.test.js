const request = require("supertest");
const faker = require("faker");
const app = require("../app");
const mongoose = require('mongoose');
let name = faker.name.findName();
let token;



describe("Test the Create Fixture controller", () => {
  beforeEach(done => {
    request(app)
      .post("/login")
      .send({
        email: "paschalobba@yahoo.com",
        password: "1234567"
      })
      .then(response => {
        token = response.body;
        done();
      });
  });

  test("It should pass", done =>
    request(app)
      .post("/create-fixture")
      .set('Authorization', `bearer ${token}`)
      .send({
        firstteam: mongoose.Types.ObjectId(),
        secondteam:mongoose.Types.ObjectId()
      })
      .then(response => {
        expect(response.statusCode).toBe(200);
        expect(response.body).toBeTruthy();
        done();
      })
      .catch(e => console.log(e.message))
      );
});
