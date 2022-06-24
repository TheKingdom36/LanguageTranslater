const request = require("supertest");
const express = require("express");
const bcrypt = require("bcrypt");
jest.mock("../../api/services/LanguageTranslator");
const app = require("../../app");

const mockApp = express();

mockApp.all("*", async function (req, res, next) {
  //authenticated(req, res, next);
  //OR
  var hashedPassword = await bcrypt.hash("test", "$2b$10$QfEa30LmVJcI1TCzrIRYvu");

  req.session = {};

  req.session.user = {
    username: "test",
    password: hashedPassword,
    email: "test@gmail.com",
    salt: "$2b$10$QfEa30LmVJcI1TCzrIRYvu",
  };
  console.log("next");
  next();
});

mockApp.use(app);

describe("Test the languages path", () => {
  it("It should respond to the Get method", (done) => {
    request(mockApp)
      .get("/languages")
      .then((response) => {
        expect(response.statusCode).toBe(200);
        done();
      });
  });
});

describe("Test the translation/saved path", () => {
  it("It should respond to the Get method", (done) => {
    request(mockApp)
      .get("/translation/saved")
      .then((response) => {
        expect(response.statusCode).toBe(200);
        done();
      });
  });

  it("404 response if translationId does not exist", (done) => {
    request(mockApp)
      .post("/translation/saved")
      .send({ translationId: "4edd40c86762e0fb12000003" })
      .then((response) => {
        expect(response.statusCode).toBe(404);
        done();
      });
  });
});

/*
describe("Test the POST saved translation path", () => {
  test("404 response if translationId does not exist", (done) => {
    request(app)
      .post("/translation/saved")
      .set("Cookie", ["id=2828"])
      .send({ translationId: 3218338562317828 })
      .then((response) => {
        expect(response.statusCode).toBe(404);
        done();
      });
  });
});

describe("Test the POST saved translation path", () => {
  test("200 response if translationId does exist", (done) => {
    request(app)
      .post("/translation/saved")
      .set("Cookie", ["id=2828"])
      .send({ translationId: 3218338562317826 })
      .then((response) => {
        expect(response.statusCode).toBe(200);
        expect(response.body.status).toBe("success");
        done();
      });
  });
});

describe("Test the root translation path", () => {
  test("It should respond to the POST method with a valid body", (done) => {
    request(app)
      .post("/translation")
      .send({ text: "English", to: "en", from: "en" })
      .then((response) => {
        expect(response.statusCode).toBe(200);
        expect(response.body.text).toBe("Hello");
        done();
      });
  });

  test("It should respond to the POST method with a 400 for a body missing information", (done) => {
    request(app)
      .post("/translation")
      .send({ text: "English" })
      .then((response) => {
        expect(response.statusCode).toBe(400);
        done();
      });
  });

  test("It should respond to the POST method with a 400 for not provided target language", (done) => {
    request(app)
      .post("/translation")
      .send({ text: "English", to: "tt", from: "en" })
      .then((response) => {
        expect(response.statusCode).toBe(400);
        done();
      });
  });
});


*/
