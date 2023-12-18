import React from 'react'
import {Navbar} from "../../navbar";
import c from './style.module.scss'

const LayoutDefault = ({children}) => {

  return (
    <div className={c.wrap}>
      <Navbar />

      <div className={c.content}>
        {children}
      </div>
    </div>
  )
}


export {
  LayoutDefault
}