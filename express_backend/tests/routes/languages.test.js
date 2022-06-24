
const request = require("supertest");
const express = require("express");
const app = require("../../app");

jest.mock("../../api/services/LanguageTranslator");

describe("Test the languages path", () => {
    it("It should respond to the Get method", (done) => {
      request(app)
        .get("/languages")
        .then((response) => {
          expect(response.statusCode).toBe(200);
          done();
        });
    });
  });