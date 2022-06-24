export const getTranslation = async (text, from, to) => {
  var data = { text: text, to: to, from: from };

  var result = await fetch("http://localhost:9000/translation", {
    method: "POST", // *GET, POST, PUT, DELETE, etc.
    headers: {
      "Content-Type": "application/json",
      //'Content-Type': 'application/x-www-form-urlencoded',
    },
    credentials: "include",
    body: JSON.stringify(data), // body data type must match "Content-Type" header
  }).then((res) => {
    if (res.status !== 200) {
      throw new Error();
    }
    return res.json();
  });
  return result;
};

export const getAvailableLanguages = async () => {
  var result = await fetch("http://localhost:9000/languages", {
    method: "GET",
    credentials: "include",
  }).then((res) => {
    if (res.status !== 200) {
      throw new Error();
    }
    return res.json();
  });
  return result;
};

export const fetchHistory = async (id) => {
  var url = "http://localhost:9000/translation/history?";

  var result = await fetch(url, {
    method: "GET", // *GET, POST, PUT, DELETE, etc.
    credentials: "include",
  }).then((res) => {
    if (res.status !== 200) {
      throw new Error();
    }
    return res.json();
  });
  return result;
};

export const fetchSaved = async (id) => {
  var url = "http://localhost:9000/translation/saved?";

  var result = await fetch(url, {
    method: "GET", // *GET, POST, PUT, DELETE, etc.
    credentials: "include",
  }).then((res) => {
    if (res.status !== 200) {
      throw new Error();
    }
    return res.json();
  });
  return result;
};

export const saveTranslation = async (translationId) => {
  //var data = { translationId:translationId };

  var url = "http://localhost:9000/translation/saved?";

  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  var raw = JSON.stringify({
    translationId: translationId,
  });

  var requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
    credentials: "include",
  };

  var result = await fetch(url, requestOptions).then((res) => {
    if (res.status !== 200) {
      throw new Error();
    }
    return res.json();
  });
  return result;
};

export const deleteSavedTranslation = async (translationId) => {
  var url = "http://localhost:9000/translation/saved?";
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  var raw = JSON.stringify({
    translationId: translationId,
  });

  var requestOptions = {
    method: "DELETE",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
    credentials: "include",
  };

  var result = await fetch(url, requestOptions).then((res) => {
    if (res.status !== 200) {
      throw new Error();
    }

    return res.json();
  });
  return result;
};
