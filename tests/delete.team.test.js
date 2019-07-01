const request = require("supertest");
const app = require("../app");
const faker = require('faker');
let token;

let name = faker.name.firstName();

describe("Test the Delete Team controller", () => {
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
        request(app)
          .post("/create-team")
          .set("Authorization", `bearer ${token}`)
          .send({ name, abbreviation: faker.name.findName(), coach: faker.name.findName() })
          .then(() => {
            done();
          });
      });
  });

  test("It should delete the team", done =>
    request(app)
      .delete("/delete-team")
      .set("Authorization", `bearer ${token}`)
      .send({ name })
      .then(response => {
        expect(response.statusCode).toBe(200);
        expect(response.body).toBeTruthy();
        done();
      }));
});
