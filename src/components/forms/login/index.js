import React from "react";
import c from "./style.module.css";
import {FormikField} from "../../cruspher-ui/formik/formik-field";
import {useIntl} from "react-intl";


const Login = ({form, sendData}) => {
  const intl = useIntl()

  return (
    <div className={c.container}>
      <FormikField
        placeholder={intl.formatMessage({id: "email"})}
        form={form}
        value={form.email}
        name='email'
        submit={form.handleChange}
      />
      <FormikField
        type='password'
        placeholder={intl.formatMessage({id: "password"})}
        form={form}
        value={form.password}
        name='password'
        submit={form.handleChange}
        onKeyDown={(e) => {
            if (e.key.toLowerCase() === 'enter') {
                sendData()
            }
        }}
      />
    </div>
  )
}

export  {
  Login
}
