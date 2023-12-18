import React from 'react'
import c from './style.module.scss'


const ClubStatsMyChart = ({item, index, colorProc, proc}) => {

  return (
    <div
      className={c.item}
      style={{
        color: item.color,
        width: `${item.value * proc}%`,
        backgroundColor: `rgba(40, 153, 28, ${colorProc * (index + 1)}`
      }}
    >
      {item.name}
    </div>
  )
}


export {
  ClubStatsMyChart
}