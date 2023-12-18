import React from 'react'
import moment from "moment";
import {Modal} from "../../cruspher-ui/modal";
import c from './style.module.scss'
import {Dislike, Like} from "../../cruspher-ui/icons/emotions";
import {FlexBox} from "../../cruspher-ui/box/flexbox";
import {Wrap} from "../../cruspher-ui/wrappers/wrap";
import {GridBox} from "../../cruspher-ui/box/grid-box";
import {Title} from "../../cruspher-ui/title";
import TextareaAutosize from 'react-textarea-autosize';


const ViewNewsModal = ({toggleModal, news, addEmotionHandler}) => {
  const titleValue = !!news.userLanguage ? news.userLanguage.title : news.defaultLanguage.title
  const contentValue = !!news.userLanguage ? news.userLanguage.content : news.defaultLanguage.content


  return (
    <Modal toggleModal={toggleModal} >
      <Wrap vPadding='30px'>
        <div className={c.wrap}>
          <div className={c.imageWrap}>
            <img alt="" className={c.image} src={process.env.REACT_APP_API_URL + news.image} />
          </div>

          <GridBox rowGap='50px'>
            <Title variant='h2'>
              {titleValue}
            </Title>

            <TextareaAutosize disabled={true}  className={c.textArea} value={contentValue} />

            <div className={c.footer}>
              <FlexBox items='center' content='center'>
                <Like submit={() => addEmotionHandler(news.id, 'like')} count={news.like}  />
                <Dislike submit={() => addEmotionHandler(news.id, 'dislike')} count={news.dislike} />
              </FlexBox>
              <div>
                {moment(news.date).format('DD/MM HH:mm')}
              </div>
            </div>
          </GridBox>
        </div>
      </Wrap>
    </Modal>
  )
}

export {
  ViewNewsModal
}

