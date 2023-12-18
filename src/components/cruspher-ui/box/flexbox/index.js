import React from 'react'


const FlexBox = ({children, content, items, columnGap, direction, style, rowGap, width, padding}) => {
  const styles = {
    display: 'flex',
    justifyContent: content ? content : 'start',
    alignItems: items ? items : 'start',
    columnGap: columnGap ? columnGap : '0px',
    rowGap: rowGap ? rowGap : '0px',
    flexDirection: direction ? direction : 'row',
    width: width && width,
    padding: padding && padding,
    ...style,
  }

  return (
    <div style={styles}>{children}</div>
  )
}


export  {
  FlexBox
}
