

export const useNewsLanguage = () => {
  const setNewsLanguage = (language) => {
    localStorage.setItem("newsLanguage", language);
  };

  const getNewsLanguage = () => {
    const chosenLanguage = localStorage.getItem("newsLanguage")
      ? localStorage.getItem("newsLanguage")
      : null

    return chosenLanguage
  };

  return { setNewsLanguage, getNewsLanguage };
};
