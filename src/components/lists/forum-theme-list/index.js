import React, {useEffect, useState} from 'react'
import {useIntl} from "react-intl";
import {toast} from "react-toastify";
import {ForumThemeItem} from "../../items/forum-theme-item";
import {FlexBox} from "../../cruspher-ui/box/flexbox";
import {AddForumThemeModal} from "../../modals/add-forum-theme-modal";
import {
  addForumThemeRequest, getForumLanguagesRequest,
  getForumThemesRequest,
} from "../../../actions/forum";
import {Loading} from "../../cruspher-ui/loading";
import {EmptyTitle} from "../../cruspher-ui/empty-title";
import c from './style.module.scss'
import {PageTitle} from "../../cruspher-ui/title";
import {PageHeader} from "../../items/page-header";
import {SelectDefault} from "../../cruspher-ui/selects/select";
import {useForumLanguage} from "../../../hooks/use-forum-language.hook";
import {Pagination} from "../../cruspher-ui/pagination";
import {ButtonDefault} from "../../cruspher-ui/buttons/button-default";



const ForumThemeList = () => {
  const notify = text => toast(text)
  const intl = useIntl()
  const {getForumLanguage} = useForumLanguage()
  const [isLoading, setIsLoading] = useState(false)
  const [isModalShow, setIsModalShow] = useState(false)
  const toggleModal = () => setIsModalShow(!isModalShow)
  const [page, setPage] = useState(0)
  const [themesList, setThemesList] = useState(null)
  const [languages, setLanguages] = useState([])
  const [activeLanguage, setActiveLanguage] = useState(null)


  useEffect(() => {
    if (!activeLanguage) return
    getThemeHandler()
  }, [page, activeLanguage])

  useEffect(() => {
    if (!activeLanguage) return
    setPage(0)
  }, [activeLanguage])

  useEffect(() => {
    getLanguagesHandler()
  }, [])

  const openThemeModalHandler = () => {
    toggleModal()
  }

  const getLanguagesHandler = async () => {
    setIsLoading(true)

    const data = await getForumLanguagesRequest()

    if (data) {
      setIsLoading(false)

      setLanguages(data.languages)
      let activeLanguage = data.languages.find(item => item.id.toString() === getForumLanguage())

      if (!activeLanguage) activeLanguage = data.languages.find(item => !!item.isDefault)
      setActiveLanguage(activeLanguage)
    } else {
      notify(intl.formatMessage({id: 'unknown_error'}))
    }

    setIsLoading(false)
  }

  const getThemeHandler = async () => {
    if (isLoading) return
    setIsLoading(true)
    const data = await getForumThemesRequest({
      page: page,
      isConfirmed: true,
      languageId: activeLanguage.id
    })

    if (data) {
      setThemesList(data)
    } else {
      notify(intl.formatMessage({id: 'unknown_error'}))
    }

    setIsLoading(false)
  }

  const addThemeHandler = async ({title}) => {
    if (isLoading) return
    setIsLoading(true)
    const newTheme = await addForumThemeRequest({title, languageId: activeLanguage.id})

    if (newTheme) {
      notify(intl.formatMessage({id: 'an_application_has_been_submitted_to_create_a_topic'}))
      toggleModal()
    } else {
      notify(intl.formatMessage({id: 'unknown_error'}))
    }

    setIsLoading(false)
  }


  if (isLoading) return <Loading />

  const body = (
    <>
      {
        !themesList?.length ? (
          <FlexBox content='center' width='100%'>
            <EmptyTitle errorText={intl.formatMessage({id: 'list_is_empty'})} />
          </FlexBox>
        ) : (
          <>
            <FlexBox direction='column' rowGap='15px' width='100%'>
              {
                themesList.themes.map(theme => (
                  <ForumThemeItem
                    key={theme.id}
                    theme={theme}
                  />
                ))
              }
            </FlexBox>

            {themesList.length > 20 && (
              <Pagination page={page + 1} length={themesList.length} rows={20} onChangePage={setPage} />
            )}
          </>
        )
      }
    </>
  )


  const modal = isModalShow && (
    <AddForumThemeModal
      title={intl.formatMessage({id: 'topic_title'})}
      submit={addThemeHandler}
      toggleModal={toggleModal}
    />
  )


  return (
    <FlexBox direction='column' rowGap='30px'>
      <PageHeader>
        <PageTitle title={intl.formatMessage({id: 'forum'})} />

        <div className={c.headerWrap}>
          <ButtonDefault submit={openThemeModalHandler} text= {intl.formatMessage({id: 'add'})} />

          <SelectDefault
            value={activeLanguage}
            labelValue='name'
            submit={(language) => setActiveLanguage(language)}
            options={languages}
            maxWidth='200px'
          />
        </div>
      </PageHeader>


      {body}


      {modal}
    </FlexBox>
  )
}


export {
  ForumThemeList
}
