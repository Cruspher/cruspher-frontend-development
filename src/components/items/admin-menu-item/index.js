import React, {useState} from "react";
import c from './style.module.css'

const AdminMenuItem = ({children, title}) => {
  const [isActive, setIsActive] = useState(false)
  const toggleIsActive = () => setIsActive(!isActive)
  const bodyClass = isActive ? `${c.body} ${c.bodyActive}` : c.body

  return (
    <div className={c.container}>
      <div className={c.header} onClick={toggleIsActive}>{title}</div>
      <div className={bodyClass}>
        {children}
      </div>
    </div>
  )
}

export {
  AdminMenuItem
}
