const request = require("supertest");
const app = require("../app");

describe("Test the Search API controller", () => {
  test("It should return details of a team", done =>
    request(app)
      .get("/search?search=arsenal")
      .then(response => {
        expect(response.statusCode).toBe(200);
        expect(response.body).toBeTruthy();
        done();
      }));
});
