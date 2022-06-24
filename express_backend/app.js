const express = require("express");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const cors = require("cors");
const morgan = require("morgan");
const helmet = require("helmet");
const createError = require("http-errors");

const usersRouter = require("./api/routes/user");
const languagesRouter = require("./api/routes/Languages")
const translationRouter = require("./api/routes/Translation");

const session = require("express-session");
const MongoStore = require("connect-mongo");
require('dotenv').config();
require('dotenv').config({ path: `./.env.${process.env.NODE_ENV}` })

console.log(`./.env.${process.env.NODE_ENV}`)

//Router configuration
translationRouter.options("*", cors({ origin: true, credentials: true }));

var app = express();

app.use(cors({ origin: true, credentials: true }));
app.use(express.urlencoded({ extended: false }));
app.use(logger("dev"));
app.use(morgan("combined"));
app.use(express.json());
app.use(cookieParser());
app.use(helmet());

// middleware to test if authenticated
function isAuthenticated(req, res, next) {
  if (req.session.user) next();
  else {
    
    next(createError(401));
  }
}

const mongoStoreOptions = {
  mongoUrl: process.env.MONGO_URI,
  dbName: process.env.DATABASE_NAME,
};

//Create session middleware
app.use(
  session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false },
    store: MongoStore.create(mongoStoreOptions),
  })
);

//setting metadata headers
app.use(function (req, res, next) {
  res.header("Content-Type", "application/json;charset=UTF-8");
  res.header("Access-Control-Allow-Credentials", true);
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );

  next();
});

app.use("/user", usersRouter);
app.use("/",languagesRouter);
app.use("/translation", isAuthenticated, translationRouter);

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500).json();
});

module.exports = app;
