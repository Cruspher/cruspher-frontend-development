import React from 'react'
import c from './style.module.scss'

const PageHeader = ({children}) => {

  return (
    <div className={c.wrap}>
      {children}
    </div>
  )
}


export {
  PageHeader
}