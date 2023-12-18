import React from 'react'
import c from './style.module.scss'


const ClubStatsField = ({title, value, isTransparent, isBad, isGood}) => {
  const wrapClass = isTransparent ? c.wrap : `${c.wrap} ${c.wrapColor}`
  const valueClass = isBad ? c.bad : isGood ? c.good : c.default

  return (
    <div className={wrapClass}>
      <h3 className={c.title}>{title}</h3>

      <span className={`${c.value} ${valueClass}`}>{value}</span>
    </div>
  )
}

export {
  ClubStatsField
}