import React from 'react'
import c from './style.module.scss'


const LineupsFormationItem = ({setFormation, item, formation}) => {
  const itemClass = formation.name === item.name ? `${c.item} ${c.active}` : c.item

  return (
    <div className={itemClass} onClick={() => setFormation(item)}>
      {item.name}
    </div>
  )
}


export {
  LineupsFormationItem
}