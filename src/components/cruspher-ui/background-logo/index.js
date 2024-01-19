import React from "react";
import c from './style.module.scss'


const BackgroundLogo = () => {

  return  (
    <div className={c.container}>
      <img alt='background' className={c.image} src={process.env.REACT_APP_TEAM_ICON} />
    </div>
  )
}


export {
  BackgroundLogo
}
