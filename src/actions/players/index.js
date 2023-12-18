import {axiosAuthorized} from "../../axios";
import {APIRoutes} from "../../const/API-routes";

export const getPlayerByIdRequest = async (id) => {
  let player = null

  try {
    const playerData = await axiosAuthorized.get(process.env.REACT_APP_API_URL + APIRoutes.player_getPlayerById + id)

    player = playerData.data.response
  } catch (error) {
    console.warn(error)
  }
  return player
}

export const getPlayersInClubRequest = async ({userId, page}) => {
  let players = null

  try {
    const playerData = await axiosAuthorized.post(
      process.env.REACT_APP_API_URL + APIRoutes.player_getPlayersInClub,
      {userId, page}
    )

    players = playerData.data.response
  } catch (error) {
    console.warn(error)
  }

  return players
}

export const getAllPlayersRequest = async ({userId, page}) => {
  let players = null

  try {
    const {data} = await axiosAuthorized.post(
      process.env.REACT_APP_API_URL + APIRoutes.player_getPlayers,
      {userId, page}
    )

    players = data.response
  } catch (error) {
    console.warn(error)
  }

  return players
}

export const editPlayerRequest = async (formData) => {
  let player = null

  try {
    const {data} = await axiosAuthorized.patch(process.env.REACT_APP_API_URL + APIRoutes.player_editPlayer, formData)

    player = data.response
  } catch (error) {
    console.warn(error)
  }

  return player
}

export const addPlayerRequest = async (formData) => {
  let player = null

  try {
    const {data} = await axiosAuthorized.post(process.env.REACT_APP_API_URL + APIRoutes.player_addPlayer, formData)

    player = data.response
  } catch (error) {
    console.warn(error)
  }

  return player
}

export const editPlayerStatusRequest = async (values) => {
  let player = null

  try {
    const {data} = await axiosAuthorized.patch(process.env.REACT_APP_API_URL + APIRoutes.player_editIsInClub, {
      playerId: values.playerId,
      isInClub: values.isInClub
    })

    player = data.response
  } catch (error) {
    console.warn(error)
  }

  return player
}

export const updatePlayersRequest = async () => {
  let player = null

  try {
    const {data} = await axiosAuthorized.get(process.env.REACT_APP_API_URL + APIRoutes.player_updatePlayers)

    player = data.response
  } catch (error) {
    console.warn(error)
  }

  return player
}
