import React from 'react'


const GridBox = ({children, rowGap, columnGap, width}) => {

  return (
    <div style={{display: 'grid', rowGap: rowGap,columnGap: columnGap, width: width ? width : 'auto'}}>
      {children}
    </div>
  )
}


export {
  GridBox
}