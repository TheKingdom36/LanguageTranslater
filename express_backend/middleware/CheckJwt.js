const jwt = require("express-jwt");
require('dotenv').config()



var checkJwt = jwt({
  secret: process.env.JWT_SECERT,
  algorithms: [process.env.HASH_ALGORITHM],
});

module.exports = checkJwt;
