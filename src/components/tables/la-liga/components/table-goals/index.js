import React from 'react'
import c from './style.module.scss'

const TableGoals = ({value, isSimple}) => {
  const spanClass = isSimple ? `${c.span} ${c.spanSimple}` : value > -1 ? `${c.span} ${c.spanTrue}` : `${c.span} ${c.spanFalse}`


  return (
    <span className={spanClass}>
      {value}
    </span>
  )
}


export {
  TableGoals
}