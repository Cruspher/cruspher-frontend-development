

export const usePlayersForm = () => {
  const setPlayersForm = (formId) => {
    localStorage.setItem("playersFormId", formId);
    window.location.reload();
  };

  const getPlayerForm = () => {
    const chosenPlayersForm = localStorage.getItem("playersFormId")
      ? localStorage.getItem("playersFormId")
      : (1)


    return chosenPlayersForm
  };

  return { getPlayerForm, setPlayersForm };
};
