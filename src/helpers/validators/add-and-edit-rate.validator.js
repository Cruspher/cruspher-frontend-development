const addAndEditRateValidator = ({stats, captains, lineup}) => {
  let error = false

  if (lineup.length !== 11) {
    error = 'error with lineup'
  }


  lineup.forEach(item => {
    if (!item.playerId) {
      error = 'error with lineup'
    }
  })

  captains.forEach(item => {
    if (!item.playerId) {
      error = 'error with captain'
    }
  })

  Object.keys(stats).forEach(key => {
    if (!stats[key]) {
      error = 'error with stats'
    }
  })

  return error
}

export {
  addAndEditRateValidator
}