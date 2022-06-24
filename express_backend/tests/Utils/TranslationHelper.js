const Translation = require("../../api/models/Translation")

const generateTranslationModel = (
  userId = 0,
  toLanguageObject = {language:"en",language_name:"English"},
  fromLanguageObject = {language:"fr",language_name:"French"},
  orginalText = "Hello",
  translatedText = "Bonjuer",
  isSaved = "false"
) =>{

  const newTranslation = new Translation({
    userId: userId,
    toLanguage: toLanguageObject,
    fromLanguage: fromLanguageObject,
    originalText: orginalText,
    translatedText: translatedText,
    isSaved: isSaved,
  });

  return newTranslation;
}

module.exports = {generateTranslationModel}
