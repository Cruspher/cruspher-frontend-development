import React from 'react'
import {FlexBox} from "../../cruspher-ui/box/flexbox";
import {FormikField} from "../../cruspher-ui/formik/formik-field";
import {FlipCheckbox} from "../../cruspher-ui/checkboxes";
import c from './style.module.scss'


const SocialEditableItem = ({form, index, item}) => {
  const isUsedHandler = (val) => {
    const newValues = form.values.list.map(socialItem => {
      if (socialItem.name === item.name) {
        return {
          ...socialItem,
          isActive: val
        }
      } else {
        return socialItem
      }
    })

    form.setFieldValue('list', newValues)
  }

  const submitHandler = (val) => {
    const newValues = form.values.list.map(socialItem => {
      if (socialItem.name === item.name) {
        return {
          ...socialItem,
          link: val
        }
      } else {
        return socialItem
      }
    })
    form.setFieldValue('list', newValues)
  }

  return (
    <FlexBox direction='column' rowGap='5px'>
      <FlexBox items='center' columnGap='10px'>
        <h3 className={c.title}>{item.name}</h3>
        <FlipCheckbox value={item.isActive} submit={isUsedHandler}  />
      </FlexBox>
      <FormikField
        form={form}
        defaultSubmit={(e => submitHandler(e.target.value))}
        value={item.link}
        name={item.name}
        placeholder={`${item.name}...`}
      />
    </FlexBox>
  )
}


export {
  SocialEditableItem
}
