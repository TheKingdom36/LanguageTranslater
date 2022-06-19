var mockLanguageTranslator = jest.createMockFromModule("../LanguageTranslator");

mockLanguageTranslator.validateModel = function (from, to) {
  var models = [
    { source: "en", target: "en" },
    { source: "en", target: "fr" },
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
  result:{


    languages:[
      {
        language: "af",
        language_name: "Afrikaans",
        supported_as_source: false,
        supported_as_target: false,
      },
      {
        language: "ar",
        language_name: "Arabic",
        supported_as_source: true,
        supported_as_target: true,
      },
    ]
  



   }});

module.exports = mockLanguageTranslator;
