import React from 'react'
import c from './style.module.scss'
import Select from "react-select";

const customStyles = {
  container: (provided) => ({
    ...provided,
    marginTop: 100
  }),
  option: (provided, state) => ({
    ...provided,
    background: !state.isSelected ? '#272B37' : 'linear-gradient(180deg, #69FFB7 0%, #00CE6B 36.98%, #008344 100%)',
    padding: 10,
    color: "#fff !important",
    zIndex: 1000,
  }),
  control: (provided) => ({
    ...provided,
    width: '100%',
    backgroundColor: "#272B37",
    border: '1px solid #00CE6B !important',
    boxShadow: 'none',
    color: "#fff",
    outline: 'none',
    cursor: 'pointer'
  }),
  menu: (provided) => ({
    ...provided,
    padding: 0,
    margin: 0,
    backgroundColor: "#272B37",
    transform: 'translateY(5px)',
    zIndex: 150
  }),
  input: (provided) => ({
    ...provided,
    color: '#fff'
  }),
}


const FormikSelect = ({form, value, name, placeholder = '', options, labelValue, isDisabled, maxWidth}) => {

  const selectStyles = {
    ...customStyles,
    container: (provided) => ({
      ...provided,
      maxWidth: maxWidth ? maxWidth : '100%',
      width: '100%',
      minWidth: '200px'
    }),
    singleValue: (provided) => ({
      ...provided,
      color: '#fff',
    }),
  }

  if (value) {
    value.label = value[labelValue]
    if (value.value === undefined || value.value === null) {
      value.value = value[labelValue]

    }
  }

  const optionsValue = options.map(item => {
    item.label = item[labelValue]

    if (item.value === undefined || item.value === null) {
      item.value = item[labelValue]
    }

    return item
  })

  return (
    <Select
      styles={selectStyles}
      className={c.select}
      value={value}
      options={optionsValue}
      onChange={(val) => form.setFieldValue(name, val)}
      placeholder={placeholder}
      disabled={isDisabled}
    />
  )
}


export {
  FormikSelect
}
