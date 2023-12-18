import React from 'react'
import c from './style.module.scss'
import coinIcon from '../../../assets/image/icons/coins.png'

const getWrapByLevel = (level) => {
  if (level === 1) return c.wrapGreen
  if (level === 2) return c.wrapBlue
  if (level === 3) return c.wrapViolet
  return  ''
}


const ShopItem = ({item, isActive, submit, submitText}) => {
  const imageClass = item.type === 'stadium' ? c.image : `${c.image} ${c.imageForm}`
  const buyClass = isActive?`${c.buy} ${c.buyActive}` : c.buy
  const decClass = `${c.dec} ${getWrapByLevel(item.level)}`

  const submitHandler = () => {
    if (!isActive) return
    submit(item)
  }

  return (
    <div className={c.wrap}>
      <span className={c.name}>
        {item.name}
      </span>

      {
        item.price > 0 && (
          <div className={c.priceWrap}>
            <span className={c.price}>
              {item.price}
            </span>

            <img src={coinIcon} alt=""/>
          </div>
        )
      }

      <div className={decClass} />
      <img className={imageClass} src={process.env.REACT_APP_API_URL + item.image} alt={`shop-element-${item.name}`} />

      <button onClick={submitHandler} className={buyClass}>
        {submitText}
      </button>
    </div>
  )
}


export {
  ShopItem
}