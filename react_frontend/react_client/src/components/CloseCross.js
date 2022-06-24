import { CloseIcon } from "../Icons/CloseIcon";

export const CloseCross = ({ size,onSelect }) => {

  return <CloseIcon size ={size} onSelect={()=> {
    
    if(onSelect !== undefined){
      onSelect()
    }

  }} />;
};