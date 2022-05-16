const LanguageTranslatorV3 = require("ibm-watson/language-translator/v3");
const { IamAuthenticator } = require("ibm-watson/auth");

const LanguageTranslator = new LanguageTranslatorV3({
  version: "2018-05-01",
  authenticator: new IamAuthenticator({
    apikey: "FLbxrkIBerSU01hoCBEefCBus0SZh4-dl2POCl7ME5wO",
  }),
  serviceUrl:
    "https://api.eu-gb.language-translator.watson.cloud.ibm.com/instances/360c3bb5-da9e-4f93-b122-32133106c655",
});

LanguageTranslator.listModels().then(
  (result) => (LanguageTranslator.models = result.result.models)
);

LanguageTranslator.validateModel = function (from, to) {
  for (model in this.models) {
    if (model.source === from && model.target === to) {
      return true;
    }
  }

  return false;
};

module.exports = LanguageTranslator;
