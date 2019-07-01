const request = require("supertest");
const { Mongoose } = require("mongoose");

const mongoose = new Mongoose();
const { Mockgoose } = require("mockgoose");

const mockgoose = new Mockgoose(mongoose);
const faker = require("faker");
const app = require("../app");

beforeAll(done => {
  mockgoose.prepareStorage().then(() => {
    mongoose.connect(
      "mongodb://paschal:paschall1122334455@ds243317.mlab.com:43317/sterling",
      err => {
        done(err);
      }
    );
  });
 
});

describe("Test the signup controller", () => {
  test("It should respond with 422 for an invalid body", done =>
    request(app)
      .post("/signup")
      .send({
        firstname: "",
        lastname: "",
        email: "",
        password: "",
        type: ""
      })
      .then(response => {
        expect(response.statusCode).toBe(422);
        expect(response.body).toHaveProperty("errors");
        done();
      }));

  test("It should pass", done =>
    request(app)
      .post("/signup")
      .send({
        firstname: faker.name.firstName(),
        lastname: faker.name.lastName(),
        email: "paschalobba@yahoo.com",
        password: "1234567",
        type: "admin"
      })
      .then(response => {
        expect(response.statusCode).toBe(200);
        done();
      }));
});
