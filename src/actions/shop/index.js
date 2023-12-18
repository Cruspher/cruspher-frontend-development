import {axiosAuthorized} from "../../axios";
import {APIRoutes} from "../../const/API-routes";


export const addShopElementRequest = async (formData) => {
  let savedElement = null

  try {
    const data = await axiosAuthorized.post(
      process.env.REACT_APP_API_URL
      + APIRoutes.shopElement_addShopElement,
      formData
    )

    savedElement = data.data.response
  } catch (error) {
    console.warn(error)
  }

  return savedElement
}


export const editShopElementRequest = async (formData) => {
  let savedElement = null

  try {
    const data = await axiosAuthorized.post(
      process.env.REACT_APP_API_URL
      + APIRoutes.shopElement_editShopElement,
      formData
    )

    savedElement = data.data.response
  } catch (error) {
    console.warn(error)
  }

  return savedElement
}

export const getShopElementByIdRequest = async (id) => {
  let element = null

  try {
    const data = await axiosAuthorized.get(
      process.env.REACT_APP_API_URL
      + APIRoutes.shopElement_getShopElementById + id
    )

    element = data.data.response
  } catch (error) {
    console.warn(error)
  }

  return element
}

export const getShopElements = async ({page, type, isInShop}) => {
  let elements = null

  try {
    const data = await axiosAuthorized.post(
      process.env.REACT_APP_API_URL
      + APIRoutes.shopElement_getShopElements,
      {
        page: page,
        type: type,
        isInShop: isInShop
      }
    )

    elements = data.data.response
  } catch (error) {
    console.warn(error)
  }

  return elements
}

export const getShopElementsForUserRequest = async ({page, type}) => {
  let elements = null

  try {
    const data = await axiosAuthorized.post(
      process.env.REACT_APP_API_URL
      + APIRoutes.shopElement_getShopElementsForUser,
      {
        page: page,
        type: type,
      }
    )

    elements = data.data.response
  } catch (error) {
    console.warn(error)
  }

  return elements
}

export const setShopElementDefaultRequest = async (elementId) => {
  let elements = null

  try {
    const data = await axiosAuthorized.post(
      process.env.REACT_APP_API_URL
      + APIRoutes.shopElement_setShopElementDefault,
      {
        elementId: elementId,
      }
    )

    elements = data.data.response
  } catch (error) {
    console.warn(error)
  }

  return elements
}

export const buyShopElementRequest = async ({elementId, userId}) => {
  let result = null

  try {
    const data = await axiosAuthorized.post(
      process.env.REACT_APP_API_URL
      + APIRoutes.shopElement_buyElement,
      {
        elementId: elementId,
        userId: userId
      }
    )

    result = data.data.response
  } catch (error) {
    console.warn(error)
  }

  return result
}

export const getUserElementsRequest = async ({type, userId}) => {
  let elements = null

  try {
    const data = await axiosAuthorized.post(
      process.env.REACT_APP_API_URL
      + APIRoutes.shopElement_getUserElements,
      {
        type: type,
        userId
      }
    )

    elements = data.data.response
  } catch (error) {
    console.warn(error)
  }

  return elements
}

export const getBoxElementsRequest = async ({page}) => {
  let elements = null

  try {
    const data = await axiosAuthorized.get(
      process.env.REACT_APP_API_URL
      + APIRoutes.shopElement_getBoxElements + page
    )

    elements = data.data.response
  } catch (error) {
    console.warn(error)
  }

  return elements
}

export const setUserElementDefault = async ({elementId, userId}) => {
  let isOk = null

  try {
    const data = await axiosAuthorized.post(
      process.env.REACT_APP_API_URL
      + APIRoutes.shopElement_setUserElementDefault,
      {
        elementId: elementId,
        userId
      }
    )

    isOk = data.data.response
  } catch (error) {
    console.warn(error)
  }

  return isOk
}

export const openUserBoxRequest = async ({userId}) => {
  let isOk = null

  try {
    const data = await axiosAuthorized.post(
      process.env.REACT_APP_API_URL
      + APIRoutes.shopElement_openUserBox,
      {
        userId
      }
    )

    isOk = data.data.response
  } catch (error) {
    console.warn(error)
  }

  return isOk
}


export const buyUserBoxRequest = async ({userId}) => {
  let isOk = null

  try {
    const data = await axiosAuthorized.post(
      process.env.REACT_APP_API_URL
      + APIRoutes.shopElement_buyUserBox,
      {
        userId
      }
    )

    isOk = data.data.response
  } catch (error) {
    console.warn(error)
  }

  return isOk
}