const checkGameWithStatsAndRatingsValidator = ({stats, ratings, lineup}) => {
  let error = false

  if (Object.keys(lineup).length !== 11) {
    error = 'error with lineup'
  }

  Object.keys(lineup).forEach(key => {
    if (!lineup[key].id) {
      error = 'error with lineup'
    }
  })

  return error
}

export {
  checkGameWithStatsAndRatingsValidator
}