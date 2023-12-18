import {axiosAuthorized} from "../../axios";
import {APIRoutes} from "../../const/API-routes";

export const addFormRequest = async (formData) => {
  let savedForm = null

  try {
    const data = await axiosAuthorized.post(
      process.env.REACT_APP_API_URL
      + APIRoutes.playersForm_addForm,
      formData
    )

    savedForm = data.data.response
  } catch (error) {
    console.warn(error)
  }

  return savedForm
}

export const getFormsRequest = async () => {
  let forms = null

  try {
    const data = await axiosAuthorized.get(
      process.env.REACT_APP_API_URL
      + APIRoutes.playersForm_getForms,
    )

    forms = data.data.response
  } catch (error) {
    console.warn(error)
  }

  return forms
}

