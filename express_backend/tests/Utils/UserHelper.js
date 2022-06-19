const User = require("../../api/models/User")
const generateSampleUser = () =>{

    
    var newUser = new User({
        username: "test",
        email: "test@gmail.com",
        password: "test",
        salt: "test",
      });
  
      newUser.save();
}