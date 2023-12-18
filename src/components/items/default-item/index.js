import React from 'react'
import {DiRequirejs} from "react-icons/all";
import c from './style.module.scss'


const DefaultItem = ({item, submit}) => {
  const submitHandler = () => {
    if (item.isDefault) return
    submit(item.id)
  }

  return (
    <DiRequirejs style={{opacity: item.isDefault ? 1 : 0.2}} className={c.icon} onClick={submitHandler} />
  )
}


export {
  DefaultItem
}