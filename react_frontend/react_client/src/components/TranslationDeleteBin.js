import { DeleteIcon } from "../Icons/DeleteIcon";
import { deleteSavedTranslation } from "../apis/LanguageTranslatorAPI";

export const TranslationDeleteBin = ({ translationId , size,onSelect }) => {

  return <DeleteIcon size ={size} onSelect={()=> {
    
    if(onSelect !== undefined){
      onSelect()
    }

    deleteSavedTranslation(translationId)}} />;
};
