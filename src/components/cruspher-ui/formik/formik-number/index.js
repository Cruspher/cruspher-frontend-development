import React from 'react'
import c from './style.module.scss'

const FormikNumber = ({form, value, name, submit, placeholder, width}) => {
  const error = form?.touched[name] && Boolean(form.errors[name]);
  const inputClass = error ? `${c.input} ${c.inputError}` : c.input
  const maxWidth = width ? width : '100%'

  return (
    <input
      style={{maxWidth}}
      type='number'
      placeholder={placeholder}
      className={inputClass}
      {...{value, name}}
      onChange={submit}
    />
  )
}


export {
  FormikNumber
}
