import React from 'react'
import c from './style.module.scss'

const FlipCheckbox = ({value, submit}) => {


  return (
    <div className={c.container}>
      <input checked={value} onChange={() => submit(!value)} type="checkbox" name="" />
      <span>On</span>
      <span>Off</span>
    </div>
  )
}


export {
  FlipCheckbox
}
