import {axiosAuthorized} from "../../axios";
import {APIRoutes} from "../../const/API-routes";

export const getLaLigaTableRequest = async () => {
  let table = null

  try {
    const {data} = await axiosAuthorized.get(process.env.REACT_APP_API_URL + APIRoutes.table_getLaLigaTableAll)


    table = data.response
  } catch (error) {
    console.warn(error)
  }
  return table
}


export const updateTableRequest = async () => {
  let table = null

  try {
    const {data} = await axiosAuthorized.get(process.env.REACT_APP_API_URL + APIRoutes.table_updateTable)


    table = data.response
  } catch (error) {
    console.warn(error)
  }
  return table
}

