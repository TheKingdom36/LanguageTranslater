const LanguageTranslatorV3 = require("ibm-watson/language-translator/v3");
const { IamAuthenticator } = require("ibm-watson/auth");

var LanguageTranslator = Object.create(

  new LanguageTranslatorV3({
    version: "2018-05-01",
    authenticator: new IamAuthenticator({
      apikey: process.env.LANGUAGE_TRANSLATE_APIKEY,
    }),
    serviceUrl:
    process.env.LANGUAGE_TRANSLATE_URI,
  })
  
);

LanguageTranslator.validateModel = async function (from, to) {
  var listModelsResult = await this.listModels();

  var models = listModelsResult.result.models;

  for (model in models) {
    if (models[model].source === from && models[model].target === to) {
      return true;
    }
  }
  return false;
};

LanguageTranslator.findLanguage = async function (language) {
  var listLanguagesResult = await this.listLanguages();

  return listLanguagesResult.result.languages.find(
    (value) => value.language === language
  );
};

module.exports = LanguageTranslator;
