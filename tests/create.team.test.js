const request = require("supertest");
const faker = require("faker");
const app = require("../app");

let token;

describe("Test the Create Team controller", () => {
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
      .post("/create-team")
      .set("Authorization", `bearer ${token}`)
      .send({
        name: faker.name.findName(),
        abbreviation: faker.name.lastName(),
        coach: faker.name.firstName()
      })
      .then(response => {
        expect(response.statusCode).toBe(200);
        expect(response.body).toBeTruthy();
        done();
      })
      .catch(e => {
          console.log(e)
        done()
        })
      );
});
