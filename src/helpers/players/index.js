export const getPositionHelper = (position) => {
  if (position === 'defender') return {
    value: 'defender',
    title: 'Защитник'
  }

  if (position === 'midfielder') return {
    value: 'midfielder',
    title: 'Полузащитник'
  }

  if (position === 'forward') return {
    value: 'forward',
    title: 'Нападающий'
  }

  return {
    value: '',
    title: ''
  }
}


export const sortByRating = (players) => {
  return players.sort((a, b) => {
    if (a.statistics.rating > b.statistics.rating) {
      return -1;
    }
    if (a.statistics.rating < b.statistics.rating) {
      return 1;
    }

    return 0;
  });
}

export const sortTopByKey = (players, key) => {



  const newValues = players.map(player => {
    return {
      name: player.name,
      surname: player.surname,
      [key]: player[key]
    }
  })

  const sortedPlayers = newValues.sort((a, b) => {
    if (a[key] > b[key]) {
      return -1;
    }
    if (a[key] < b[key]) {
      return 1;
    }

    return 0;
  });

  return sortedPlayers
}