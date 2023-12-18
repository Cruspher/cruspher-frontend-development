import React, {useContext, useEffect, useState} from 'react'
import c from './style.module.scss'
import {Modal} from "../../cruspher-ui/modal";
import {Wrap} from "../../cruspher-ui/wrappers/wrap";
import {FlexBox} from "../../cruspher-ui/box/flexbox";
import {useIntl} from "react-intl";
import {toast} from "react-toastify";
import {
  buyUserBoxRequest,
  getBoxElementsRequest,
  openUserBoxRequest,
} from "../../../actions/shop";
import {Loading} from "../../cruspher-ui/loading";
import {GridBox} from "../../cruspher-ui/box/grid-box";
import {AuthContext} from "../../../context/AuthContext";
import jwtDecode from "jwt-decode";
import {ShopItem} from "../../items/shop-item";
import {BoxFleshItem} from "../../items/box-flesh-item";
import {Pagination} from "../../cruspher-ui/pagination";
import lootBoxImage from '../../../assets/image/icons/lootbox.png'
import keyImage from '../../../assets/image/icons/key.png'
import {CoinIcon} from "../../cruspher-ui/icons/default";


const BoxModal = ({toggleModal, boxValue, coins, setUserData, userData}) => {
  const intl = useIntl()
  const auth = useContext(AuthContext)
  const {userId} = jwtDecode(auth.token)
  const [isLoading, setIsLoading] = useState(false)
  const [page, setPage] = useState(0)
  const [shopElementsList, setShopElementsList] = useState({data: [], length: 0})
  const [openedBox, setOpenedBox] = useState(null)
  const buyClass = !(coins > 400) ? c.boxWrap : `${c.boxWrap} ${c.boxWrapActive}`
  const openClass = !(boxValue > 0) ? c.boxWrap : `${c.boxWrap} ${c.boxWrapActive}`

  useEffect(() => {
    getBoxElementsHandler()
  }, [page])

  const notify = text => toast(text)

  const getBoxElementsHandler = async () => {
    setIsLoading(true)

    const data = await getBoxElementsRequest({page})

    if (data) {
      setShopElementsList(data)
    } else {
      notify(intl.formatMessage({id: "unknown_error"}))
    }

    setIsLoading(false)
  }

  const openBoxHandler = async () => {
    if (boxValue < 1) return
    setIsLoading(true)

    const data = await openUserBoxRequest({userId})

    if (data) {
      setOpenedBox(data.chosenValue)
    } else {
      notify(intl.formatMessage({id: "unknown_error"}))
    }

    setIsLoading(false)
  }

  const buyBoxHandler = async () => {
    if (coins < 400) return
    setIsLoading(true)

    const data = await buyUserBoxRequest({userId})

    if (data?.isOk) {
      setUserData({
        ...userData,
        coins: userData.coins - 400,
        box: userData.box + 1
      })
      notify(intl.formatMessage({id: "bux_success_bought"}))
    } else {
      notify(intl.formatMessage({id: "unknown_error"}))
    }

    setIsLoading(false)
   }

  const body = isLoading ? (
    <Loading />
  ) : (
    <GridBox rowGap='30px'>

      <div className={c.actionWrap}>
        <div className={openClass}  onClick={openBoxHandler}>
          <img src={keyImage} alt=""/>

          <span className={c.boxValue}>
            {boxValue}
          </span>
        </div>

        <div onClick={buyBoxHandler} className={buyClass}>
          <img src={lootBoxImage} alt=""/>

          <FlexBox items='center' columnGap='5px'>
            <span>
              400
            </span>

            <CoinIcon />
          </FlexBox>
        </div>
      </div>

      <GridBox rowGap='30px'>
        <div className={c.wrap}>
          {
            shopElementsList.data.map((item, index) => (
              <ShopItem
                item={item} submit={() => {}}
                isActive={false}
                submitText={intl.formatMessage({id: item.type})}
              />
            ))
          }
        </div>

        <Pagination rows={18} page={page + 1} onChangePage={setPage} length={shopElementsList.length} />
      </GridBox>

      {openedBox !== null && <BoxFleshItem item={openedBox} />}
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
  BoxModal
}