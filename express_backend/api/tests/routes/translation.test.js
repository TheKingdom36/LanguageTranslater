const request = require("supertest");

jest.mock("../../services/HistoryStore");
jest.mock("../../services/LanguageTranslator");
const languageTranslator = require("../../services/LanguageTranslator");
const HistoryStore = require("../../services/HistoryStore");
const app = require("../../../app");
const mockHistoryStore = require("../../services/__mocks__/HistoryStore");



describe("Test the GET save translation path", () => {
  test("It should response the Get method", (done) => {
    request(app)
      .get("/translation/saved")
      .set("Cookie", ["id=2828"])
      .then((response) => {
        expect(response.statusCode).toBe(200);
        done();
      });
  });
});

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



/*
describe("Test the save translation path", () => {
  test("It should response the POST method", (done) => {

    
    request(app)
      .post("/translation/saved")
      .send({ translationId: "30393920203" })
      .then((response) => {
        expect(response.statusCode).toBe(200);
        done();
      });
  });
});*/
