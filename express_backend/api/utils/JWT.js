const jwt = require("jsonwebtoken");

const generateJWT = (username, password) => {
  const data = {
    exp: Math.floor(Date.now() / 1000) + 60 * 60, // 1 hour
    nbf: Math.floor(Date.now() / 1000),
    data: { username: username, password: password },
  };

  return jwt.sign(data, process.env.JWT_SECERT);
};

module.exports= generateJWT