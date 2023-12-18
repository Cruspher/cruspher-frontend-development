import React, {useEffect, useState} from 'react'
import {useIntl} from "react-intl";
import {toast} from "react-toastify";
import {
  addNewsLanguagesRequest, editNewsLanguagesRequest,
  getNewsLanguagesRequest,
} from "../../../../../actions/news";
import {Loading} from "../../../../../components/cruspher-ui/loading";
import {NewsLanguageItem} from "../news-language-item";
import {AddForumThemeModal} from "../../../../../components/modals/add-forum-theme-modal";
import c from './style.module.scss'
import {ButtonDefault} from "../../../../../components/cruspher-ui/buttons/button-default";


const NewsLanguageSettings = () => {
  const intl = useIntl()
  const [isLoading, setIsLoading] = useState(false)
  const [languages, setLanguages] = useState(null)
  const [isModalShow, setIsModalShow] = useState(false)
  const [activeLanguage, setActiveLanguage] = useState(false)
  const [isSuperAdmin] = useState(process.env.REACT_APP_IS_SUPER_ADMIN === 'true')

  useEffect(() => {
    getNewsLanguage()
  }, [])

  const notify = text => toast(text)
  const toggleModal = () => setIsModalShow(!isModalShow)

  const getNewsLanguage = async () => {
    setIsLoading(true)
    const data = await getNewsLanguagesRequest()

    if (data) {
      setLanguages(data.languages)
    } else {
      notify(intl.formatMessage({id: "unknown_error"}))
    }

    setIsLoading(false)
  }

  const addNewsLanguageHandler = async ({title}) => {
    toggleModal()
    setIsLoading(true)

    const data = await addNewsLanguagesRequest(title)

    if (data) {
      setIsLoading(false)
      getNewsLanguage()
      toggleModal()
    } else {
      notify(intl.formatMessage({id: "unknown_error"}))
    }

    setIsLoading(false)
  }

  const editNewsLanguageHandler = async ({title, item}) => {
    toggleModal()
    setIsLoading(true)

    const data = await editNewsLanguagesRequest({languageId: item.id, name: title })

    if (data) {
      setIsLoading(false)
      getNewsLanguage()
      toggleModal()
    } else {
      notify(intl.formatMessage({id: "unknown_error"}))
    }
    setIsLoading(false)
  }

  const languageSubmitHandler = ({title, item}) => {
    if (item) {
      editNewsLanguageHandler({title, item})
    } else {
      addNewsLanguageHandler({title, item})
    }
  }

  const changeLanguageHandler = (item) => {
    setActiveLanguage(item)
    toggleModal()
  }

  const addLanguageHandler = () => {
    setActiveLanguage(null)
    toggleModal()
  }

  const body = isLoading ? (
    <Loading />
  ) : (

    <div className={c.container}>
      <div>
        {
          languages && languages.map((item, index) => (
            <NewsLanguageItem
              item={item}
              index={index}
              key={index}
              changeLanguageHandler={changeLanguageHandler}
            />
          ))
        }
      </div>

      {
        isSuperAdmin && (
          <ButtonDefault
            maxWidth="200px"
            submit={addLanguageHandler}
            text={intl.formatMessage({id: "add"})}
          />
        )
      }
      {
        isModalShow && (
          <AddForumThemeModal
            title={intl.formatMessage({id: activeLanguage ? "edit_news_language" : "add_news_language"})}
            toggleModal={toggleModal}
            submit={(val) => languageSubmitHandler(val)}
            item={activeLanguage}
            itemLabel='name'
          />
        )
      }
    </div>
  )

  return (
    <div className={c.wrap}>
      {body}
    </div>
  )
}


export {
  NewsLanguageSettings
}