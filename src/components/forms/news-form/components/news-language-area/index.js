import React from 'react'
import c from './style.module.scss'


const NewsLanguageArea = ({name, changeFormValue, language}) => {
  const changeHandler = (val) => {
    changeFormValue(language.name, name, val)
  }

  return (
    <textarea rows={9} className={c.input} name={name} value={language[name]} onChange={({target}) => changeHandler(target.value)}/>
  )
}


export {
  NewsLanguageArea
}