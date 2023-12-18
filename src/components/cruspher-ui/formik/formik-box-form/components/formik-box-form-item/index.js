import React from 'react'
import c from './style.module.scss'


const FormikBoxFormItem = ({item, form, name}) => {
  const itemClass = form.values[name] === item ? `${c.wrap} ${c.wrapActive}` : c.wrap


  const submit = () => {
    form.setFieldValue(name, item)
  }

  return (
    <div className={itemClass} onClick={submit} />
  )
}


export {
  FormikBoxFormItem
}