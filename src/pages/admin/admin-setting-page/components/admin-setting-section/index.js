import React, {useState} from 'react'
import c from './style.module.scss'



const AdminSettingSection = ({children, title}) => {
  const [isActive, setIsActive] = useState(false)
  const toggleActive = () => setIsActive(!isActive)

  const titleClass = isActive ? `${c.title} ${c.titleActive}` : c.title

  return (
    <div className={c.wrap}>
      <h2 className={titleClass} onClick={toggleActive}>{title}</h2>

      {
        isActive && (
          <div className={c.container}>
            {children}
          </div>
        )
      }
    </div>
  )
}


export {
  AdminSettingSection
}