const mongoose = require("mongoose")

const TranslationSchema = new mongoose.Schema({
    userId: String,
    toLanguage : {
        language:String,
        language_name:String
    },
    fromLanguage: {
        language:String,
        language_name:String
    },
    originalText:String,
    translatedText:String,
    isSaved:Boolean
  });

module.exports = mongoose.model("translations",TranslationSchema)
  