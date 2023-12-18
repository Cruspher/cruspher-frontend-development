import React, {useContext, useEffect, useState} from 'react'
import {toast} from "react-toastify";
import {useIntl} from "react-intl";
import {FlexBox} from "../../cruspher-ui/box/flexbox";
import {addNewsEmotionRequest, getNewsRequest} from "../../../actions/news";
import {NewsItemCardAdmin} from "../../items/news-item-card-admin";
import {Pagination} from "../../cruspher-ui/pagination";
import {Loading} from "../../cruspher-ui/loading";
import {EmptyTitle} from "../../cruspher-ui/empty-title";
import c from './style.module.scss'
import {AuthContext} from "../../../context/AuthContext";
import jwtDecode from "jwt-decode";
import {APPRoutes} from "../../../const/APP-routes";
import {useNavigate} from "react-router-dom";
import {useNewsLanguage} from "../../../hooks/use-news-language.hook";


const NewsList = ({isAdmin}) => {
  const {getNewsLanguage} = useNewsLanguage()
  const intl = useIntl()
  const auth = useContext(AuthContext)
  const userId = jwtDecode(auth.token).userId
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(false)
  const [page, setPage] = useState(0)
  const [news, setNews] = useState(null)

  useEffect(() => {
    getNewsHandler()
  }, [page])

  const notify = (text) => toast(text)

  const getNewsHandler = async () => {
    setIsLoading(true)

    const data = await getNewsRequest({
      page: page,
      languageId: getNewsLanguage()
    })

    if (data) {
      setNews(data)
    } else {
      notify(intl.formatMessage({id: 'unknown_error'}))
    }

    setIsLoading(false)
  }

  const openNewsHandler = (news) => {
    if (isAdmin) {
      navigate(APPRoutes.editNews + news.id)
    } else {
      navigate(APPRoutes.news + `/${news.id}`)
    }
  }

  const addEmotionHandler = async (newsId, emotion) => {
    const data = await addNewsEmotionRequest({
      newsId: newsId,
      userId: userId,
      emotion: emotion
    })

    if (data) {
      notify(intl.formatMessage({id: "emotion_success_added"}))
      const newData = news.data.map(item => {
        if (item.id === newsId) {
          if (data.oldEmotionName) {
            item[data.oldEmotionName] = item[data.oldEmotionName] - 1
          }
          item[emotion] = item[emotion] + 1
        }

        return item
      })

      setNews({
        ...news,
        data: newData
      })
    } else {
      notify(intl.formatMessage({id: 'unknown_error'}))
    }
  }

  if (isLoading) return <Loading />

  const body = (
    <>
      {
        news?.length ? (
          <>
            <div className={c.list}>
              {
                news && news.data && news.data.map(item => (
                  <NewsItemCardAdmin addEmotionHandler={addEmotionHandler} submit={openNewsHandler} key={item.id} item={item}  />
                ))
              }
            </div>

            {
              news?.length > 18 &&
              <Pagination page={page + 1} length={news?.length} onChangePage={(page) => setPage(page)} rows={18}/>
            }
          </>
        ) : (
          <EmptyTitle errorText={intl.formatMessage({id: 'list_is_empty'})}/>
        )
      }
    </>
  )


  return (
    <FlexBox direction='column' rowGap='30px'>
      {body}
    </FlexBox>
  )
}


export {
  NewsList
}
