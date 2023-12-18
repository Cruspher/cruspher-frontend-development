import React from 'react'
import c from './style.module.scss'
import moment from "moment";

const DateView = ({date, format}) => {
  const dateFormat = format ? format : 'DD/MM/YYYY'

  return (
    <span className={c.item}>
      {moment(date).format(dateFormat)}
    </span>
  )
}


export {
  DateView
}