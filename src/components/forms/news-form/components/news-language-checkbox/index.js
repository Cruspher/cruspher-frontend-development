import React from 'react'
import c from './style.module.scss'


const NewsLanguageCheckbox = ({name, changeFormValue, language}) => {
  const changeHandler = (val) => {
    if (language.isDefault) return
    changeFormValue(language.name, name, val)
  }

  return (
    <input
      type='checkbox'
      className={c.input}
      name={name}
      checked={!!language[name]}
      onChange={({target}) => changeHandler(target.checked)}
    />
  )
}


export {
  NewsLanguageCheckbox
}