import React from 'react'
import c from './styles.module.scss'
import { DatePicker } from 'react-rainbow-components';

const FormikData = ({value, form, name}) => {

  return (
    <>
      <DatePicker
        value={value}
        onChange={val => {form.setFieldValue(name, val)}}
        label="DatePicker Label"
        formatStyle="large"
        locale={'en-US'}
        className={c.picker}
        hideLabel={true}
        minDate={new Date("01-01-1850")}
        maxDate={new Date("03-29-2050")}
      />
    </>
  )
}


export {FormikData}
