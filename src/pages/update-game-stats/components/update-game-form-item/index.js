import React from 'react'
import c from './style.module.scss'
import {FlexBox} from "../../../../components/cruspher-ui/box/flexbox";


const UpdateGameFormItem = ({valueHome, valueAway, title,isHome}) => {
  const homeWidth = 100 / (valueHome * 1 + valueAway * 1) * valueHome
  const awayWidth = 100 / (valueHome * 1 + valueAway * 1) * valueAway


  return (
    <FlexBox direction='column'>
      <h3 className={c.title}>{title}</h3>


      <div className={c.wrap}>
        <div className={c.valueWrap}>
          <span className={c.span}>{valueHome}</span>
        </div>

        <div className={c.bar}>
          <div className={isHome ? c.barHome : c.barAway} style={{width: `${homeWidth}%`}} />
          <div className={!isHome ? c.barHome : c.barAway} style={{width: `${awayWidth}%`}} />
        </div>

        <div className={c.valueWrap}>
          <span className={c.span}>{valueAway}</span>
        </div>
      </div>
    </FlexBox>
  )
}


export {
  UpdateGameFormItem
}