const request = require("supertest");
const app = require("../app");
const mongoose = require("mongoose");

let token;
let matchlink;

describe("Test the Delete Fixture controller", () => {
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
          .post("/create-fixture")
          .send({
            firstteam: mongoose.Types.ObjectId(),
            secondteam: mongoose.Types.ObjectId()
          })
          .set("Authorization", `bearer ${token}`)
          .then(res => {
            request(app)
              .get("/view-fixture")
              .set("Authorization", `bearer ${token}`)
              .then(res => {
                // eslint-disable-next-line prefer-destructuring
                matchlink = res.body[0].matchlink;
                done();
              });
          });
      });
  });

  test("It should delete the fixture", done =>
    request(app)
      .delete("/delete-fixture")
      .set("Authorization", `bearer ${token}`)
      .send({
        matchlink
      })
      .then(response => {
        expect(response.statusCode).toBe(200);
        expect(response.body).toBeTruthy();
        done();
      }));
});
