import React, {useState} from 'react'
import c from './style.module.scss'
import {Modal} from "../../cruspher-ui/modal";
import {useFormik} from "formik";
import {FormikTitleWrap} from "../../cruspher-ui/formik/formik-title-wrap";
import {FormikField} from "../../cruspher-ui/formik/formik-field";
import {FormikNumber} from "../../cruspher-ui/formik/formik-number";
import {Dropzone} from "../../cruspher-ui/formik/dropzone";
import {useIntl} from "react-intl";
import {toast} from "react-toastify";
import {addFormRequest} from "../../../actions/playersForm";
import {NeonButton} from "../../cruspher-ui/buttons/neon-button";


const PlayerFormModal = ({toggleModal}) => {
  const [isLoading, setIsLoading] = useState(false)
  const intl = useIntl()
  const notify = text => toast(text)
  const form = useFormik({
    initialValues: {
      name: '',
      points: 0,
      image: null,
      preview: null
    },
    onSubmit: (values => addFormHandler(values))
  })


  const addFormHandler = async (values) => {
    setIsLoading(true)

    const formToSend = new FormData()
    formToSend.append('name', values.name)
    formToSend.append('points', values.points)
    formToSend.append('image', values.image)

    const data = await addFormRequest(formToSend)

    if (data) {
      setIsLoading(false)
      toggleModal()
    } else {
      notify(intl.formatMessage({id: "unknown_error"}))
    }

    setIsLoading(false)
  }


  return (
    <Modal toggleModal={toggleModal} type='xs'>
      <div className={c.wrap}>

        <FormikTitleWrap title='Name'>
          <FormikField
            submit={form.handleChange}
            form={form} name='name'
            value={form.values.name}
            placeholder='name...'
          />
        </FormikTitleWrap>

        <FormikTitleWrap title='Points'>
          <FormikNumber
            width='150px'
            value={form.values.points}
            form={form} name='points'
            submit={form.handleChange}
            placeholder='min points...'
          />
        </FormikTitleWrap>

        <FormikTitleWrap title={intl.formatMessage({id: 'image'})}>
          <Dropzone imagePreview={'imagePreview'} form={form} value={form.values.image} name='image'/>
        </FormikTitleWrap>

        <NeonButton submit={form.submitForm} center={true} isDisabled={isLoading} variant='add'>
          add
        </NeonButton>
      </div>
    </Modal>
  )
}


export {
  PlayerFormModal
}