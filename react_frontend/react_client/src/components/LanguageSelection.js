export const LanguageSelection = ({options,expandSelection,onSelectLanguage,onClose}) => {


    const highlight = (event) => {
      event.target.style.background = "#e3dede";
      event.target.style.color = "black"
    };

    const unhighlight = (event) => {
      event.target.style.background = "";
      event.target.style.color = "white"

    };

    return (
      <div tabIndex={0} onBlur={onClose}>
        {expandSelection ? (
          <div className={"languageSection"}>
            {options.map((O) => (
              <div
                onMouseEnter={highlight}
                onMouseLeave={unhighlight}
                className={"languageOption"}
                onClick={onSelectLanguage}
              >
                {O}
              </div>
            ))}
          </div>
        ) : null}
      </div>
    );
  };