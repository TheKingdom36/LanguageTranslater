import { CloseCross } from "./CloseCross";
import "../css/App.css";

export const SidePanelList = ({ show, title, content, onClose }) => {
  const close = () => {
    if (onClose !== undefined) {
      onClose();
    }
  };

  if (show) {
    return (
      <div className="sidePanel">
        <div className="sidePanel_topTray">
        <div className="sidePanel_title">{title}</div>
          <div className="sidePanel_CloseButton">
            <CloseCross onSelect={close} size={30} />
          </div>
         
        </div>

        <div className="scrollVert topBorder">{content}</div>
      </div>
    );
  }
  return null;
};
