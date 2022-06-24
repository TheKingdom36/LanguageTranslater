import "../css/App.css";
import React, { useEffect, useState } from "react";
import {
  fetchHistory,
  fetchSaved,
  getAvailableLanguages,
  getTranslation,
} from "../apis/LanguageTranslatorAPI";
import { LanguageSelection } from "../components/LanguageSelection";

import { HistoryPanel } from "../components/HistoryPanel";
import { SavedPanel } from "../components/SavedPanel";

import AppWrapper from "../components/AppWrapper";

function App() {
  const [inputText, setInputText] = useState("");
  const [translatedText, setTranslatedText] = useState("");
  const [availableLanguages, setAvailableLanguages] = useState([]);
  const [expandLangSelection, setExpandLangSelection] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [showSaved, setShowSaved] = useState(false);
  const [activeLangSelection, setActiveLangSelection] = useState("to");
  const [pastTranslations, setPastTranslations] = useState([]);
  const [savedTranslations, setSavedTranslations] = useState([]);

  const [fromLang, setFromLang] = useState({
    language: "Select",
    language_name: "Select",
  });
  const [toLang, setToLang] = useState({
    language: "Select",
    language_name: "Select",
  });
  const [languageOptions, setLanguageOptions] = useState([]);

  const triggerPopup = (text) => {
    alert(text);
  };

  const translate = async () => {


    if(inputText===""){
      triggerPopup("No text provided for translation");
      return;
    }

    if(fromLang.language === "Select" & toLang.language==="Select"){
      triggerPopup("Please ensure you select an input and output language");
      return;
    }

    var result;

    try {
      result = await getTranslation(
        inputText,
        fromLang.language,
        toLang.language
      );

      setTranslatedText(result.text);
    } catch (e) {
      triggerPopup("There was an issue with that model");
    }
  };

  const toggleHistory = async () => {
    setShowSaved(false);
    setShowHistory(!showHistory);
  };

  const toggleSaved = async () => {
    setShowHistory(false);
    setShowSaved(!showSaved);
  };

  useEffect(() => {
    getAvailableLanguages().then((response) => setAvailableLanguages(response)).catch((err)=>console.log(err));
    fetchHistory().then((response) => setPastTranslations(response)).catch((err)=>console.log(err));
    fetchSaved().then((response) => setSavedTranslations(response)).catch((err)=>console.log(err));
  }, [showHistory, showSaved]);

  function handleLanguageSelection(event) {
    const value = event.target.textContent;
    var lang = availableLanguages.find(
      (element) => element.language_name === value
    );
    if (activeLangSelection === "to") {
      setToLang(lang);
    } else {
      setFromLang(lang);
    }

    close();
    document.activeElement.blur();
  }

  function expand() {
    setExpandLangSelection(true);
  }

  function close() {
    setExpandLangSelection(false);
  }

  const availableSourceLanguages = availableLanguages
    .filter((element) => element.supported_as_source === true)
    .map((element) => {
      return element.language_name;
    });

  const availableTargetLanguages = availableLanguages
    .filter((element) => element.supported_as_target === true)
    .map((element) => {
      return element.language_name;
    });

  function toLangSelection() {
    setActiveLangSelection("to");
    setLanguageOptions(availableTargetLanguages);
    expand();
  }

  function fromLangSelection() {
    setActiveLangSelection("from");
    setLanguageOptions(availableSourceLanguages);
    expand();
  }

  const fillCurrentTranslation = (previousTranslation) => {
    setToLang(previousTranslation.toLang);
    setFromLang(previousTranslation.fromLang);
    setInputText(previousTranslation.originalText);
    setTranslatedText(previousTranslation.translatedText);
  };

  function LanguageBoxs() {
    let fromLangSelectionStyle = "tenPad";
    let toLangSelectionStyle = "tenPad";

    if (expandLangSelection === true) {
      if (activeLangSelection === "to") {
        toLangSelectionStyle = toLangSelectionStyle + " highlight";
      } else {
        fromLangSelectionStyle = fromLangSelectionStyle + " highlight";
      }
    }

    if (expandLangSelection === false) {
      return (
        <div className="languageSection">
          <div className="langBoxs">
            <div className="langBox">
              <div className="langBoxHeader secondColor">
                <p className="tenPad">Input Language: </p>
                <p
                  className={fromLangSelectionStyle}
                  onClick={fromLangSelection}
                >
                  {fromLang.language_name + "↓"}
                </p>
              </div>
              <textarea
                className="textBox secondColor"
                value={inputText}
                onChange={(text) => {
                  setInputText(text.target.value);
                }}
              ></textarea>
            </div>

            <div className="langBox">
              <div className="langBoxHeader secondColor">
                <p className="tenPad">Output Language:</p>
                <p className={toLangSelectionStyle} onClick={toLangSelection}>
                  {toLang.language_name + "↓"}
                </p>
              </div>
              <textarea
                className="textBox secondColor"
                readOnly="true"
                value={translatedText}
              ></textarea>
            </div>
          </div>
        </div>
      );
    } else {
      return "";
    }
  }

  const LangBoxs = LanguageBoxs();

  function LangSelection() {
    return (
      <LanguageSelection
        expandSelection={expandLangSelection}
        options={languageOptions}
        onSelectLanguage={handleLanguageSelection}
        onClose={close}
      />
    );
  }

  return (
    <AppWrapper
      childern={
        <div className="App-body ">
          <div className="mainContent">
            <div className="mainDiv">
              <div className="flexRow">
                <LangSelection />
                {LangBoxs}
              </div>
            </div>

            <div className={"buttonGroup"}>
              <button className="button" onClick={toggleSaved}>
                Saved
              </button>

              <button className="button" onClick={translate}>
                Translate
              </button>

              <button className="button" onClick={toggleHistory}>
                History
              </button>
            </div>
          </div>
          <SavedPanel
            show={showSaved}
            onClose={() => setShowSaved(false)}
            onTranslationSelect={fillCurrentTranslation}
          />
          <HistoryPanel
            show={showHistory}
            onClose={() => setShowHistory(false)}
            pastTranslations={pastTranslations}
            savedTranslations={savedTranslations}
            onTranslationSelect={fillCurrentTranslation}
          />
        </div>
      }
    />
  );
}

export default App;
