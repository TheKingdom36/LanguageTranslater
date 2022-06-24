import { ImBin2 } from "react-icons/im";

export const DeleteIcon = ({onSelect, size}) => {


const onIconSelect = () => {
  if (typeof onSelect == 'function') { 
    onSelect(); 
  }
  
}

  return <div onClick={(e) =>{
    e.stopPropagation(); 
    onIconSelect()}}><ImBin2 size={size} /></div>;
};
