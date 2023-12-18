import React from 'react'
import c from './style.module.scss'


const AdminSocialItem = ({social}) => {

  return (
    <div className={c.container}>
      <h3 className={c.title}>{social.name}</h3>

      <span className={c.link}>{social.link}</span>
    </div>
  )
}

export {
  AdminSocialItem
}
