import React from 'react'
import c from './style.module.scss'
import {useIntl} from "react-intl";
import {GridBox} from "../../cruspher-ui/box/grid-box";
import {BsGiftFill} from "react-icons/bs";
import {FlexBox} from "../../cruspher-ui/box/flexbox";


const surpriseMock = [
  "Sony PlayStation 5 Digital Edition",
  "Apple AirPods Pro",
  "Sweater with the symbol of your favorite club",
  "Sweater with the symbol of your favorite club",
  "Sweater with the symbol of your favorite club",
  "Sweater with the symbol of your favorite club",
  "Sweater with the symbol of your favorite club",
  "T-short with the symbol of your favorite club",
  "T-short with the symbol of your favorite club",
  "T-short with the symbol of your favorite club",
  "T-short with the symbol of your favorite club",
  "T-short with the symbol of your favorite club",
]


const SurpriseList = () => {
  const intl = useIntl()

  return (
    <div className={c.list}>
      <h2 className={c.title}>
        <FlexBox columnGap="3px">
          <BsGiftFill className={c.icon} />
          <BsGiftFill className={c.icon} />
          <BsGiftFill className={c.icon} />
        </FlexBox>
        <span>
          {intl.formatMessage({id: 'sur_prize_title'})}
        </span>
      </h2>

      <GridBox rowGap="4px">
        {
          surpriseMock.map((item,index) => (
            <div className={c.item}>
              <span>{index + 1}. {item}</span>
            </div>
          ))
        }
      </GridBox>
    </div>
  )
}


export {
  SurpriseList
}