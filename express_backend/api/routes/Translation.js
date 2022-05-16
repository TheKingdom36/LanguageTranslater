const express = require("express");
const router = express.Router();
const languageTranslator = require("../services/LanguageTranslator");
const HistoryStore = require("../services/HistoryStore");
const SavedStore = require("../services/SavedStore");
const { body, check, validationResult } = require("express-validator");

const hisStore = new HistoryStore();
const sdStore = new SavedStore();


/* POST translation. */
router.post(
  "/",
  body("to").not().isEmpty(),
  body("from").not().isEmpty(),
  body("text").not().isEmpty(),
  function (req, res) {

    console.log(req.body)
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    var target = req.body.to;
    var source = req.body.from;

    var userId = req.cookies.id;

    console.log(languageTranslator.validateModel(source, target))

    if (languageTranslator.validateModel(source, target) === false) {
      return res.status(400).json({ error: ["Model is not available"] });
    }

    const translateParams = {
      text: req.body.text,
      source: source,
      target: target,
    };

    languageTranslator
      .translate(translateParams)
      .then((translationResult) => {
        var resultText = translationResult.result.translations[0].translation;
        var translationId = Math.random().toString();
        translationId = translationId.substring(2, translationId.length);

        var translation = {
          id: userId,
          translation: {
            id: translationId,
            toLang: req.body.to,
            fromLang: req.body.from,
            originalText: req.body.text,
            translatedText: resultText,
          },
        };

        hisStore.add(translation);
        console.log("Gelelo")
        res.json({ text: resultText }).send();
      })
      .catch((err) => {
        console.log("error:", err);
        if (err.status == 404) {
          res.status(404).send("Model is not available");
        }
      });
  }
);

router.get("/Languages", function (req, res) {
  languageTranslator
    .listLanguages()
    .then((languagesRes) => {
      var result = languagesRes.result.languages.map((value) => {
        return {
          language: value.language,
          language_name: value.language_name,
          supported_as_source: value.supported_as_source,
          supported_as_target: value.supported_as_target,
        };
      });

      res.json(result);
    })
    .catch((err) => {
      console.log("error:", err);
    });
});

router.get("/history", function (req, res) {
  var id = req.cookies.id;
  console.log("id " + id);
  var result = hisStore.find(function (O) {
    return O.id === id;
  });
  console.log("result " + result);
  const translations = result.map(function (value) {
    return value.translation;
  });

  res.json(translations);
});

router.get("/saved", function (req, res) {
  var id = req.cookies.id;

  var result = sdStore.find(function (O) {
    if (O.id === id) {
      return true;
    }
    return false;
  });

  const translations = result.map(function (value) {
    return value.translation;
  });

  res.status(200).json(translations);
});

router.delete(
  "/saved",
  body("translationId").not().isEmpty(),
  function (req, res) {
    var id = req.cookies.id;

    const deleteCallback = (value) => {
      return value.translation.id == req.body.translationId;
    };

    sdStore.delete(deleteCallback);

    res.status(200).json({ status: "success" });
  }
);

router.post(
  "/saved",
  check("cookies.id"),
  body("translationId").not().isEmpty(),
  function (req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    var id = req.cookies.id;

    var translationInfo = hisStore.find(
      (value) => value.translation.id == req.body.translationId
    );

    console.log(translationInfo.length);
    if (translationInfo === undefined || translationInfo.length === 0) {
      return res.status(404).json({ status: "translation not found" });
    }

    sdStore.add(translationInfo[0]);

    res.status(200).json({ status: "success" });
  }
);



module.exports = router;
