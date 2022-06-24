import { SidePanelList } from "./SidePanelList";
import { Translation } from "./Translation";
import { fetchSaved } from "../apis/LanguageTranslatorAPI";
import { useEffect, useState } from "react";
import { TranslationDeleteBin } from "./TranslationDeleteBin";

export const SavedPanel = ({ show,onClose, onTranslationSelect  }) => {
  const [savedTranslations, setSavedTranslations] = useState([]);

  useEffect(() => {
    async function getSaved() {
      var result;

      try {
        result = await fetchSaved();
      } catch (e) {
        console.log("There was an error getting the saved translations");
      }

      if (result === undefined) {
        result = [];
      }

  

      setSavedTranslations(result);
    }

    if(show===true){
    getSaved();
    }
  }, [show]);

  return (
    <SidePanelList
      title={"Saved"}
      onClose={onClose}
      content={savedTranslations.map((O) => (
        <div onClick={() => onTranslationSelect(O)}>
          <Translation
            translationInfo={{
              toLang: O.toLang.language,
              fromLang: O.fromLang.language,
              originalText: O.originalText,
              translatedText: O.translatedText,
            }}
            leftAccessory={
              <TranslationDeleteBin
                size={30}
                translationId={O.id}
                onSelect={() => {
                  var translations = [...savedTranslations];
                  
                  var index = translations.findIndex((value) => {
                    return value.id === O.id;
                  });
                  if (index !== -1) {
                    translations.splice(index, 1);
                    setSavedTranslations(translations);
                  }
                }}
              />
            }
          />
        </div>
      ))}
      show={show}
    />
  );
};
