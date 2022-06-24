const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const translator = require("../services/LanguageTranslator");
const Translation = require("../models/Translation");
const {
  MODEL_NOT_AVAILABLE,
  TRANSLATION_NOT_FOUND,
} = require("../utils/ErrorMessages");

/* POST translation. */
router.post(
  "/",
  body("to").not().isEmpty(),
  body("from").not().isEmpty(),
  body("text").not().isEmpty(),
  function (req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    var target = req.body.to;
    var source = req.body.from;
    var userId = req.session.user;

    if (translator.validateModel(source, target) === false) {
      return res.status(404).json({ error: MODEL_NOT_AVAILABLE });
    }

    const translateParams = {
      text: req.body.text,
      source: source,
      target: target,
    };

    translator
      .translate(translateParams)
      .then(async (translationResult) => {
        var resultText = translationResult.result.translations[0].translation;
        var toLangObject = await translator.findLanguage(req.body.to);
        var fromLangObject = await translator.findLanguage(req.body.from);

        const newTranslation = new Translation({
          userId: userId,
          toLanguage: toLangObject,
          fromLanguage: fromLangObject,
          originalText: req.body.text,
          translatedText: resultText,
          isSaved: false,
        });

        newTranslation.save();

        res.json({ text: resultText }).send();
      })
      .catch((err) => {
        if (err.status == 404) {
          res.status(404).send({ error: MODEL_NOT_AVAILABLE });
        }
      });
  }
);

router.get("/history", async function (req, res) {
  var userId = req.session.user;
  var result = await Translation.find({ userId: userId });
  

  const translations = result.map(function (value) {
    var pastTranslation = {};

    pastTranslation.toLang = value.toLanguage;
    pastTranslation.fromLang = value.fromLanguage;
    pastTranslation.id = value._id;
    pastTranslation.originalText = value.originalText;
    pastTranslation.translatedText = value.translatedText;
    pastTranslation.isSaved = value.isSaved;

    return pastTranslation;
  });

  res.json(translations);
});

router.get("/saved", async function (req, res) {
  var userId = req.session.user;

  var result = await Translation.find({ userId: userId, isSaved: true });

  const translations = result.map(function (value) {
    var pastTranslation = {};

    pastTranslation.toLang = value.toLanguage;
    pastTranslation.fromLang = value.fromLanguage;
    pastTranslation.id = value._id;
    pastTranslation.originalText = value.originalText;
    pastTranslation.translatedText = value.translatedText;
    pastTranslation.isSaved = value.isSaved;

    return pastTranslation;
  });

  res.status(200).json(translations);
});

router.delete(
  "/saved",
  body("translationId").not().isEmpty(),
  async function (req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    var result = await Translation.findById(req.body.translationId);
    if (result ===null) {
      return res.status(404).json({ error: TRANSLATION_NOT_FOUND });
    }

    result.isSaved = false;

    result.save();
    res.status(200).json({ status: "success" });
  }
);

router.post(
  "/saved",
  body("translationId").not().isEmpty(),
  async function (req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const id = mongoose.Types.ObjectId(req.body.translationId);
    var translation = await Translation.findById(id);

    if (translation === null || translation.length === 0) {
      return res.status(404).json({ status: TRANSLATION_NOT_FOUND });
    }

    translation.isSaved = true;

    translation.save();

    res.status(200).json({ status: "success" });
  }
);

module.exports = router;
