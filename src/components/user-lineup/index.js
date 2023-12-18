import React from 'react'
import c from './style.module.scss'
import {UserLineupArea} from "./components/user-lineup-area";


const UserLineup = (
  {
    shopElements
  }
) => {


  return (
    <div className={c.areaWrap}>
      <UserLineupArea
        shopElements={shopElements}
      />
    </div>
  )
}


export {
  UserLineup
}