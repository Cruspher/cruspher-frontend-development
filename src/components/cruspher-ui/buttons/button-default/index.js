import React from 'react'
import c from './style.module.scss'

const ButtonDefault = ({text, submit, maxWidth}) => {

  return (
    <div
      style={{maxWidth: maxWidth ? maxWidth : '100%'}}
      className={c.button}
      onClick={submit}
    >
      {text}
    </div>
  )
}


export {
  ButtonDefault
}