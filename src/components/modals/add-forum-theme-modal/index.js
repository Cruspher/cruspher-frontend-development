import React, {useEffect} from 'react'
import {useIntl} from "react-intl";
import {Modal} from "../../cruspher-ui/modal";
import {useFormik} from "formik";
import {FormikField} from "../../cruspher-ui/formik/formik-field";
import {NeonButton} from "../../cruspher-ui/buttons/neon-button";
import {newThemeSchema} from "./theme.schema";
import c from './style.module.scss'


const AddForumThemeModal = ({toggleModal, submit, title, item, itemLabel}) => {
  const intl = useIntl()
  const formik = useFormik({
    initialValues: {
      title: '',
    },
    validationSchema: newThemeSchema,
    onSubmit: () => {
      sendThemeHandler()
    }
  })

  useEffect(() => {
    if (item) {
      formik.setFieldValue('title', item[itemLabel])
    }
  }, [])

  const sendThemeHandler = async () => {
    submit({
      item: item ? item : null,
      title: formik.values.title
    })
  }

  return (
    <Modal toggleModal={toggleModal}>
      <div className={c.wrap}>
        <h3 className={c.title}>{title}</h3>
        <FormikField
          form={formik}
          value={formik.values.title}
          submit={formik.handleChange}
          name='title'
          placeholder={title}
        />

        <NeonButton submit={() => formik.submitForm()} variant='add'>
          {
            intl.formatMessage({id: item ? 'edit' : 'add'})
          }
        </NeonButton>
      </div>
    </Modal>
  )
}

export {
  AddForumThemeModal
}
