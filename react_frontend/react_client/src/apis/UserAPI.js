
export const login = async (email,  password) => {
    var data = { "email": email, "password":password };
  
    var result = await fetch("http://localhost:9000/user/login", {
      method: "POST", 
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(data), 
    }).then((res) => {
      if (res.status !== 200) {
        throw new Error();
      }
      return res.json();
    });
    return result;
  };

  export const logout = async () => {

    var result = await fetch("http://localhost:9000/user/logout", {
      method: "GET", 
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    }).then((res) => {
      if (res.status !== 200) {
        throw new Error();
      }
      return res.json();
    });
    return result;
  };

  export const signup = async (username,email,  password) => {
    var data = { "username":username,"email": email, "password":password };
  
    var result = await fetch("http://localhost:9000/user", {
      method: "POST", 
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(data), 
    }).then((res) => {
      if (res.status !== 200) {
        throw new Error();
      }
      return res.json();
    });
    return result;
  };

  //Will only be successful if a connect.sid cookie is present
  export const fetchUserInformation = async () => {
  
    var result = await fetch("http://localhost:9000/user/", {
      method: "GET", 
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include", 
    }).then((res) => {
      if (res.status !== 200) {
        throw new Error();
      }
      return res.json();
    });
    return result;
  };