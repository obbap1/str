const request = require("supertest");
const app = require("../app");
const faker = require("faker");
const mongoose = require("mongoose");
let token;
let matchlink;

describe("Test the Update Fixture controller", () => {
  beforeEach(done => {
    request(app)
      .post("/login")
      .send({
        email: "paschalobba@yahoo.com",
        password: "1234567"
      })
      .then(response => {
        token = response.body;
        request(app)
          .post("/create-fixture")
          .set("Authorization", `bearer ${token}`)
          .send({
            firstteam: mongoose.Types.ObjectId(),
            secondteam: mongoose.Types.ObjectId()
          })
          .then(() => {
            request(app)
              .get("/view-fixture")
              .set("Authorization", `bearer ${token}`)
              .then(response => {
                console.log(response.body);
                matchlink = response.body[0].matchlink;
                done();
              });
          });
      });
  });

  test("It should update the fixture with new details", done =>
    request(app)
      .put("/update-fixture")
      .set("Authorization", `bearer ${token}`)
      .send({
        firstteam: mongoose.Types.ObjectId(),
        secondteam: mongoose.Types.ObjectId(),
        scores: {
          firstteam: 3,
          secondteam: 0
        },
        status: "completed",
        matchlink
        // matchlink:
        //   "99c9611162cd954742fad830d2869f44ce471aadcc21e333db4396d99705b7ad5905683b450f661c388b6eafd02771c412bd8425f43810020bc17adf38ac54d5"
      })
      .then(response => {
        expect(response.statusCode).toBe(200);
        expect(response.body).toBeTruthy();
        done();
      })
      .catch(e => console.log(e)));
});
