import React, {useEffect, useState} from 'react'
import c from './style.module.scss'
import {PageTitle} from "../../cruspher-ui/title";
import {useFormik} from "formik";
import {FormikTitleWrap} from "../../cruspher-ui/formik/formik-title-wrap";
import {Dropzone} from "../../cruspher-ui/formik/dropzone";
import {NewsViewsLanguage} from "./components/news-views-language";
import {useIntl} from "react-intl";
import {toast} from "react-toastify";
import {
  addNewsRequest,
  editNewsRequest,
  getNewsAdminRequest,
  getNewsLanguagesRequest,
  removeNewsRequest
} from "../../../actions/news";
import {Loading} from "../../cruspher-ui/loading";
import {sortArrayByValueHelper} from "../../../helpers/other";
import {NeonButton} from "../../cruspher-ui/buttons/neon-button";
import {useLocation, useNavigate} from "react-router-dom";
import {APPRoutes} from "../../../const/APP-routes";
import {PageHeader} from "../../items/page-header";
import {newsSchema} from "./news.schema";


const NewsForm = ({isEdit}) => {
  const intl = useIntl()
  const location = useLocation();
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(false)
  const form = useFormik({
    initialValues: {
      id: '',
      image: null,
      imagePreview: null
    },
    validationSchema: newsSchema,
    onSubmit: () => addNewsHandler()
  })
  const [languageForm, setLanguageForm] = useState(null)

  useEffect(() => {
    getDataHandler()
  }, [])

  const notify = text => toast(text)

  const getDataHandler = async () => {
    setIsLoading(true)

    const data = await getNewsLanguagesRequest()

    if (data) {
      const sortedData = sortArrayByValueHelper(data.languages, 'isDefault')

      const transformedLanguage = {}
      sortedData.forEach(item => {
        transformedLanguage[item.name] = {
          id: item.id,
          name: item.name,
          isActive: item.isDefault,
          isDefault: item.isDefault,
          title: '',
          content: ''
        }
      })

      if (isEdit) {
        const newsId = location.pathname.split('/')[location.pathname.split('/').length - 1]
        const {news} = await getNewsAdminRequest(newsId)

        if (news) {
          await form.setValues({
            id: news.id,
            image: news.image,
            imagePreview: process.env.REACT_APP_API_URL + news.image
          })

          news.content.forEach(item => {
            transformedLanguage[item.language.name] = {
              id: item.language.id,
              name: item.language.name,
              isActive: true,
              isDefault: transformedLanguage[item.language.name].isDefault,
              title: item.title,
              content: item.content
            }
          })

          setLanguageForm(transformedLanguage)
        }
        else {
          notify(intl.formatMessage({id: "unknown_error"}))
        }
      }
      else {
        setLanguageForm(transformedLanguage)
      }


    }
    else {
      notify(intl.formatMessage({id: "unknown_error"}))
    }

    setIsLoading(false)
  }

  const changeFormValue = (language, type, value) => {
    const newValue = {...languageForm}
    newValue[language][type]= value
    setLanguageForm(newValue)
  }

  const addNewsHandler = async () => {
    setIsLoading(true)
    const valuesToSend = []

    let isHaveError = false
    Object.values(languageForm).filter(item => item.isActive).forEach(item => {
      if (item.title.length < 1 || item.content.length < 1) {
        isHaveError = true
      }
    })
    if (isHaveError) {
      setIsLoading(false)
      return  notify(intl.formatMessage({id: 'please_check_content'}))
    }

    Object.keys(languageForm).forEach(key => {
      if (languageForm[key].isActive) {
        valuesToSend.push({
          languageId: languageForm[key].id,
          title: languageForm[key].title,
          content: languageForm[key].content
        })
      }
    })

    const formData = new FormData()
    formData.append('image', form.values.image)
    formData.append('content', JSON.stringify(valuesToSend))

    if (isEdit) {
      formData.append('newsId', form.values.id)
      const data = await editNewsRequest(formData)

      if (data) {
        notify(intl.formatMessage({id: "success_edited"}))
        navigate(APPRoutes.adminNews)
      } else {
        notify(intl.formatMessage({id: "unknown_error"}))
      }
    } else {
      const data = await addNewsRequest(formData)
      if (data) {
        notify(intl.formatMessage({id: "success_added"}))
        navigate(APPRoutes.adminNews)
      } else {
        notify(intl.formatMessage({id: "unknown_error"}))
      }
    }

    setIsLoading(false)
  }


  const removeNewsHandler = async () => {
    if (!isEdit) return

    setIsLoading(true)

    const data = await removeNewsRequest(form.values.id)

    if (data) {
      notify(intl.formatMessage({id: "success_removed"}))
      navigate(APPRoutes.adminNews)
    } else {
      notify(intl.formatMessage({id: "unknown_error"}))
    }

    setIsLoading(false)
  }

  if (isLoading) return <Loading />


  return (
    <div className={c.wrap}>
      <PageHeader>
        <PageTitle title={intl.formatMessage({id: isEdit ? 'edit_news' : 'add_news'})} />


        <div className={c.buttonWrap}>
          {isEdit && (
            <NeonButton variant='remove' submit={removeNewsHandler}>{intl.formatMessage({id: 'remove'})}</NeonButton>
          )}
          <NeonButton variant='add' submit={form.submitForm}>
            {intl.formatMessage({id: !isEdit ? 'add' : 'edit'})}
          </NeonButton>
        </div>
      </PageHeader>

      <FormikTitleWrap title='Image'>
        <Dropzone
          form={form}
          value={form.values.image}
          name='image'
          imagePreview={'imagePreview'}
        />
      </FormikTitleWrap>


      {
        languageForm && Object.keys(languageForm).map(key => (
            <NewsViewsLanguage changeFormValue={changeFormValue} key={key} language={languageForm[key]} />
        ))
      }

    </div>
  )
}


export {
  NewsForm
}