import React, {useEffect, useState} from 'react'
import {useIntl} from "react-intl";
import {toast} from "react-toastify";
import {AdminSocialItem} from "../../items/admin-social-item";
import {FlexBox} from "../../cruspher-ui/box/flexbox";
import {AdminSocialModal} from "../../modals/admin-social-modal";
import {getSocialsRequest} from "../../../actions/social";
import {Loading} from "../../cruspher-ui/loading";
import {PageTitle} from "../../cruspher-ui/title";
import c from './style.module.scss'
import {ButtonDefault} from "../../cruspher-ui/buttons/button-default";


const AdminSocialList = () => {
  const intl = useIntl()
  const notify = (text) => toast(text)
  const [isLoading, setIsLoading] = useState(false)
  const [socialList, setSocialList] = useState([])
  const [isModalShow, setIsModalShow] = useState(false)
  const listToShow = socialList.filter(item => item.isActive)

  useEffect(() => {
    getSocialsHandler()
  }, [isModalShow])

  const toggleModal = () => setIsModalShow(!isModalShow)

  const getSocialsHandler = async () => {
    if (isModalShow) return
    setIsLoading(true)

    const data = await getSocialsRequest()
    if (data) {
      setSocialList(data)
    } else {
      notify(intl.formatMessage({id: 'unknown_error'}))
    }

    setIsLoading(false)
  }


  const modal = isModalShow && (
    <AdminSocialModal social={socialList} toggleModal={toggleModal}/>
  )


  const body = isLoading ? (
    <Loading/>
  ) : (
    <div className={c.list}>
      {
        listToShow.map(social => <AdminSocialItem key={Math.random().toString()} {...{social}} />)
      }
    </div>

  )

  return (
    <FlexBox direction='column' rowGap='30px'>
      <FlexBox width='100%' content='space-between' items='center'>
        <PageTitle title={intl.formatMessage({id: 'social'})} />

        <ButtonDefault submit={toggleModal} text={intl.formatMessage({id: 'edit'})} />

      </FlexBox>

      {body}
      {modal}
    </FlexBox>
  )
}


export {
  AdminSocialList
}

