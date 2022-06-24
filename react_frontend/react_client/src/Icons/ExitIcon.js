import { IoIosLogOut } from "react-icons/io";

export const ExitIcon = ({ onSelect, size }) => {
  const onIconSelect = () => {
    if (typeof onSelect == "function") {
      onSelect();
    }
  };

  return (
    <div
      style={{ display: "flex", alignSelf: "center" }}
      onClick={(e) => {
        e.stopPropagation();
        onIconSelect();
      }}
    >
      <IoIosLogOut color="white" size={size} />
    </div>
  );
};
