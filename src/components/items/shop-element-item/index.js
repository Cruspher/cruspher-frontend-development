import React from 'react'
import c from './style.module.scss'
import {useIntl} from "react-intl";
import {DefaultItem} from "../default-item";
import {useNavigate} from "react-router-dom";
import {APPRoutes} from "../../../const/APP-routes";
import {FaMoneyBillAlt} from "react-icons/all";

const getBoxClass = (item) => {
  if (item.level === 1) return c.wrapGreen
  else if (item.level === 2) return c.wrapBlue
  else if (item.level === 3) return c.wrapViolet
  return  ''
}

const ShopElementItem = ({item}) => {
  const intl = useIntl()
  const wrapClass = item.isInShop ? c.wrap : `${c.wrap} ${getBoxClass(item)}`
  const navigate = useNavigate()

  const imageClass = item.type === 'stadium' ? c.image : `${c.image} ${c.imageForm}`

  return (
    <div onClick={() => navigate(APPRoutes.editShopElement + `/${item.id}`)} className={wrapClass}>
      <div className={c.nameWrap}>
        <span className={c.name}>
          {item.name}
        </span>
        <span className={c.type}>
          {intl.formatMessage({id: item.type})}
        </span>
      </div>

      {item.isInShop && (
        <div className={c.priceWrap}>
          <span className={c.price}>
            {item.price}
          </span>
          <FaMoneyBillAlt className={c.coinIcon} />
        </div>
      )}

      <div className={c.shopType}>
        {intl.formatMessage({id: item.isInShop ? 'shop' : 'box'})}
      </div>

      <img className={imageClass} src={process.env.REACT_APP_API_URL + item.image} alt={`shop-element-${item.name}`} />

      <div className={c.defaultIcon}>
        <DefaultItem item={item} submit={() => {}} />
      </div>
    </div>
  )
}


export {
  ShopElementItem
}