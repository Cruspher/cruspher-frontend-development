import React, {useEffect, useState} from 'react'
import {useFormik} from "formik";
import {useNavigate} from "react-router-dom";
import {useIntl} from "react-intl";
import {toast} from "react-toastify";
import {LayoutDefault} from "../../../components/layouts/layout-default";
import {Wrap} from "../../../components/cruspher-ui/wrappers/wrap";
import {Dropzone} from "../../../components/cruspher-ui/formik/dropzone";
import {PageHeader} from "../../../components/items/page-header";
import {PageTitle} from "../../../components/cruspher-ui/title";
import {NeonButton} from "../../../components/cruspher-ui/buttons/neon-button";
import {FormikTitleWrap} from "../../../components/cruspher-ui/formik/formik-title-wrap";
import {FormikField} from "../../../components/cruspher-ui/formik/formik-field";
import {FormikSelect} from "../../../components/cruspher-ui/formik/formik-select";
import {FormikNumber} from "../../../components/cruspher-ui/formik/formik-number";
import {FormikBoxForm} from "../../../components/cruspher-ui/formik/formik-box-form";
import {shopElementSchema} from "./shop-element.schema";
import {addShopElementRequest, editShopElementRequest, getShopElementByIdRequest} from "../../../actions/shop";
import {Loading} from "../../../components/cruspher-ui/loading";
import {APPRoutes} from "../../../const/APP-routes";
import c from './style.module.scss'






const AdminShopElementView = ({isEdit}) => {
  const intl = useIntl()
  const [isSuperAdmin] = useState(process.env.REACT_APP_IS_SUPER_ADMIN === 'true')
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()
  const elementForm = useFormik({
    initialValues: {
      id: null,
      name: '',
      image: null,
      imagePreview: null,
      type: {
        title: intl.formatMessage({id: "playerForm"}),
        value: 'playerForm'
      },
      shopType: {
        title: intl.formatMessage({id: "shop"}),
        value: 'shop'
      },
      level: 1,
      price: 0
    },
    validationSchema: shopElementSchema,
    onSubmit: (values) => {
        sendDataHandler(values)
    }
  })

  const elementTypesOptions = [
    {
      title: intl.formatMessage({id: "playerForm"}),
      value: 'playerForm'
    },
    {
      title: intl.formatMessage({id: "goalkeeperForm"}),
      value: 'goalkeeperForm'
    },
    {
      title: intl.formatMessage({id: "stadium"}),
      value: 'stadium'
    }
  ]

  const shopTypesOptions = [
    {
      title: intl.formatMessage({id: "shop"}),
      value: 'shop'
    },
    {
      title: intl.formatMessage({id: "box"}),
      value: 'box'
    },
  ]

  useEffect(() => {
    if (!isEdit) return
    getData()
  }, [])

  const notify = text => toast(text)

  const sendDataHandler = async (values) => {
    setIsLoading(true)
    const isInShop = values.shopType.value === 'shop' ? 'true' : 'false'

    const formData = new FormData()
    formData.append('name', values.name)
    formData.append('image', values.image)
    formData.append('type', values.type.value)
    formData.append('isInShop', isInShop)

    if (isInShop === 'true') {
      formData.append('price', values.price)
    } else {
      formData.append('level', values.level)
    }

   if (isEdit) {
     formData.append('elementId', values.id)
     const data = await editShopElementRequest(formData)

     if (data) {
       notify(intl.formatMessage({id: 'success_edited'}))
       navigate(APPRoutes.adminShop)
     } else {
       notify(intl.formatMessage({id: 'unknown_error'}))
     }
   } else {
     const data = await addShopElementRequest(formData)

     if (data) {
       notify(intl.formatMessage({id: 'success_added'}))
       navigate(APPRoutes.adminShop)
     } else {
       notify(intl.formatMessage({id: 'unknown_error'}))
     }
   }

    setIsLoading(false)
  }

  const getData = async () => {
    if (isLoading) return
    setIsLoading(true)

    const path = window.location.pathname
    const elementId = path.split('/')[path.split('/').length - 1]

    const {element} = await getShopElementByIdRequest(elementId)

    if (element) {
      await elementForm.setValues({
        id: element.id,
        name: element.name,
        imagePreview: process.env.REACT_APP_API_URL + element.image,
        type: elementTypesOptions.find(item => item.value === element.type),
        shopType: element.isInShop ? shopTypesOptions[0] : shopTypesOptions[1],
        level: element.level,
        price: element.price
      })
    } else {
      notify(intl.formatMessage({id: 'unknown_error'}))
    }

    setIsLoading(false)
  }


  const priceBlock = elementForm.values.shopType.value === 'shop' ? (
    <FormikTitleWrap title={intl.formatMessage({id: "price"})}>
      <FormikNumber
        form={elementForm}
        name='price'
        value={elementForm.values.price}
        placeholder={intl.formatMessage({id: "price"})}
        submit={elementForm.handleChange}
      />
    </FormikTitleWrap>
  ) : (
    <FormikBoxForm form={elementForm} name='level' />
  )

  const body = isLoading ? (
    <Loading />
  ) : (
    <div className={c.wrap}>
      <PageHeader>
        <PageTitle title={intl.formatMessage({id: "add_shop_element"})} />

        {isSuperAdmin && (
          <NeonButton submit={elementForm.submitForm} variant='add'>
            {intl.formatMessage({id: isEdit ? 'edit' : 'add'})}
          </NeonButton>
        )}
      </PageHeader>

      <div className={c.container}>
        <Dropzone
          value={elementForm.values.image}
          form={elementForm}
          name='image'
          imagePreview={'imagePreview'}
          height='350px'
        />

        <div className={c.about}>
          <FormikTitleWrap title={intl.formatMessage({id: 'name'})}>
            <FormikField
              submit={elementForm.handleChange}
              form={elementForm}
              name='name'
              value={elementForm.values.name}
              placeholder={intl.formatMessage({id: 'name'})}
            />
          </FormikTitleWrap>

          <FormikTitleWrap title={intl.formatMessage({id: 'type'})}>
            <FormikSelect
              form={elementForm}
              name='type'
              placeholder={intl.formatMessage({id: 'type'})}
              options={elementTypesOptions}
              labelValue='title'
              value={elementForm.values.type}
            />
          </FormikTitleWrap>

          <FormikTitleWrap title={intl.formatMessage({id: 'shop_type'})}>
            <FormikSelect
              form={elementForm}
              name='shopType'
              placeholder={intl.formatMessage({id: 'shop_type'})}
              options={shopTypesOptions}
              labelValue='title'
              value={elementForm.values.shopType}
            />
          </FormikTitleWrap>

          {priceBlock}
        </div>
      </div>
    </div>
  )


  return (
    <LayoutDefault >
      <Wrap vPadding='30px'>
        {body}
      </Wrap>
    </LayoutDefault>
  )
}


export {
  AdminShopElementView
}