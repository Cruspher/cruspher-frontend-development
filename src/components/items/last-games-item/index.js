import React from 'react'
import {BsCheckLg, FaMinus} from "react-icons/all";
import c from './style.module.scss'

const getGamesItemColor = (result) => {
  if (result === 'W') {
    return <span className={`${c.container} ${c.containerWin}`}>
      <BsCheckLg className={c.icon} />
    </span>
  }
  if (result === 'L') {
    return <span className={`${c.container} ${c.containerLose}`}>
      <FaMinus className={c.icon} />
    </span>
  }

  return <span className={`${c.container} ${c.containerDraw}`} />
}

const LastGamesItem = ({team}) => {

  return (
    <div className={c.wrap}>
      {
        team.form && team.form.split('').map(result => (
          <div key={Math.random().toString()}>
            {getGamesItemColor(result)}
          </div>
        ))
      }
    </div>
  )
}


export {
  LastGamesItem
}
