import React from "react";
import c from './style.module.scss'

const MenuButton = ({toggleMenuHandler, isMenuActive}) => {
  const wrapClass = isMenuActive ? `${c.wrap} ${c.wrapActive}` : c.wrap

  return (
    <div
      className={wrapClass}
      onClick={toggleMenuHandler}
    >
      <span className={c.button}>
        <span className={c.span} />
      </span>
    </div>
  )
}


export {
  MenuButton
}
