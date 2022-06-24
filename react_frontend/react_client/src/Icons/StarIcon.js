import { useState } from "react";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";

export const StarIcon = ({ selected, size, onSelect,onDeselect }) => {

const [isSelected,setIsSelected] = useState(selected)


const onIconSelect = () => {

  setIsSelected(true)

  if (typeof onSelect == 'function') { 
    onSelect(); 
  }
  
}

const onIconDeselect = () =>{

  setIsSelected(false)
  if (typeof onDeselect == 'function') { 
    onDeselect(); 
  }
}

  if (isSelected === true || isSelected === undefined) {
    return <div onClick={(e)=>{
      e.stopPropagation(); 
      onIconDeselect()}}><AiFillStar size={size} /></div>;
  }

  return <div onClick={(e) =>{
    e.stopPropagation(); 
    onIconSelect()}}><AiOutlineStar size={size} /></div>;
};
