import React from 'react'
import c from './style.module.scss'


const Loading = () => {

  return (
    <div className={c.container}>
      <div className={c.ring} />
      <div className={c.ring} />
      <div className={c.ring} />
    </div>
  )
}

export {
  Loading
}
