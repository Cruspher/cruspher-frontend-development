import {axiosAuthorized} from "../../axios";
import {APIRoutes} from "../../const/API-routes";

export const getSocialsRequest = async () => {
  let socials = null

  try {
    const {data} = await axiosAuthorized.get(process.env.REACT_APP_API_URL + APIRoutes.social_getSocials)

    socials = data.response
  } catch (error) {
    console.warn(error)
  }
  return socials
}

export const addSocialsRequest = async (newSocials) => {
  let socials = null

  try {
    const {data} = await axiosAuthorized.post(process.env.REACT_APP_API_URL + APIRoutes.social_createSocials, {
      socials: newSocials
    })

    socials = data.response
  } catch (error) {
    console.warn(error)
  }

  return socials
}

