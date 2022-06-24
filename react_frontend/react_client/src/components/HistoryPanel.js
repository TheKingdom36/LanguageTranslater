import { SidePanelList } from "./SidePanelList";
import { Translation } from "./Translation";
import { TranslationSaveStar } from "./TranslationSaveStar"


export const HistoryPanel = ({ show, onTranslationSelect,pastTranslations,savedTranslations, onClose }) => {
  

  const checkIfSelected = (O) => {

    return (
      savedTranslations.findIndex(
        (element) =>
          element.originalText === O.originalText &&
          element.translatedText === O.translatedText
      ) !== -1
    );
  };


  return (<SidePanelList
    title={"History"}
    onClose={onClose}
    content={pastTranslations.map((O) => (
      <div onClick={() => onTranslationSelect(O)}>
        <Translation
          translationInfo={{
            toLang: O.toLang.language,
            fromLang: O.fromLang.language,
            originalText: O.originalText,
            translatedText: O.translatedText,
          }}
          leftAccessory={
            <TranslationSaveStar
              size={30}
              translationId={O.id}
              selected={() => checkIfSelected(O)}
            />
          }
        />
      </div>
    ))}
    show={show}
  />);
};
