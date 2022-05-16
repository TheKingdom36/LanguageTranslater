

var mockLanguageTranslator = jest.createMockFromModule("../LanguageTranslator");


mockLanguageTranslator.validateModel = function(from , to){
    var models = [{source:"en",target:"en"},{source:"en",target:"fr"}]


    for (mod in models) {
        console.log("model",models[mod])

        if (models[mod].source === from && models[mod].target === to) {
          return true;
        }
      }
      return false;
}


mockLanguageTranslator.translate = jest.fn().mockResolvedValue({result:{translations:[{translation:"Hello"}]}});


module.exports = mockLanguageTranslator