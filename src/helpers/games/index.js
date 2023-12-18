import {FORMATIONS_DATA, GAME_GRID_DATA} from "../../data/formations.data";


export const updateGameGridValuesHelper = (form) => {
  const keys = Object.keys(form)

  keys.forEach((key) => {
    form[key].row = GAME_GRID_DATA[key].row
    form[key].column = GAME_GRID_DATA[key].column
  })


  return form
}

export const gameRoleToPositionHelper = (role) => {
  if (role === 'gk') return 'goalkeeper'

  if (
    role === 'ld' ||
    role === 'lcd' ||
    role === 'cd' ||
    role === 'rcd' ||
    role === 'rd'
  ) return 'defender'

  if (
    role === 'sm' ||
    role === 'lsm' ||
    role === 'rsm' ||
    role === 'lm' ||
    role === 'lcm' ||
    role === 'cm' ||
    role === 'rcm' ||
    role === 'rm' ||
    role === 'lam' ||
    role === 'am' ||
    role === 'ram'
  ) return 'midfielder'

  if (
    role === 'lfa' ||
    role === 'rfa' ||
    role === 'rca' ||
    role === 'lca' ||
    role === 'ca'
  ) return 'attacker'
}

export const updateGameDataToFormHelper = (values, players) => {

  const newData = {
    shots: [values.shots],
    successShots: [values.successShots],
    passes: [values.passes],
    successPasses: [values.successPasses],
    ballAccuracy: [values.ballAccuracy],
    dribbles: [values.dribbles],
    successDribbles: [values.successDribbles]
  }

  const playersObj = {}
  const newForm = {}
  const newCaptainsForm = {}


  players.forEach(player => {
    playersObj[player.id] = player
  })

  values.ratesLineups.forEach(item => {
    newForm[item.role] = {
      name: playersObj[item.id].name,
      surname: playersObj[item.id].surname,
      position: playersObj[item.id].position.toLowerCase(),
      number: playersObj[item.id].number,
      avatar: playersObj[item.id].image,
      role: item.role,
      id: playersObj[item.id].id
    }
  })


  values.ratesCaptains.forEach(item => {
    newCaptainsForm[item.position.toLowerCase()] = item.id
  })

  const formationValue = FORMATIONS_DATA.filter((item) => item.name === values.formation)

  return {
    newData,
    newForm: updateGameGridValuesHelper(newForm),
    newCaptainsForm,
    formation: formationValue[0]
  }
}