import React from 'react'
import c from './style.module.scss'
import {ImNotification} from "react-icons/all";
import {FlexBox} from "../box/flexbox";


const EmptyTitle = ({errorText, withoutPadding}) => {
  const classValue = withoutPadding ? c.containerWithoutPadding : c.container

  return (
    <div className={classValue}>
      <FlexBox content='center' width='100%' items='center' columnGap='10px'>
        <h3 className={c.errorText}>{errorText}</h3>
        <ImNotification className={c.errorIcon} />
      </FlexBox>
    </div>
  )
}

export  {
  EmptyTitle
}