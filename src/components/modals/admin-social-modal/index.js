import React, {useState} from 'react';
import {toast} from "react-toastify";
import {useIntl} from "react-intl";
import {Modal} from "../../cruspher-ui/modal";
import {useFormik} from "formik";
import {SocialEditableItem} from "../../items/social-editable-item";
import {NeonButton} from "../../cruspher-ui/buttons/neon-button";
import {addSocialsRequest} from "../../../actions/social";
import c from './style.module.scss'
import {FlexBox} from "../../cruspher-ui/box/flexbox";
import {Loading} from "../../cruspher-ui/loading";


const AdminSocialModal = ({toggleModal, social}) => {
  const [isLoading, setIsLoading] = useState(false)
  const intl = useIntl()
  const notify = text => toast(text)
  const form = useFormik({
    initialValues: {
      list: [...social]
    }
  })

  const onSaveHandler = async () => {
    if (isLoading) return
    setIsLoading(true)

    const data = await addSocialsRequest([...form.values.list])

    if (data) {
      notify(intl.formatMessage({id: 'social_success_updated'}))
      toggleModal()
    } else {
      notify(intl.formatMessage({id: 'unknown_error'}))
    }

    setIsLoading(false)
  }

  const body = isLoading ? (
    <Loading />
  ) : (
    <FlexBox direction='column' rowGap='30px'>
      <div className={c.container}>
        {
          form.values.list.map((item, index) => <SocialEditableItem index={index} key={index} form={form} item={item} /> )
        }
      </div>

      <NeonButton submit={onSaveHandler} center={true} variant='add'>
        {intl.formatMessage({id: 'save'})}
      </NeonButton>
    </FlexBox>
  )

  return (
    <Modal toggleModal={toggleModal}>
      {body}
    </Modal>
  )
}


export {
  AdminSocialModal
}
