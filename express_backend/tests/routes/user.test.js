const request = require("supertest");
const express = require("express");
const app = require("../../app");
const bcrypt = require("bcrypt");
const User = require("../../api/models/User");
const generateUser = require("../Utils/UserHelper");

describe("Test the sign up path /user/", () => {
  beforeEach(async () => {
    await User.deleteMany();
  });

  it("POST with all provided body parameters should correctly register user", async () => {
    var body = {
      username: "test",
      email: "test@gmail.com",
      password: "password",
    };

    await request(app)
      .post("/user/")
      .send(body)
      .then(async (response) => {
        expect(response.statusCode).toBe(200);

        const registeredUser = await User.findOne({ email: body.email });
        expect(registeredUser).toEqual(expect.anything());
        expect(registeredUser.email).toEqual(body.email);
        expect(registeredUser.username).toEqual(body.username);
      });
  });

  it("POST with missing email should respond with 400 and not save user", async () => {
    var body = { username: "test", email: "", password: "password" };

    await request(app)
      .post("/user/")
      .send(body)
      .then(async (response) => {
        expect(response.statusCode).toBe(400);
        const registeredUser = await User.findOne({ email: body.email });
        expect(registeredUser).toBe(null);
      });
  });

  it("POST with missing username should respond with 400 and not save user", async () => {
    var body = { username: "", email: "test@gmail.com", password: "password" };

    await request(app)
      .post("/user/")
      .send(body)
      .then(async (response) => {
        expect(response.statusCode).toBe(400);
        const registeredUser = await User.findOne({ email: body.email });
        expect(registeredUser).toBe(null);
      });
  });

  it("POST with missing password should respond with 400 and not save user", async () => {
    var body = { username: "test", email: "test@gmail.com", password: "" };

    await request(app)
      .post("/user/")
      .send(body)
      .then(async (response) => {
        expect(response.statusCode).toBe(400);
        const registeredUser = await User.findOne({ email: body.email });
        expect(registeredUser).toBe(null);
      });
  });
});

describe("Test the login path /user/login", () => {
  var TEST_USER;
  beforeEach(async () => {
    await User.deleteMany();

    var hashedPassword = await bcrypt.hash(
      "password",
      "$2b$10$QfEa30LmVJcI1TCzrIRYvu"
    );

    TEST_USER = await generateUser(
      "test",
      "test@gmail.com",
      hashedPassword,
      "$2b$10$QfEa30LmVJcI1TCzrIRYvu"
    ).save();
  });

  it("POST with all provided body parameters should correctly login user by creating a session and returning the session id", async () => {
    var body = {
      email: "test@gmail.com",
      password: "password",
    };

    await request(app)
      .post("/user/login")
      .send(body)
      .then(async (response) => {
        expect(response.statusCode).toBe(200);
      });
  });
});
