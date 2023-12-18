import React from 'react'
import c from './style.module.scss'

const FormikAreaField = ({form, value, name, submit, placeholder, width, rows}) => {
  const error =  form && form.touched[name] && Boolean(form.errors[name]);
  const inputClass = error ? `${c.input} ${c.inputError}` : c.input
  const maxWidth = width ? width : '100%'

  return (
    <textarea
      style={{maxWidth, width: '100%'}}
      placeholder={placeholder}
      className={inputClass}
      {...{value, name}}
      onChange={submit}
      rows={rows ? rows : "9"}
    />
  )
}


export {
  FormikAreaField
}
