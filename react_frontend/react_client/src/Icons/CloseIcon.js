import { ImCross } from "react-icons/im";

export const CloseIcon = ({onSelect, size}) => {


const onIconSelect = () => {
  if (typeof onSelect == 'function') { 
    onSelect(); 
  }
  
}

  return <div style={{"display":"flex", "alignSelf":"center"}} onClick={(e) =>{
    e.stopPropagation(); 
    onIconSelect()}}><ImCross size={size} /></div>;
};