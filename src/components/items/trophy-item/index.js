import React from 'react'
import c from './style.module.scss'
import moment from "moment";


const TrophyItem = ({item, submit}) => {

  const submitHandler = () => {
    if (!submit) return

    submit(item)
  }

  return (
    <div className={c.wrap} onClick={submitHandler}>
      <div className={c.info}>
        <span>
          {item.coach}
        </span>

        <span>
          {moment(item.date).format('yyyy')}
        </span>
      </div>

      <img alt="" className={c.image} src={process.env.REACT_APP_API_URL + item.image} />
      <div className={c.title}>{item.title}</div>
    </div>
  )
}


export {
  TrophyItem
}