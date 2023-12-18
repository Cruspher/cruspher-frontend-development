import React from 'react'
import c from './style.module.scss'
import {StatsCaptainsItem} from "../stats-captains-item";


const StatsCaptains = ({captains, shopElements}) => {

  return (
    <div className={c.wrap}>
      <StatsCaptainsItem shopElements={shopElements}  title='defender' player={captains.defender} />
      <StatsCaptainsItem shopElements={shopElements} title='midfielder' player={captains.midfielder} />
      <StatsCaptainsItem shopElements={shopElements} title='attacker' player={captains.attacker} />
    </div>
  )
}

export {
  StatsCaptains
}