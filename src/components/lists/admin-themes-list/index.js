import React, {useEffect, useState} from 'react'
import {ThemesActive} from "../themes-active";
import {
  confirmThemeRequest, editForumThemeRequest,
  getForumLanguagesRequest,
  getForumThemesRequest,
  removeThemeRequest
} from "../../../actions/forum";
import c from './style.module.scss'
import {useIntl} from "react-intl";
import {toast} from "react-toastify";
import {SelectDefault} from "../../cruspher-ui/selects/select";
import {PageHeader} from "../../items/page-header";
import {PageTitle} from "../../cruspher-ui/title";
import {AddForumThemeModal} from "../../modals/add-forum-theme-modal";
import {GridBox} from "../../cruspher-ui/box/grid-box";


const AdminThemesList = () => {
  const intl = useIntl()
  const [isLoading, setIsLoading] = useState(false)
  const [activeThemes, setActiveThemes] = useState(null)
  const [activeThemesPage, setActiveThemesPage] = useState(0)
  const [disActiveThemes, setDisActiveThemes] = useState(null)
  const [disActiveThemesPage, setDisActiveThemesPage] = useState(0)
  const [languages, setLanguages] = useState([])
  const [activeLanguage, setActiveLanguage] = useState(null)
  const [themeToEdit, setThemeToEdit] = useState(null)
  const [isEditModalShow, setIsEditModalShow] = useState(false)

  useEffect(() => {
    if (!activeLanguage) return
    getThemesHelper()
  }, [activeThemesPage, disActiveThemesPage, activeLanguage])

  useEffect(() => {
    getLanguagesHandler()
  }, [])

  const notify = text => toast(text)
  const toggleEditModal = () => setIsEditModalShow(!isEditModalShow)

  const getLanguagesHandler = async () => {
    setIsLoading(true)

    const data = await getForumLanguagesRequest()

    if (data) {
      setIsLoading(false)

      setLanguages(data.languages)

      const activeLanguage = data.languages.filter(item => !!item.isDefault)
      setActiveLanguage(activeLanguage[0])
    } else {
      notify(intl.formatMessage({id: 'unknown_error'}))
    }

    setIsLoading(false)
  }

  const getThemesHelper = async () => {
    await getDisabledThemesHandler(disActiveThemesPage, false)
    await getDisabledThemesHandler(activeThemesPage, true)
  }

  const getDisabledThemesHandler = async (pageValue, isActive) => {
    setIsLoading(true)
    const data = await getForumThemesRequest({page:pageValue, isConfirmed: isActive, languageId: activeLanguage.id})

    if (data) {
      if (isActive) {
        setActiveThemes(data)
      } else {
        setDisActiveThemes(data)
      }
    } else {
      notify(intl.formatMessage({id: 'unknown_error'}))
    }

    setIsLoading(false)
  }

  const changeIsConfirmedHandler = async (id, status) => {
    const isOk = await confirmThemeRequest({themeId: id, isConfirmed: status})

    if (isOk) {
      setDisActiveThemesPage(0)
      setActiveThemesPage(0)
      getThemesHelper()
    } else {
      notify(intl.formatMessage({id: 'unknown_error'}))
    }
  }

  const removeThemeHandler = async (id) => {
    setIsLoading(true)

    const data = await removeThemeRequest(id)

    if (data) {
      notify(intl.formatMessage({id: "success_removed"}))
      setIsLoading(false)
      return getThemesHelper()
    } else {
      notify(intl.formatMessage({id: "unknown_error"}))
    }

    setIsLoading(false)
  }

  const editThemeHandler = (item) => {
    setThemeToEdit(item)
    setIsEditModalShow(true)
  }

  const editTheme = async (val) => {
    setIsLoading(true)

    const data = await editForumThemeRequest({id: val.item.id, title: val.title})

    if (data) {
      setIsLoading(false)
      intl.formatMessage({id: "success_edited"})
      toggleEditModal()
      return getThemesHelper()
    } else {
      notify(intl.formatMessage({id: "unknown_error"}))
    }

    setIsLoading(false)
  }

  const editModal = isEditModalShow && (
    <AddForumThemeModal
      submit={editTheme}
      item={themeToEdit}
      toggleModal={toggleEditModal}
      title={intl.formatMessage({id: 'topic_title'})}
      itemLabel='title'
    />
  )

  return (
    <GridBox rowGap="30px">
      <PageHeader>
        <PageTitle title={intl.formatMessage({id: 'forum'})} />

        <SelectDefault
          value={activeLanguage}
          labelValue='name'
          submit={(language) => setActiveLanguage(language)}
          options={languages}
          maxWidth='200px'
        />
      </PageHeader>

      <div className={c.container}>
        <div>
          <ThemesActive
            themesList={activeThemes}
            isLoading={isLoading}
            page={activeThemesPage}
            setPage={setActiveThemesPage}
            submit={changeIsConfirmedHandler}
            isActive={false}
            title={intl.formatMessage({id: 'active_themes'})}
            removeThemeHandler={removeThemeHandler}
            editThemeHandler={editThemeHandler}
          />
        </div>


        <div>
          <ThemesActive
            themesList={disActiveThemes}
            isLoading={isLoading}
            page={disActiveThemesPage}
            setPage={setDisActiveThemesPage}
            submit={changeIsConfirmedHandler}
            isActive={true}
            title={intl.formatMessage({id: 'disabled_themes'})}
            removeThemeHandler={removeThemeHandler}
            editThemeHandler={editThemeHandler}
          />
        </div>

        {editModal}
      </div>
    </GridBox>
  )
}


export {
  AdminThemesList
}