import React from 'react'
import c from './style.module.scss'
import {FlexBox} from "../../box/flexbox";


const FormikTitleWrap = ({children, title}) => {

  return (
    <FlexBox direction='column' rowGap='4px' width='100%'>
      <h3 className={c.title}>{title}</h3>
      {children}
    </FlexBox>
  )
}


export {
  FormikTitleWrap
}