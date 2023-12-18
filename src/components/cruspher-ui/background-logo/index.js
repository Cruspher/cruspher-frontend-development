import React from "react";
import c from './style.module.scss'


const BackgroundLogo = () => {

  return  (
    <div className={c.container}>
      <img alt='background' className={c.image} src={process.env.REACT_APP_TEAM_ICON} />
      {/* <img alt='background' className={c.image} src='/cruspher-logo.webp' /> */}
      <h2 className={c.title}>{process.env.REACT_APP_TEAM_NAME}</h2>
    </div>
  )
}


export {
  BackgroundLogo
}
