const request = require("supertest");
const express = require("express");
const app = require("../../app");
const LanguageTranslator = require("../../api/services/LanguageTranslator");
const Translation = require("../../api/models/Translation");
const bcrypt = require("bcrypt");
const User = require("../../api/models/User");
const { MODEL_NOT_AVAILABLE } = require("../../api/utils/ErrorMessages");
const { generateTranslationModel } = require("../Utils/TranslationHelper");

const mockApp = express();

jest.mock("../../api/services/LanguageTranslator");

let TEST_USER_ID;
let TEST_USER = null;

mockApp.all("*", async function (req, res, next) {
  //authenticated(req, res, next);
  //OR
  var hashedPassword = await bcrypt.hash(
    "test",
    "$2b$10$QfEa30LmVJcI1TCzrIRYvu"
  );

  if (TEST_USER === null) {
    TEST_USER = new User({
      username: "test",
      password: hashedPassword,
      email: "test@gmail.com",
      salt: "$2b$10$QfEa30LmVJcI1TCzrIRYvu",
    });
    await TEST_USER.save();
  }

  req.session = {};
  const id = TEST_USER._id.toString();
  req.session.user = id;
  TEST_USER_ID = id;
  next();
});

mockApp.use(app);


describe("Test the translation/ path", () => {
  beforeAll(async () => {
    //Set up some mocked functions
    LanguageTranslator.findLanguage = jest
      .fn()
      .mockResolvedValue({ language: "en", language_name: "English" });

    //Expect the source language to be English and target language to be French
    LanguageTranslator.translate = jest.fn().mockResolvedValue({
      result: { translations: [{ translation: "Bonjuer" }] },
    });
  });

  it("Should respond correctly when all required data is provided", (done) => {
    var text = "Hello";

    request(mockApp)
      .post("/translation/")
      .send({ to: "en", from: "fr", text: text })
      .then(async (response) => {
        console.log(
          await Translation.findOne({ userId: TEST_USER_ID, orginalText: text })
        );
        expect(
          await Translation.findOne({ userId: TEST_USER_ID, orginalText: text })
        ).toEqual(expect.anything());
        expect(response.body.text).toBe("Bonjuer");
        expect(response.statusCode).toBe(200);
        done();
      });
  });

  it("Should respond 400 when text not provided", (done) => {
    request(mockApp)
      .post("/translation/")
      .send({ to: "fr", from: "en" })
      .then((response) => {
        expect(response.statusCode).toBe(400);
        done();
      });
  });

  it("Should respond 400 when source language is not provided", (done) => {
    var text = "Hello";

    request(mockApp)
      .post("/translation/")
      .send({ to: "fr", text: text })
      .then((response) => {
        expect(response.statusCode).toBe(400);
        done();
      });
  });

  it("Should respond 400 when target language is not provided", (done) => {
    var text = "Hello";

    request(mockApp)
      .post("/translation/")
      .send({ from: "en", text: text })
      .then((response) => {
        expect(response.statusCode).toBe(400);
        done();
      });
  });

  it("Should respond 404 when source/target model is not avaialble", (done) => {
    var text = "Hello";

    request(mockApp)
      .post("/translation/")
      .send({ to: "zz", from: "zz", text: text })
      .then((response) => {
        expect(response.statusCode).toBe(404);
        expect(response.body.error).toBe(MODEL_NOT_AVAILABLE);
        done();
      });
  });
});

describe("Test the translation/saved path", () => {
  beforeAll(async () => {});
  afterAll(async () => {});

  it("GET should return list of saved translations for the user", (done) => {
    request(mockApp)
      .get("/translation/saved")
      .then((response) => {
        expect(response.statusCode).toBe(200);
        done();
      });
  });

  it("POST should return 404 response if translationId does not exist", (done) => {
    request(mockApp)
      .post("/translation/saved")
      .send({ translationId: "4edd40c86762e0fb12000003" })
      .then((response) => {
        expect(response.statusCode).toBe(404);
        done();
      });
  });

  it("DELETE should return 200 response if translationId does exist", async () => {
    //Save translation to the database directly
    const newTranslation = new Translation({
      userId: "ddddd",
      toLanguage: {
        language: "fr",
        language_name: "French",
      },
      fromLanguage: {
        language: "en",
        language_name: "English",
      },
      originalText: "req.body.text",
      translatedText: "resultText",
      isSaved: true,
    });

    await newTranslation.save();
    const translationId = newTranslation._id;

    await request(mockApp)
      .delete("/translation/saved")
      .send({ translationId: translationId })
      .then(async (response) => {
        expect(response.statusCode).toBe(200);

        var queryResult = await Translation.findById(translationId);
        expect(queryResult.isSaved).toEqual(false);
      });
  });

  it("POST Should return 200 response if translationId does exist", async () => {
    var translationId;
    //Save translation to the database directly
    const newTranslation = new Translation({
      userId: "ddddd",
      toLanguage: {
        language: "fr",
        language_name: "French",
      },
      fromLanguage: {
        language: "en",
        language_name: "English",
      },
      originalText: "req.body.text",
      translatedText: "resultText",
      isSaved: false,
    });
    await newTranslation.save();

    translationId = newTranslation._id;

    await request(mockApp)
      .post("/translation/saved")
      .send({ translationId: translationId })
      .then(async (response) => {
        expect(response.statusCode).toBe(200);
        expect(response.body.status).toBe("success");

        var queryResult = await Translation.findById(translationId);
        expect(queryResult.originalText).toEqual("req.body.text");
      });
  });

  it("DELETE should return 404 response if translationId does not exist", (done) => {
    const INVALID_ID = "000000000000000000000000";

    request(mockApp)
      .delete("/translation/saved")
      .send({ translationId: INVALID_ID })
      .then((response) => {
        expect(response.statusCode).toBe(404);
        done();
      });
  });
});

describe("Test the translation/history path", () => {
  beforeEach(async () => {
    //Delete any existing Translations
    await Translation.deleteMany();

  });
  afterAll(async () => {});

  it("GET should return translation which has the user id", async () => {
    var idt = TEST_USER_ID;
    await generateTranslationModel(userId=TEST_USER_ID,orginalText="Hello",translatedText="Bonjuer").save()

    await request(mockApp)
      .get("/translation/history")
      .then((response) => {
        expect(response.statusCode).toBe(200);
        expect(response.body.length).toBe(1);
      });
  });


  it("GET should return list of past translations that are only associsated to the user id", async () => {
    const INVALID_ID = "000000000000000000000000";
    await generateTranslationModel(userId=TEST_USER_ID,orginalText="Hello",translatedText="Bonjuer").save()
    await generateTranslationModel(userId=INVALID_ID,orginalText="Hello",translatedText="Bonjuer").save()
    await generateTranslationModel(userId=TEST_USER_ID,orginalText="Hello",translatedText="Bonjuer").save()

    await request(mockApp)
      .get("/translation/history")
      .then((response) => {
        expect(response.statusCode).toBe(200);
        expect(response.body.length).toBe(2);
      });
  });
});
