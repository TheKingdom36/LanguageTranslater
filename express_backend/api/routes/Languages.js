const express = require("express");
const router = express.Router();
const translator = require("../services/LanguageTranslator");


router.get("/languages", function (req, res) {

    translator
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

  module.exports = router;
