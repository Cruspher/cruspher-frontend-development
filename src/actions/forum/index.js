import {axiosAuthorized} from "../../axios";
import {APIRoutes} from "../../const/API-routes";

export const getForumThemesRequest = async (values) => {
  let forumData = null

  try {
    const forumDataToAdd = await axiosAuthorized.post(
      process.env.REACT_APP_API_URL + APIRoutes.forumTheme_getThemes,
      {
        page: values.page,
        isConfirmed: values.isConfirmed,
        forumLanguageId: values.languageId,
        languageId: values.languageId
      }
      )

    forumData = forumDataToAdd.data.response
  } catch (error) {
    console.warn(error)
  }
  return forumData
}

export const getForumMessagesRequest = async ({themeId, page}) => {
  let forumData = null

  try {
    const forumDataToAdd = await axiosAuthorized.get(
      process.env.REACT_APP_API_URL + APIRoutes.forumMessage_getMessagesByTheme + `${themeId}/${page}`
    )

    forumData = forumDataToAdd.data.response
  } catch (error) {
    console.warn(error)
  }
  return forumData
}

export const addForumThemeRequest = async ({title, languageId}) => {
  let formNewMessage = null

  try {
    const forumDataToAdd = await axiosAuthorized.post(
      process.env.REACT_APP_API_URL + APIRoutes.forumTheme_addTheme,
      {
        title: title,
        forumLanguageId: languageId
      }
    )

    formNewMessage = forumDataToAdd.data.response
  } catch (error) {
    console.warn(error)
  }
  return formNewMessage
}

export const editForumThemeRequest = async (theme) => {
  let formEditedMessage = null

  try {
    const forumDataToAdd = await axiosAuthorized.patch(
      process.env.REACT_APP_API_URL + APIRoutes.forumTheme_editTheme,
      {
        title: theme.title,
        id: theme.id
      }
    )

    formEditedMessage = forumDataToAdd.data.response
  } catch (error) {
    console.warn(error)
  }
  return formEditedMessage
}

export const addThemeMessageRequest = async ({userId, themeId, message}) => {
  let messageValue = null

  try {
    const forumDataToAdd = await axiosAuthorized.post(
      process.env.REACT_APP_API_URL + APIRoutes.forumMessage_addThemeMessage,
      {
        themeId: themeId * 1,
        message: message,
        userId: userId
      }
    )

    messageValue = forumDataToAdd.data.response
  } catch (error) {
    console.warn(error)
    messageValue = null
  }

  return messageValue
}

export const removeThemeMessageRequest = async (id) => {
  let message

  try {
    const forumDataToAdd = await axiosAuthorized.delete(
      process.env.REACT_APP_API_URL + APIRoutes.forumMessage_removeMessage + id
    )

    message = forumDataToAdd.data.response
  } catch (error) {
    console.warn(error)
    message = null
  }
  return message
}

export const removeThemeRequest = async (id) => {
  let theme

  try {
    const forumDataToAdd = await axiosAuthorized.delete(
      process.env.REACT_APP_API_URL + APIRoutes.forumTheme_remove + id
    )

    theme = forumDataToAdd.data.response
  } catch (error) {
    console.warn(error)
    theme = null
  }

  return theme
}

export const confirmThemeRequest = async (values) => {
  let theme

  try {
    const forumDataToAdd = await axiosAuthorized.post(
      process.env.REACT_APP_API_URL + APIRoutes.forumTheme_confirmTheme,
      values
    )

    theme = forumDataToAdd.data.response
  } catch (error) {
    console.warn(error)
    theme = null
  }

  return theme
}

export const editThemeMessageRequest = async (values) => {
  let message

  try {
    const forumDataToAdd = await axiosAuthorized.patch(
      process.env.REACT_APP_API_URL + APIRoutes.forumMessage_editThemeMessage,
      {
        messageId: values.messageId,
        message: values.message
      }
    )

    message = forumDataToAdd.data.response
  } catch (error) {
    console.warn(error)
    message = null
  }
  return message
}

export const addMessageEmotionRequest = async (values) => {
  let emotion

  try {
    const forumDataToAdd = await axiosAuthorized.post(
      process.env.REACT_APP_API_URL + APIRoutes.forumMessage_addEmotion,
      {
        messageId: values.messageId,
        emotion: values.emotion,
        userId: values.userId
      }
    )

    emotion = forumDataToAdd.data.response
  } catch (error) {
    console.warn(error)
    emotion = null
  }
  return emotion
}

export const getForumLanguagesRequest = async () => {
  let languages = null

  try {
    const data = await axiosAuthorized.get(
      process.env.REACT_APP_API_URL
      + APIRoutes.forumLanguage_getLanguages
    )


    languages = data.data.response
  } catch (error) {
    console.warn(error)
  }

  return languages
}

export const addForumLanguagesRequest = async (name) => {
  let language = null

  try {
    const data = await axiosAuthorized.post(
      process.env.REACT_APP_API_URL
      + APIRoutes.forumLanguage_addLanguage,
      {
        name: name
      }
    )

    language = data.data.response
  } catch (error) {
    console.warn(error)
  }

  return language
}

export const setForumDefaultLanguagesRequest = async (id) => {
  let language = null

  try {
    const data = await axiosAuthorized.post(
      process.env.REACT_APP_API_URL
      + APIRoutes.forumLanguage_setDefaultLanguage,
      {
        languageId: id
      }
    )

    language = data.data.response
  } catch (error) {
    console.warn(error)
  }

  return language
}

export const editForumLanguagesRequest = async ({languageId, name}) => {
  let language = null

  try {
    const data = await axiosAuthorized.post(
      process.env.REACT_APP_API_URL
      + APIRoutes.forumLanguage_editForumLanguage,
      {
        languageId: languageId,
        name: name
      }
    )

    language = data.data.response
  } catch (error) {
    console.warn(error)
  }

  return language
}

export const addMessageReportRequest = async (id) => {
  let result = null

  try {
    const data = await axiosAuthorized.get(
      process.env.REACT_APP_API_URL
      + APIRoutes.forumMessage_addReport + id
    )

    result = data.data.response
  } catch (error) {
    console.warn(error)
  }

  return result
}

export const getMessageByReportRequest = async ({page, languageId}) => {
  let result = null

  try {
    const data = await axiosAuthorized.post(
      process.env.REACT_APP_API_URL
      + APIRoutes.forumMessage_getMessagesByReports,
      {
        page: page,
        languageId: languageId
      }
    )

    result = data.data.response
  } catch (error) {
    console.warn(error)
  }

  return result
}

export const clearForumMessageReportsRequest = async (id) => {
  let result = null

  try {
    const data = await axiosAuthorized.post(
      process.env.REACT_APP_API_URL
      + APIRoutes.forumMessage_clearReports + id
    )

    result = data.data.response
  } catch (error) {
    console.warn(error)
  }

  return result
}

