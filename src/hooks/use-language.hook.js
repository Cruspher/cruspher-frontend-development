import {LOCALES} from "../I18n/locales";


export const useLanguage = () => {
  const setLanguage = (language) => {
    localStorage.setItem("language", language);
  };

  const getLanguage = () => {
    const chosenLanguage = localStorage.getItem("language")
      ? localStorage.getItem("language")
      : LOCALES.ENGLISH

    return chosenLanguage
  };

  return { getLanguage, setLanguage };
};
