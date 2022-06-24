import { useState } from "react";

export const Translation = ({
  translationInfo,
  leftAccessory,
  rightAccessory,
}) => {
  const [hover, setHover] = useState(false);

  const style = hover ? "translation hoverColor" : "translation";

  return (
    <div
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      className={style}
    >
      <div className="translation-header">
        {rightAccessory}
        <div className="translation-languages">
          {translationInfo.fromLang}
          {"->"}
          {translationInfo.toLang}
        </div>
        <div className="leftAccessory">{leftAccessory}</div>
      </div>

      <div className="flex column translation-texts">
        <div className="translation-orginal-text">
          <div>{translationInfo.originalText}</div>
        </div>
        <div className="translation-translated-text">
          {translationInfo.translatedText}
        </div>
      </div>
    </div>
  );
};
