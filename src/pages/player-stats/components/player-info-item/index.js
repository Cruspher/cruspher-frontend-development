import React from 'react'
import c from './style.module.scss'


const PlayerInfoItem = ({title, value, isWhite}) => {
  const valueClass = !isWhite ? c.value : `${c.value} ${c.white}`

  return (
    <div className={c.wrap}>
      <h3 className={c.title}>
        {title}
      </h3>
      <div className={valueClass}>
        {value}
      </div>
    </div>
  )
}


export {
  PlayerInfoItem
}