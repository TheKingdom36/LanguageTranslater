const User = require("../../api/models/User")
const generateUser = (username="test",email="test@gmail.com",password="test",salt="test") =>{

    
    var newUser = new User({
        username: username,
        email: email,
        password: password,
        salt: salt,
      });
  
      return newUser
}

module.exports = generateUser