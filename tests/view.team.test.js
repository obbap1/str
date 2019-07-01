const request = require("supertest");
const app = require("../app");

let token;
let name;

describe("Test the View Team controller", () => {
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

  test("It should show all the teams", done =>
    request(app)
      .get("/view-team")
      .set("Authorization", `bearer ${token}`)
      .then(response => {
        expect(response.statusCode).toBe(200);
        expect(response.body).toBeTruthy();
        // eslint-disable-next-line prefer-destructuring
        name = response.body[0].name;
        done();
      }));

  test("It should respond with the details of a single team", done =>
    request(app)
      .get(`/view-team?name=${name}`)
      .set("Authorization", `bearer ${token}`)
      .then(response => {
        expect(response.statusCode).toBe(200);
        // expect(response.body.length).toEqual(1);
        done();
      }));
});
