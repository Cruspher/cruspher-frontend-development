import React from 'react'
import c from './style.module.scss'

const getTitle = (variant, title, styles) => {
  if (variant === 'h1') return <h2 className={c.title} style={{...styles}}>{title}</h2>
  if (variant === 'h2') return <h2 className={c.title} style={{...styles}}>{title}</h2>
  if (variant === 'h3') return <h3 className={c.title} style={{...styles}}>{title}</h3>
  if (variant === 'h4') return <h4 className={c.title} style={{...styles}}>{title}</h4>
  if (variant === 'h5') return <h5 className={c.title} style={{...styles}}>{title}</h5>
  return <h6>{title}</h6>
}

const Title = ({variant, children, size, uppercase}) => {

  const styles = {
    fontSize: size ? size : '20px', textTransform: uppercase ? 'uppercase' : 'auto'
  }

  const  titleValue = getTitle(variant, children, styles)

  return (
    <>
      {titleValue}
    </>
  )
}

const PageTitle = ({title}) => {

  return (
    <h2 className={c.pageTitle}>{title}</h2>
  )
}


export {
  Title,
  PageTitle
}
