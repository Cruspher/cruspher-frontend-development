import {axiosAuthorized} from "../../axios";
import {APIRoutes} from "../../const/API-routes";

export const getTrophiesRequest = async (page) => {
  let trophies = null

  try {
    const data = await axiosAuthorized.get(
      process.env.REACT_APP_API_URL + APIRoutes.trophy_getTrophies + page
    )

    trophies = data.data.response
  } catch (error) {
    console.warn(error)
  }
  return trophies
}

export const addTrophyRequest = async (formData) => {
  let trophy = null

  try {
    const data = await axiosAuthorized.post(
      process.env.REACT_APP_API_URL + APIRoutes.trophy_addTrophy,
      formData
    )

    trophy = data
  } catch (error) {
    console.warn(error)
  }

  return trophy
}

export const editTrophyRequest = async (formData) => {
  let trophy = null

  try {
    const data = await axiosAuthorized.post(
      process.env.REACT_APP_API_URL + APIRoutes.trophy_editTrophy,
      formData
    )

    trophy = data
  } catch (error) {
    console.warn(error)
  }

  return trophy
}

export const getTrophyRequest = async (id) => {
  let trophy = null

  try {
    const data = await axiosAuthorized.get(
      process.env.REACT_APP_API_URL + APIRoutes.trophy_getTrophy + id
    )

    trophy = data.data.response
  } catch (error) {
    console.warn(error)
  }

  return trophy
}