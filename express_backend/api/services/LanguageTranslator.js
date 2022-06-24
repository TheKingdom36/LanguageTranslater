const LanguageTranslatorV3 = require("ibm-watson/language-translator/v3");
const { IamAuthenticator } = require("ibm-watson/auth");

var LanguageTranslator = Object.create(
  new LanguageTranslatorV3({
    version: "2018-05-01",
    authenticator: new IamAuthenticator({
      apikey: "FLbxrkIBerSU01hoCBEefCBus0SZh4-dl2POCl7ME5wO",
    }),
    serviceUrl:
      "https://api.eu-gb.language-translator.watson.cloud.ibm.com/instances/360c3bb5-da9e-4f93-b122-32133106c655",
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
