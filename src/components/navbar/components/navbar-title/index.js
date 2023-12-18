import React from 'react'
import c from './style.module.scss'


const NavbarTitle = () => {

  return (
    <h2 className={c.title}>
      <img className={c.image} alt='alt' src={process.env.REACT_APP_TEAM_ICON} />
        {process.env.REACT_APP_TEAM_NAME}
    </h2>
  )
}

export {
  NavbarTitle
}