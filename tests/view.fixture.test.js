const request = require("supertest");
const app = require("../app");

let token;
let matchlink;

describe("Test the View Fixture controller", () => {
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

  test("It should show all the fixtures", done =>
    request(app)
      .get("/view-fixture")
      .set("Authorization", `bearer ${token}`)
      .then(response => {
          console.log('view fixtures',response.body);
        expect(response.statusCode).toBe(200);
        expect(response.body).toBeTruthy();
        done();
      }));

  test("It should respond with the details of a single fixture", done =>
    request(app)
      .get(`/view-fixture?matchlink=${matchlink}`)
      .set("Authorization", `bearer ${token}`)
      .then(response => {
        expect(response.statusCode).toBe(200);
        done();
      }));
});
