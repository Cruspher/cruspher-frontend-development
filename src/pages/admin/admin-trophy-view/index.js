import React, {useEffect, useState} from 'react'
import {LayoutDefault} from "../../../components/layouts/layout-default";
import {PageTitle} from "../../../components/cruspher-ui/title";
import {useIntl} from "react-intl";
import {GridBox} from "../../../components/cruspher-ui/box/grid-box";
import {NeonButton} from "../../../components/cruspher-ui/buttons/neon-button";
import {useFormik} from "formik";
import {PageHeader} from "../../../components/items/page-header";
import {Dropzone} from "../../../components/cruspher-ui/formik/dropzone";
import {FormikField} from "../../../components/cruspher-ui/formik/formik-field";
import {FormikTitleWrap} from "../../../components/cruspher-ui/formik/formik-title-wrap";
import {FormikData} from "../../../components/cruspher-ui/formik/formik-data";
import {Wrap} from "../../../components/cruspher-ui/wrappers/wrap";
import {trophySchema} from "./trophy.schema";
import {addTrophyRequest, editTrophyRequest, getTrophyRequest} from "../../../actions/trophy";
import {useNavigate} from "react-router-dom";
import {toast} from "react-toastify";
import {APPRoutes} from "../../../const/APP-routes";
import {Loading} from "../../../components/cruspher-ui/loading";


const AdminTrophyViewPage = ({isEdit}) => {
  const [isLoading, setIsLoading] = useState(false)
  const intl = useIntl()
  const navigate = useNavigate()
  const form = useFormik({
    initialValues: {
      id: null,
      coach: '',
      title: '',
      date: new Date(),
      image: null,
      imagePreview: null
    },
    validationSchema: trophySchema,
    onSubmit: (values) => submitHandler(values)
  })


  useEffect(() => {
    if (!isEdit) return
    getDataHandler()
  }, [])

  const notify = text => toast(text)

  const getDataHandler = async () => {
    if (isLoading) return
    setIsLoading(true)

    const trophyId = window.location.pathname.split('/')[window.location.pathname.split('/').length - 1] * 1

    const {trophy} = await getTrophyRequest(trophyId)

    if (trophy) {
      await form.setValues({
        id: trophy.id,
        title: trophy.title,
        image: trophy.image,
        imagePreview: process.env.REACT_APP_API_URL + trophy.image,
        coach: trophy.coach,
        date: trophy.date
      })
    } else {
      notify(intl.formatMessage({id: "unknown_error"}))
    }

    setIsLoading(false)
  }

  const submitHandler = async (values) => {
    if (isLoading) return
    setIsLoading(true)

    if (isEdit) {
      const formData = new FormData()
      formData.append('id', values.id)
      formData.append('title', values.title)
      formData.append('coach', values.coach)
      formData.append('date', values.date.toString())

      if (!values.imagePreview) {
        formData.append('image', values.image)
      }

      const data = await editTrophyRequest(formData)

      if (data) {notify(intl.formatMessage({id: "success_edited"}))
        navigate(APPRoutes.adminTrophy)
      } else {
        notify(intl.formatMessage({id: "unknown_error"}))
      }

    } else {
      const formData = new FormData()
      formData.append('title', values.title)
      formData.append('coach', values.coach)
      formData.append('date', values.date.toString())
      formData.append('image', values.image)

      const data = await addTrophyRequest(formData)

      if (data) {notify(intl.formatMessage({id: "success_added"}))
        navigate(APPRoutes.adminTrophy)
      } else {
        notify(intl.formatMessage({id: "unknown_error"}))
      }
    }


    setIsLoading(false)
  }

  const body = isLoading ? (
    <Loading />
  ) : (
    <GridBox rowGap='30px'>
      <PageHeader>
        <PageTitle title={intl.formatMessage({id: isEdit ? 'edit_trophy' : 'add_trophy'})} />

        <NeonButton submit={() => form.submitForm()} variant='add'>
          {intl.formatMessage({id: isEdit ? 'edit' : 'add'})}
        </NeonButton>
      </PageHeader>

      <FormikTitleWrap title={intl.formatMessage({id: "image"})}>
        <Dropzone value={form.values.image} form={form} imagePreview={'imagePreview'} name='image' />
      </FormikTitleWrap>

      <FormikTitleWrap title={intl.formatMessage({id: "cup_name"})}>
        <FormikField
          form={form}
          value={form.values.title}
          submit={form.handleChange}
          name='title'
          placeholder={intl.formatMessage({id: "cup_name"})}
        />
      </FormikTitleWrap>

      <FormikTitleWrap title={intl.formatMessage({id: "coach"})}>
        <FormikField
          form={form}
          value={form.values.coach}
          submit={form.handleChange}
          name='coach'
          placeholder={intl.formatMessage({id: "coach"})}
        />
      </FormikTitleWrap>

      <FormikTitleWrap title={intl.formatMessage({id: "date"})}>
        <FormikData
          form={form}
          value={form.values.date}
          submit={form.handleChange}
          name='date'
          placeholder={intl.formatMessage({id: "date"})}
          onlyDate={true}
        />
      </FormikTitleWrap>
    </GridBox>
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
  AdminTrophyViewPage
}