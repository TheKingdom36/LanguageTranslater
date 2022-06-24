/**
 * Mock Language Translator provides mock support for translating between english and french
 * if other responses are required will need to manually mock the fucntions before running an individual test
 */
var mockLanguageTranslator = jest.createMockFromModule("../LanguageTranslator");

mockLanguageTranslator.validateModel = function (from, to) {
  var models = [
    { source: "en", target: "fr" },
    { source: "fr", target: "en" },
    { source: "en", target: "en" },
  ];

  for (mod in models) {
    if (models[mod].source === from && models[mod].target === to) {
      return true;
    }
  }
  return false;
};

mockLanguageTranslator.translate = jest
  .fn()
  .mockResolvedValue({ result: { translations: [{ translation: "Hello" }] } });

mockLanguageTranslator.listLanguages = jest.fn().mockResolvedValue({
  result: {
    languages: [
      {
        language: "en",
        language_name: "English",
        supported_as_source: true,
        supported_as_target: true,
      },
      {
        language: "fr",
        language_name: "French",
        supported_as_source: true,
        supported_as_target: true,
      },
    ],
  },
});



module.exports = mockLanguageTranslator;
