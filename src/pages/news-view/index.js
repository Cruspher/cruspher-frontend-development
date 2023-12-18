import React, {useContext, useEffect, useState} from 'react'
import c from './style.module.scss'
import {LayoutDefault} from "../../components/layouts/layout-default";
import {Wrap} from "../../components/cruspher-ui/wrappers/wrap";
import {addNewsEmotionRequest, getOneNewsRequest} from "../../actions/news";
import {useNewsLanguage} from "../../hooks/use-news-language.hook";
import {Title} from "../../components/cruspher-ui/title";
import TextareaAutosize from "react-textarea-autosize";
import {FlexBox} from "../../components/cruspher-ui/box/flexbox";
import {Dislike, Like} from "../../components/cruspher-ui/icons/emotions";
import {useIntl} from "react-intl";
import {toast} from "react-toastify";
import {Loading} from "../../components/cruspher-ui/loading";
import {useNavigate} from "react-router-dom";
import {AuthContext} from "../../context/AuthContext";
import jwtDecode from "jwt-decode";
import {DateView} from "../../components/cruspher-ui/date-view";
import {ActionIcon} from "../../components/cruspher-ui/icons/default";


const NewsView = () => {
  const intl = useIntl()
  const auth = useContext(AuthContext)
  const {userId} = jwtDecode(auth.token)
  const notify = text => toast(text)
  const [news, setNews] = useState(null)
  const {getNewsLanguage} = useNewsLanguage()
  const [isLoading, setIsLoading] = useState(true)
  const navigate = useNavigate()


  const titleValue = !news ? '' : !!news.userLanguage ? news.userLanguage?.title : news.defaultLanguage?.title
  const contentValue = !news ? '' : !!news.userLanguage ? news.userLanguage?.content : news.defaultLanguage?.content

  useEffect(() => {
    getNewsHandler()
  }, [])

  const getNewsHandler = async () => {
    setIsLoading(true)
    const newsId = window.location.pathname.split('/')[window.location.pathname.split('/').length - 1]

    const newsData = await getOneNewsRequest({newsId: Number(newsId), languageId: Number(getNewsLanguage())})

    if (newsData) {
      setNews(newsData.news)
    } else {
      notify(intl.formatMessage({id: 'unknown_error'}))
    }

    setIsLoading(false)
  }


  const addEmotionHandler = async (newsId, emotion) => {
    setIsLoading(true)
    const data = await addNewsEmotionRequest({
      newsId: newsId,
      userId: userId,
      emotion: emotion
    })

    if (data) {
      notify(intl.formatMessage({id: "emotion_success_added"}))

      const item = news

      if (data.oldEmotionName) {
        item[data.oldEmotionName] = item[data.oldEmotionName] - 1
      }
      item[emotion] = item[emotion] + 1


      setNews(item)
    } else {
      notify(intl.formatMessage({id: 'unknown_error'}))
    }

    setIsLoading(false)
  }

  const body = isLoading ? (
    <Loading />
  ) : (
    <div className={c.wrap}>
      <div>
        <div className={c.imageWrap}>
          <div className={c.title}>
            <ActionIcon type='left' submit={() => navigate(-1)} />

            <Title variant='h2'>
              {titleValue}
            </Title>
          </div>




          <img alt="" className={c.image} src={process.env.REACT_APP_API_URL + news.image} />

          <FlexBox items='center' content='space-between'>
            <FlexBox items='center'>
              <DateView date={news.date} format='DD/MM HH:mm' />
            </FlexBox>

            <FlexBox items='center' columnGap='10px'>
              <Like submit={() => addEmotionHandler(news.id, 'like')} count={news.like}  />
              <Dislike submit={() => addEmotionHandler(news.id, 'dislike')} count={news.dislike} />
            </FlexBox>
          </FlexBox>
        </div>
      </div>

      <div className={c.textWrap}>
        <TextareaAutosize disabled={true}  className={c.textArea} value={contentValue} />
      </div>
    </div>
  )


  return (
    <LayoutDefault>
      <Wrap vPadding='30px'>
        {body}
      </Wrap>
    </LayoutDefault>
  )
}

export {
  NewsView
}