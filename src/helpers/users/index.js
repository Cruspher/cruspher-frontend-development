export const getStatusByExp = (exp) => {
  if (exp >= 0 && exp <= 40 ) {
    return 'beginner'
  }

  else if (exp > 40 && exp <= 120 ) {
    return 'experienced'
  }

  else if (exp > 120 && exp <= 240 ) {
    return 'butcher'
  }

  else if (exp > 240 && exp <= 400 ) {
    return 'veteran'
  }

  else if (exp > 400 && exp <= 600 ) {
    return 'fan'
  }

  else if (exp > 600 && exp <= 840 ) {
    return 'ultras'
  }

  else if (exp > 840 && exp <= 1120 ) {
    return 'warrior'
  }

  else if (exp > 1120 && exp <= 1460 ) {
    return 'cyborg'
  }

  else if (exp > 1460 && exp <= 1860 ) {
    return 'leader'
  }

  else if (exp > 1860 && exp <= 2300 ) {
    return 'gladiator'
  }

  else if (exp > 2300 && exp <= 2780 ) {
    return 'profi'
  }

  else if (exp > 2780 && exp <= 3300 ) {
    return 'expert'
  }

  else if (exp > 3300 && exp <= 3860 ) {
    return 'guru'
  }

  else if (exp > 3860 && exp <= 4460 ) {
    return 'sensei'
  }

  else if (exp > 4460 ) {
    return 'socios'
  }
}