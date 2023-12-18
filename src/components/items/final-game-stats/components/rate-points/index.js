import React from 'react'
import c from './style.module.scss'


const RatePoints = ({lineup,stats,captains}) => {


  return (
    <div className={c.wrap}>
      <div>
         <div className={c.title}>L</div>

        <span className={c.text}>
          {lineup}
        </span>
      </div>

      <div>
        <div className={c.title}>S</div>
        <span className={c.text}>
          {stats}
        </span>
      </div>

      <div>
        <div className={c.title}>F</div>
        <span className={c.text}>
          {captains}
        </span>
      </div>

      <div>
        <div className={c.title}>T</div>
        <span className={c.text}>
           {(lineup + captains + stats).toFixed(1)}
        </span>
      </div>
    </div>
  )
}


export {
  RatePoints
}