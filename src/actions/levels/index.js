import {axiosAuthorized} from "../../axios";
import {APIRoutes} from "../../const/API-routes";

export const getLevelsRequest = async () => {
  let levels = null

  try {
    const data = await axiosAuthorized.get(
      process.env.REACT_APP_API_URL
      + APIRoutes.userLevel_getLevels
    )

    levels = data.data.response
  } catch (error) {
    console.warn(error)
  }

  return levels
}