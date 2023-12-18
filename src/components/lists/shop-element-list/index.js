import React from 'react'
import c from './style.module.scss'
import {ShopElementItem} from "../../items/shop-element-item";
import {EmptyTitle} from "../../cruspher-ui/empty-title";
import {useIntl} from "react-intl";


const ShopElementList = ({elements}) => {
  const intl = useIntl()

  return (
    <>
      {
        elements.data.length ? (
          <div className={c.wrap}>

          {
              elements.data.map((item, index) => (
                <ShopElementItem  key={index} item={item} />
              ))
            }
          </div>
        ) : (
          <EmptyTitle errorText={intl.formatMessage({id: 'list_is_empty'})} />
        )
      }
    </>
  )
}


export {
  ShopElementList
}