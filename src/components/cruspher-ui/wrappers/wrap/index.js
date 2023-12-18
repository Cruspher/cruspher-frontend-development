import React from "react";
import c from './style.module.scss'


const Wrap = ({children, hPadding, vPadding, maxWidth}) => {
  const horizontalPadding = hPadding ? hPadding : '20px'
  const verticalPadding = vPadding ? vPadding : '0px'
  const wrapMaxWidth = maxWidth ? maxWidth : '1200px'

  return (
    <div className={c.container} style={{padding: `${verticalPadding} ${horizontalPadding}`, maxWidth: wrapMaxWidth}}>
      {children}
    </div>
  )
}


export {
  Wrap
}
