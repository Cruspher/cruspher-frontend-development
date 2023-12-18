import React from 'react'
import c from './neon-button.module.scss'


const generateClassByType = (type) => {
  if (type === 'add') return c.btnSuccess
  if (type === 'remove') return c.btnRemove
  if (type === 'action') return c.btnAction
  if (type === 'default') return c.btnDefault
  return c.btnAction
}

const NeonButton = ({submit, children, variant, center, big, isDisabled}) => {

  const btnClass = variant ? `${c.btn} ${generateClassByType(variant)}` : c.btn
  const btnActiveClass = isDisabled ? `${btnClass} ${c.btnDisable}` : btnClass

  const submitHandler = () => {
    if(isDisabled || !submit) return
    submit()
  }

  const marginValue = center ? '0 auto' : '0'
  const widthValue = big ? '220px' : '170px'

  return (
    <div onClick={submitHandler} className={btnActiveClass} style={{margin: marginValue, width: widthValue}}>
      <span>{children}</span>
    </div>
  )
}

export {
  NeonButton
}
