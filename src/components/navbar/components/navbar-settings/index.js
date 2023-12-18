import React, {useEffect, useState} from 'react'
import c from './style.module.scss'
import {Modal} from "../../../cruspher-ui/modal";
import {SelectDefault} from "../../../cruspher-ui/selects/select";
import {FlexBox} from "../../../cruspher-ui/box/flexbox";
import {LOCALES} from "../../../../I18n/locales";
import {useLanguage} from "../../../../hooks/use-language.hook";
import {useIntl} from "react-intl";
import {NeonButton} from "../../../cruspher-ui/buttons/neon-button";
import {useNewsLanguage} from "../../../../hooks/use-news-language.hook";
import {getNewsLanguagesRequest} from "../../../../actions/news";
import {toast} from "react-toastify";
import {Loading} from "../../../cruspher-ui/loading";
import {getForumLanguagesRequest} from "../../../../actions/forum";
import {useForumLanguage} from "../../../../hooks/use-forum-language.hook";

const NavbarSettings = ({toggleSettingModal, isSettingModalShow}) => {
  const [isLoading, setIsLoading] = useState(false)
  const intl = useIntl()
  const {setLanguage, getLanguage} = useLanguage()
  const {setNewsLanguage, getNewsLanguage} = useNewsLanguage()
  const {getForumLanguage, setForumLanguage} = useForumLanguage()

  const [activeLanguage, setActiveLanguage] = useState(null)
  const [localesOptions, setLocalesOptions] = useState([])
  const [newsLanguages, setNewsLanguages] = useState(false)
  const [activeNewsLanguage, setActiveNewsLanguage] = useState(null)
  const [forumLanguages, setForumLanguages] = useState(false)
  const [activeForumLanguage, setActiveForumLanguage] = useState(null)

  useEffect(() => {
    getLanguagesHandler()
  }, [])

  const notify = text => toast(text)

  const getLanguagesHandler = async () => {
    setIsLoading(true)
    const newSelectOptions = Object.keys(LOCALES).map(key => {
      return {
        title: key,
        value: LOCALES[key]
      }
    })
    setLocalesOptions(newSelectOptions)

    const usedLanguage = getLanguage()
    const newLanguageValue = newSelectOptions.filter(item => item.value === usedLanguage)
    setActiveLanguage(newLanguageValue[0])

    const newsLanguageData = await getNewsLanguagesRequest()

    if (newsLanguageData) {
      setNewsLanguages(newsLanguageData.languages)
      let active = newsLanguageData.languages.find(item => item.id.toString() === getNewsLanguage())

      if (!active) active = newsLanguageData.languages.find(item => item.isDefault)

      setActiveNewsLanguage(active)
    } else {
      notify(intl.formatMessage({id: "unknown_error"}))
    }

    const forumLanguageData = await getForumLanguagesRequest()


    if (forumLanguageData) {
      setForumLanguages(forumLanguageData.languages)
      let active = forumLanguageData.languages.find(item => item.id.toString() === getForumLanguage())

      if (!active) active = forumLanguageData.languages.find(item => item.isDefault)

      setActiveForumLanguage(active)
    } else {
      notify(intl.formatMessage({id: "unknown_error"}))
    }


    setIsLoading(false)
  }

  const changeLocalesHandler = (item) => {
    setActiveLanguage(item)
  }

  const changeNewsLanguageHandler = (item) => {
    setActiveNewsLanguage(item)
  }

  const changeForumLanguageHandler = (item) => {
    setActiveForumLanguage(item)
  }

  const saveHandler = () => {
    setLanguage(activeLanguage.value)
    setNewsLanguage(activeNewsLanguage.id)
    setForumLanguage(activeForumLanguage.id)
    window.location.reload()
  }

  const body = isLoading ? (
    <Loading />
  ) : (
    <div className={c.container}>
      <div className={c.setting}>
        <h2 className={c.title}>
          {intl.formatMessage({id: "settings"})}
        </h2>

        <FlexBox direction='column' rowGap='5px'>
          <h3 className={c.itemTitle}>
            {intl.formatMessage({id: "language"})}
          </h3>
          <SelectDefault
            labelValue='title'
            submit={changeLocalesHandler}
            value={activeLanguage}
            options={localesOptions}
            placeholder={intl.formatMessage({id: 'choose'})}
          />
        </FlexBox>

        <FlexBox direction='column' rowGap='5px'>
          <h3 className={c.itemTitle}>
            {intl.formatMessage({id: "news_language"})}
          </h3>

          <SelectDefault
            labelValue='name'
            submit={changeNewsLanguageHandler}
            value={activeNewsLanguage}
            options={newsLanguages}
            placeholder={intl.formatMessage({id: 'choose'})}
          />
        </FlexBox>

        <FlexBox direction='column' rowGap='5px'>
          <h3 className={c.itemTitle}>
            {intl.formatMessage({id: "forum_language"})}
          </h3>

          <SelectDefault
            labelValue='name'
            submit={changeForumLanguageHandler}
            value={activeForumLanguage}
            options={forumLanguages}
            placeholder={intl.formatMessage({id: 'choose'})}
          />
        </FlexBox>
      </div>


      <NeonButton submit={saveHandler} variant='add' center={true}>
        {intl.formatMessage({id: "save"})}
      </NeonButton>
    </div>
  )

  const modal = isSettingModalShow && (
    <Modal toggleModal={toggleSettingModal} maxWidth='800px'>
      {body}
    </Modal>
  )

  return (
    <>
      {modal}
    </>
  )
}

export {
  NavbarSettings
}

