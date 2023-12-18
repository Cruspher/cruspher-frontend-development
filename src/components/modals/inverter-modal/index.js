import React, {useContext, useEffect, useState} from 'react'
import c from './style.module.scss'
import {Modal} from "../../cruspher-ui/modal";
import {Wrap} from "../../cruspher-ui/wrappers/wrap";
import {PageTitle} from "../../cruspher-ui/title";
import {SelectDefault} from "../../cruspher-ui/selects/select";
import {PageHeader} from "../../items/page-header";
import {useIntl} from "react-intl";
import {toast} from "react-toastify";
import {getUserElementsRequest, setUserElementDefault} from "../../../actions/shop";
import {Loading} from "../../cruspher-ui/loading";
import {GridBox} from "../../cruspher-ui/box/grid-box";
import {AuthContext} from "../../../context/AuthContext";
import jwtDecode from "jwt-decode";
import {ShopItem} from "../../items/shop-item";


const InverterModal = ({toggleModal}) => {
  const intl = useIntl()
  const auth = useContext(AuthContext)
  const {userId} = jwtDecode(auth.token)
  const [isLoading, setIsLoading] = useState(false)
  const [shopElementsList, setShopElementsList] = useState([])
  const [usedIds, setUsedIds] = useState([])
  const [elementTypeValue, setElementTypeValue] = useState({
    value: 'playerForm',
    title: intl.formatMessage({id: 'playerForm'})
  })

  useEffect(() => {
    getShopElementsHandler()
  }, [elementTypeValue])

  const notify = text => toast(text)

  const getShopElementsHandler = async () => {
    setIsLoading(true)

    const data = await getUserElementsRequest({userId, type: elementTypeValue.value})

    if (data) {
      setShopElementsList(data.elements)
      setUsedIds(data.usedIds)
    } else {
      notify(intl.formatMessage({id: 'unknown_error'}))
    }

    setIsLoading(false)
  }

  const setUserElementHandler = async (item) => {
    setIsLoading(true)

    const data = await setUserElementDefault({userId, elementId: item.id})

    if (data) {
      setIsLoading(false)
      notify(intl.formatMessage({id: "element_success_chosen"}))
      toggleModal()
    } else {
      notify(intl.formatMessage({id: "unknown_error"}))
    }

    setIsLoading(false)
  }

  const elementsTypesOptions = [
    {
      value: 'playerForm',
      title: intl.formatMessage({id: 'playerForm'})
    },
    {
      value: 'goalkeeperForm',
      title: intl.formatMessage({id: 'goalkeeperForm'})
    },
    {
      value: 'stadium',
      title: intl.formatMessage({id: 'stadium'})
    }
  ]

  const body = isLoading ? (
    <Loading />
  ) : (
    <GridBox rowGap='30px'>
      <PageHeader>
        <PageTitle title={intl.formatMessage({id: 'inverter'})}/>

        <SelectDefault
          value={elementTypeValue}
          labelValue='title'
          submit={(val) => setElementTypeValue(val)}
          options={elementsTypesOptions}
          maxWidth='200px'
        />
      </PageHeader>

      <div className={c.wrap}>
        {
          shopElementsList.map((item, index) => (
            <ShopItem
              submit={setUserElementHandler}
              isActive={!usedIds.includes(item.id)}
              item={item}
              key={index}
              submitText={intl.formatMessage({id: 'choose'})}
            />
          ))
        }
      </div>
    </GridBox>
  )


  return (
    <Modal toggleModal={toggleModal} type='noPadding'>
      <Wrap vPadding='50px'>
        {body}
      </Wrap>
    </Modal>
  )
}


export {
  InverterModal
}