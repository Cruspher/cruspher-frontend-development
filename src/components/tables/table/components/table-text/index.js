import React from 'react'
import c from './style.module.scss'


const TableText = ({text}) => {

  return <span className={c.text}>
    {text}
  </span>
}


export {
  TableText
}