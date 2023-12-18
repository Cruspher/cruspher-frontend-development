import React from 'react'
import c from './style.module.scss'


const NewsLanguageInput = ({name, changeFormValue, language}) => {

  const changeHandler = (val) => {
    changeFormValue(language.name, name, val)
  }

  return (
    <input className={c.input} name={name} value={language[name]} onChange={({target}) => changeHandler(target.value)}/>
  )
}


export {
  NewsLanguageInput
}