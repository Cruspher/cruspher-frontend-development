import React from 'react'
import {FormikBoxFormItem} from "./components/formik-box-form-item";
import c from './style.module.scss'


const FormikBoxForm = ({form, name}) => {

  return (
    <div className={c.wrap}>
      {
        [1,2,3].map(item => (
          <FormikBoxFormItem form={form} name={name} item={item} key={item} />
        ))
      }
    </div>
  )
}


export {
  FormikBoxForm
}