import { deleteSavedTranslation, saveTranslation } from "../apis/LanguageTranslatorAPI";
import { StarIcon } from "../Icons/StarIcon";

export const TranslationSaveStar = ({ translationId,size,selected=false }) => {

  const addTranslationToSaved = () => {
    saveTranslation(translationId);
    
  };

  const removeTranslationFromSaved = () => {
    deleteSavedTranslation(translationId);
  };

  return (
    <StarIcon
    size={size}
      onSelect={addTranslationToSaved}
      onDeselect={removeTranslationFromSaved}
      selected={selected}
    />
  );
};
