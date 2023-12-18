import React, {useContext, useEffect, useState} from 'react'
import c from './style.module.scss'
import {Modal} from "../../cruspher-ui/modal";
import {FlexBox} from "../../cruspher-ui/box/flexbox";
import {useFormik} from "formik";
import {FormikField} from "../../cruspher-ui/formik/formik-field";
import {Title} from "../../cruspher-ui/title";
import {NeonButton} from "../../cruspher-ui/buttons/neon-button";
import {userNameDataSchema} from "./user-name-data-schema";
import {AuthContext} from "../../../context/AuthContext";
import jwtDecode from "jwt-decode";
import {toast} from "react-toastify";
import {
  changeUserPasswordRequest,
  editUserNameDataRequest,
  getUserRequest
} from "../../../actions/users";
import {Loading} from "../../cruspher-ui/loading";
import {userChangePasswordSchema} from "./user-change-password-schema";
import {useIntl} from "react-intl";


const EditUserData = ({toggleModal}) => {
  const intl = useIntl()
  const notify = (text) => toast(text)
  const auth = useContext(AuthContext)
  const userId = jwtDecode(auth.token).userId
  const [isLoading, setIsLoading] = useState(false)

  const form = useFormik({
    initialValues: {
      name: '',
      surname: '',
      login: ''
    },
    validationSchema: userNameDataSchema,
    onSubmit: () => editNameDateHandler()
  })

  const passwordForm = useFormik({
    initialValues: {
      actualPassword: '',
      newPassword: '',
      newPasswordAgain: ''
    },
    validationSchema: userChangePasswordSchema,
    onSubmit: () => editUserPasswordHandler()
  })

  useEffect(() => {
    getUserNameDataHandler()
  }, [])


  const getUserNameDataHandler = async () => {
    setIsLoading(true)
    const data = await getUserRequest(userId)

    if (data) {
      await form.setValues({
        name: data.name,
        surname: data.surname,
        login: data.login
      })
    } else {
      notify(intl.formatMessage({id: 'unknown_error'}))
    }

    setIsLoading(false)
  }

  const editNameDateHandler = async () => {
    setIsLoading(true)

    const data = await editUserNameDataRequest({
      userId: userId,
      name: form.values.name,
      surname: form.values.surname,
      login: form.values.login
    })

    if (data) {
      notify(intl.formatMessage({id: 'data_changed_successfully'}))
      toggleModal()
    } else {
      notify(intl.formatMessage({id: 'unknown_error'}))
    }

    setIsLoading(false)
  }

  const editUserPasswordHandler = async () => {
    setIsLoading(true)

    const data = await changeUserPasswordRequest({
      userId: userId,
      actualPassword: passwordForm.values.actualPassword,
      newPassword: passwordForm.values.newPassword
    })

    if (data) {
      notify(intl.formatMessage({id: 'password_changed_successfully'}))
      toggleModal()
    } else {
      notify(intl.formatMessage({id: 'unknown_error'}))
    }

    setIsLoading(false)
  }



  const body = isLoading ? (
    <Loading/>
  ) : (
    <FlexBox direction='column' rowGap='50px' width='100%'>
      <FlexBox direction='column' rowGap='10px' width='100%'>
        <Title variant='h3'>
          {intl.formatMessage({id: 'name_and_surname'})}
        </Title>
        <FormikField
          form={form}
          submit={form.handleChange}
          name='name'
          value={form.values.name}
          placeholder={intl.formatMessage({id: 'name'})}
        />
        <FormikField
          form={form}
          submit={form.handleChange}
          name='surname'
          value={form.values.surname}
          placeholder={intl.formatMessage({id: 'surname'})}
        />
        <FormikField
            form={form}
            submit={form.handleChange}
            name='login'
            value={form.values.login}
            placeholder={intl.formatMessage({id: 'login_name'})}
        />
        <div className={c.buttonWrap}>
          <NeonButton submit={() => form.submitForm()} variant='add'>
            {intl.formatMessage({id: 'edit'})}
          </NeonButton>
        </div>
      </FlexBox>

      <FlexBox direction='column' rowGap='10px' width='100%'>
        <Title variant='h3'>{intl.formatMessage({id: 'password'})}</Title>
        <FormikField
          form={passwordForm}
          submit={passwordForm.handleChange}
          name='actualPassword'
          value={form.values.actualPassword}
          placeholder={intl.formatMessage({id: 'current_password'})}
        />
        <FormikField
          form={passwordForm}
          submit={passwordForm.handleChange}
          name='newPassword'
          value={passwordForm.values.newPassword}
          placeholder={intl.formatMessage({id: 'new_password'})}
        />
        <FormikField
          form={passwordForm}
          submit={passwordForm.handleChange}
          name='newPasswordAgain'
          value={passwordForm.values.newPasswordAgain}
          placeholder={intl.formatMessage({id: 'password_confirmation'})}
        />

        <div className={c.buttonWrap}>
          <NeonButton submit={() => passwordForm.submitForm()} variant='add'>
            {intl.formatMessage({id: 'edit'})}
          </NeonButton>
        </div>
      </FlexBox>
    </FlexBox>
  )


  return (
    <Modal type='xs' toggleModal={toggleModal}>
      {body}
    </Modal>
  )
}


export {
  EditUserData
}