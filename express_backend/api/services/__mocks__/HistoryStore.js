const mockHistoryStore = jest.createMockFromModule("../HistoryStore");

mockHistoryStore.mockImplementation(() => {
  var values = [
    {
      id: "skks",
      translation: {
        id: "3218338562317826",
        toLang: "fr",
        fromLang: "en",
        originalText: "Hello",
        translatedText: "Bonjour",
      },
    },
  ];

  return {
    get: function () {
      return values;
    },

    find: function (filterFunc) {
      var result = values.filter((val) => filterFunc(val));

      return result;
    },
    add:function(value){
        values.push(value)
    }
  };
});

module.exports = mockHistoryStore;
