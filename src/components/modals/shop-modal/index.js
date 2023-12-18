import React, {useContext, useEffect, useState} from 'react'
import {Modal} from "../../cruspher-ui/modal";
import c from './style.module.scss'
import {useIntl} from "react-intl";
import {toast} from "react-toastify";
import {buyShopElementRequest, getShopElementsForUserRequest} from "../../../actions/shop";
import {PageTitle} from "../../cruspher-ui/title";
import {SelectDefault} from "../../cruspher-ui/selects/select";
import {PageHeader} from "../../items/page-header";
import {GridBox} from "../../cruspher-ui/box/grid-box";
import {Loading} from "../../cruspher-ui/loading";
import {Wrap} from "../../cruspher-ui/wrappers/wrap";
import {ShopItem} from "../../items/shop-item";
import {AuthContext} from "../../../context/AuthContext";
import jwtDecode from "jwt-decode";
import {Pagination} from "../../cruspher-ui/pagination";
import coinIcon from '../../../assets/image/icons/coins.png'


const ShopModal = ({toggleModal, coins}) => {
  const intl = useIntl()
  const auth = useContext(AuthContext)
  const {userId} = jwtDecode(auth.token)
  const [isLoading, setIsLoading] = useState(false)
  const [page, setPage] = useState(0)
  const [shopElementsList, setShopElementsList] = useState({data: [], length: 0})
  const [elementTypeValue, setElementTypeValue] = useState({
    value: 'playerForm',
    title: intl.formatMessage({id: 'playerForm'})
  })


  useEffect(() => {
    getShopElementsHandler()
  }, [page, elementTypeValue])

  const notify = text => toast(text)

  const getShopElementsHandler = async () => {
    setIsLoading(true)

    const data = await getShopElementsForUserRequest({page, type: elementTypeValue.value})

    if (data) {
      setShopElementsList(data)
    } else {
      notify(intl.formatMessage({id: 'unknown_error'}))
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

  const buyElementHandler = async (item) => {
    setIsLoading(true)

    const data = await buyShopElementRequest({elementId: item.id, userId})

    if (data) {
      if (data.isUserHave) {
        notify(intl.formatMessage({id: "you_already_have_this_element"}))
      } else {
        setIsLoading(false)
        notify(intl.formatMessage({id: "success_bought_check_your_inverter"}))
        toggleModal()
      }
    } else {
      notify(intl.formatMessage({id: "unknown_error"}))
    }

    setIsLoading(false)
  }

  const body = isLoading ? (
    <Loading/>
  ) : (
    <Wrap vPadding='50px'>
      <GridBox rowGap='30px'>
        <PageHeader>
          <PageTitle title={intl.formatMessage({id: 'shop'})}/>

          <div className={c.selectWrap}>
            <div className={c.priceWrap}>
              <span className={c.price}>
                {coins}
              </span>

              <img src={coinIcon} alt=""/>
            </div>

            <SelectDefault
              value={elementTypeValue}
              labelValue='title'
              submit={(val) => setElementTypeValue(val)}
              options={elementsTypesOptions}
              maxWidth='200px'
            />
          </div>
        </PageHeader>

        <GridBox rowGap='30px'>
          <div className={c.wrap}>
            {
              shopElementsList.data.map((item, index) => (
                <ShopItem
                  submit={buyElementHandler}
                  isActive={coins >= item.price}
                  item={item}
                  key={index}
                  submitText={intl.formatMessage({id: 'buy'})}
                />
              ))
            }
          </div>

          {
            shopElementsList.length > 18 && (
              <Pagination page={page + 1} length={shopElementsList.length} onChangePage={setPage} rows={18} />
            )
          }
        </GridBox>
      </GridBox>
    </Wrap>
  )

  return (
    <Modal type='noPadding' toggleModal={toggleModal}>
      {body}
    </Modal>
  )
}

export {
  ShopModal
}

