import React from 'react'
import {FlexBox} from "../../cruspher-ui/box/flexbox";
import {Dislike, Like} from "../../cruspher-ui/icons/emotions";
import c from './style.module.scss'
import {DateView} from "../../cruspher-ui/date-view";
import {BsTranslate} from "react-icons/all";

const NewsItemCardAdmin = ({item, submit, addEmotionHandler}) => {
  const titleValue = !!item.userLanguage ? item.userLanguage.title : item.defaultLanguage.title
  const contentValue = !!item.userLanguage ? item.userLanguage.content : item.defaultLanguage.content


  const contentFiltered = contentValue.length > 350 ? `${contentValue.slice(0, 350)}...` : contentValue
  const title = titleValue.length > 80 ? titleValue.slice(0, 80) + '...' : titleValue

  const imageUrl = `${process.env.REACT_APP_API_URL}${item.image}`


  return (
    <div className={c.wrap}>
      <h3 onClick={() => submit(item)} className={c.title}>{title}</h3>

      <div onClick={() => submit(item)} className={c.imageWrap} style={{backgroundImage: `url("${imageUrl}")`}} />

      <div className={c.content}>
        {contentFiltered}
      </div>


      <div className={c.footer}>
          <FlexBox items='center' columnGap="10px">
              <DateView date={item.date} format={'DD/MM/YYYY, HH:mm'} />
              {item.userLanguage && <BsTranslate />}
          </FlexBox>

        <FlexBox columnGap='10px'>
          <Like submit={() => addEmotionHandler(item.id, 'like')} count={item.like} />
          <Dislike submit={() => addEmotionHandler(item.id, 'dislike')} count={item.dislike} />
        </FlexBox>
      </div>
    </div>
  )
}


export {
  NewsItemCardAdmin
}
