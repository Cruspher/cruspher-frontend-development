import {axiosAuthorized} from "../../axios";
import {APIRoutes} from "../../const/API-routes";

export const addNewsRequest = async (formData) => {
  let addedNews = null

  try {
    const data = await axiosAuthorized.post(
      process.env.REACT_APP_API_URL
      + APIRoutes.news_addNews,
      formData
    )

    addedNews = data.data.response
  } catch (error) {
    console.warn(error)
  }

  return addedNews
}

export const editNewsRequest = async (formData) => {
  let news = null

  try {
    const data = await axiosAuthorized.patch(
      process.env.REACT_APP_API_URL
      + APIRoutes.news_editNews,
      formData
    )

    news = data.data.response
  } catch (error) {
    console.warn(error)
  }

  return news
}

export const removeNewsRequest = async (id) => {
  let removedNews = null

  try {
    const data = await axiosAuthorized.delete(
      process.env.REACT_APP_API_URL
      + APIRoutes.news_removeNews,
      {
        data: {
          newsId: id * 1
        }
      },
      {}
    )

    removedNews = data.data.response
  } catch (error) {
    console.warn(error)
  }

  return removedNews
}

export const getNewsRequest = async ({page, languageId}) => {
  let news = null

  try {
    const data = await axiosAuthorized.post(
      process.env.REACT_APP_API_URL + APIRoutes.news_getNews,
      {
        page: page,
        userLanguage: languageId
      }
    )
    news = data.data.response
  } catch (error) {
    console.warn(error)
  }

  return news
}

export const getOneNewsRequest = async ({newsId, languageId}) => {
  let news = null

  try {
    const data = await axiosAuthorized.post(
      process.env.REACT_APP_API_URL + APIRoutes.news_getOneNews,
      {
        newsId: newsId,
        userLanguage: languageId
      }
    )
    news = data.data.response
  } catch (error) {
    console.warn(error)
  }

  return news
}

export const getNewsAdminRequest = async (id) => {
  let news = null

  try {
    const data = await axiosAuthorized.get(
      process.env.REACT_APP_API_URL + APIRoutes.news_getNewsAdmin + id
    )

    news = data.data.response
  } catch (error) {
    console.warn(error)
  }

  return news
}

export const addNewsEmotionRequest = async ({newsId, userId, emotion}) => {
  let news = null

  try {
    const data = await axiosAuthorized.post(
      process.env.REACT_APP_API_URL
      + APIRoutes.news_addNewsEmotion, {
        newsId: newsId,
        userId: userId,
        emotion: emotion
      }
    )

    news = data.data.response
  } catch (error) {
    console.warn(error)
  }

  return news
}

export const getNewsLanguagesRequest = async () => {
  let news = null

  try {
    const data = await axiosAuthorized.get(
      process.env.REACT_APP_API_URL + APIRoutes.newsLanguage_getLanguages
    )

    news = data.data.response
  } catch (error) {
    console.warn(error)
  }

  return news
}

export const addNewsLanguagesRequest = async (name) => {
  let language = null

  try {
    const data = await axiosAuthorized.post(
      process.env.REACT_APP_API_URL
      + APIRoutes.newsLanguage_addLanguage,
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

export const setNewsDefaultLanguagesRequest = async (id) => {
  let language = null

  try {
    const data = await axiosAuthorized.post(
      process.env.REACT_APP_API_URL
      + APIRoutes.newsLanguage_setDefaultLanguage,
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

export const editNewsLanguagesRequest = async ({languageId, name}) => {
  let language = null

  try {
    const data = await axiosAuthorized.post(
      process.env.REACT_APP_API_URL
      + APIRoutes.newsLanguage_editNewsLanguage,
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

