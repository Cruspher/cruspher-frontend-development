import React from 'react'
import c from './style.module.scss'
import {ClubStatsMyChart} from "../club-stats-my-chart";


const ClubStatsWrap = ({title, dataValue}) => {
  const data = Object.values(dataValue)

  let total = 0;
  data.forEach(item => {
    total += item.value
  })
  const proc = 100 / total
  const colorProc = 1 / data.length



  return (
    <div className={c.wrap}>
      <div className={c.header}>
        <h4>{title}</h4>
      </div>
      <div className={c.container}>
        {
          data.map((item,index) => (
            <ClubStatsMyChart key={Math.random()} proc={proc} item={item} index={index} colorProc={colorProc} />
          ))
        }
      </div>
    </div>
  )
}

export {
  ClubStatsWrap
}