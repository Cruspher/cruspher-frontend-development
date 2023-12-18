

export const useForumLanguage = () => {
  const setForumLanguage = (language) => {
    localStorage.setItem("forumLanguage", language);
  };

  const getForumLanguage = () => {
    const chosenLanguage = localStorage.getItem("forumLanguage")
      ? localStorage.getItem("forumLanguage")
      : null

    return chosenLanguage
  };

  return { getForumLanguage, setForumLanguage };
};
