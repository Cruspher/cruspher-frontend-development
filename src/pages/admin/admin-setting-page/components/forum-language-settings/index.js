import React, {useEffect, useState} from 'react'
import {useIntl} from "react-intl";
import {toast} from "react-toastify";
import {Loading} from "../../../../../components/cruspher-ui/loading";
import {NewsLanguageItem} from "../news-language-item";
import {AddForumThemeModal} from "../../../../../components/modals/add-forum-theme-modal";
import {
  addForumLanguagesRequest,
  editForumLanguagesRequest,
  getForumLanguagesRequest
} from "../../../../../actions/forum";
import c from './style.module.scss'
import {ButtonDefault} from "../../../../../components/cruspher-ui/buttons/button-default";


const ForumLanguageSettings = () => {
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
    const data = await getForumLanguagesRequest()

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

    const data = await addForumLanguagesRequest(title)

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

    const data = await editForumLanguagesRequest({languageId: item.id, name: title })

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
          <ButtonDefault submit={addLanguageHandler} text={intl.formatMessage({id: "add"})} maxWidth='200px' />
        )
      }
      {
        isModalShow && (
          <AddForumThemeModal
            title={activeLanguage ? 'edit_forum_language' : "add_forum_language"}
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
  ForumLanguageSettings
}