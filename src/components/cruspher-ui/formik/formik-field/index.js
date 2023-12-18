import React from 'react'
import c from './style.module.scss'

const FormikField = ({form, value, name, submit, placeholder, width, type, defaultSubmit, onKeyDown}) => {
  const error =  form && form.touched[name] && Boolean(form.errors[name]);
  const inputClass = error ? `${c.input} ${c.inputError}` : c.input
  const typeValue = type ? type : 'text'
  const maxWidth = width ? width : '100%'


  return (
      <input
        style={{maxWidth, typeValue}}
        type={typeValue}
        placeholder={placeholder}
        className={inputClass}
        {...{value, name}}
        onChange={defaultSubmit ? (e) => defaultSubmit(e) : submit}
        onKeyDown={onKeyDown ? onKeyDown : () => {}}
      />
  )
}


export {
  FormikField
}
