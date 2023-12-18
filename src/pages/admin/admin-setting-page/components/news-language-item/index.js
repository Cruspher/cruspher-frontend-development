import React, {useState} from 'react'
import c from './style.module.scss'
import {FlexBox} from "../../../../../components/cruspher-ui/box/flexbox";
import {EditIcon} from "../../../../../components/cruspher-ui/icons/default";


const NewsLanguageItem = ({item, index, changeLanguageHandler}) => {
  const [isSuperAdmin] = useState(process.env.REACT_APP_IS_SUPER_ADMIN === 'true')

  return (
    <div className={c.wrap}>
      <FlexBox items='center' columnGap="5px">
        <div>
          {index + 1 }.
        </div>

        <div>
          {item.name}
        </div>
      </FlexBox>



      {
        isSuperAdmin && (
          <EditIcon submit={() => changeLanguageHandler(item)} />
        )
      }
    </div>
  )
}


export {
  NewsLanguageItem
}