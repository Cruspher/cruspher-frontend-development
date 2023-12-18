import React from 'react'
import c from './style.module.scss'
import {FinalRateStatsItem} from "../final-rate-stats-item";


const FinalRateStats = ({statsResult}) => {
  console.log(statsResult, 'statsResult')

  return (
    <div className={c.wrap}>
      <div className={c.container}>
        {
          Object.keys(statsResult).map(key => (
            <FinalRateStatsItem
              key={Math.random().toString()}
              title={statsResult[key].title}
              maxSize={Math.max(statsResult[key].rateValue, statsResult[key].gameValue)}
              rateValue={statsResult[key].rateValue}
              gameValue={statsResult[key].gameValue}
              zone1={statsResult[key].zone1}
              zone2={statsResult[key].zone2}
              zone3={statsResult[key].zone3}
            />
          ))
        }

      </div>
    </div>
  )
}


export {
  FinalRateStats
}