import React, {useContext, useEffect, useState} from 'react'
import c from './style.module.scss'
import {useIntl} from "react-intl";
import {toast} from "react-toastify";
import {EditUserData} from "../../../../components/modals/edit-user-data";
import {Loading} from "../../../../components/cruspher-ui/loading";
import {GridBox} from "../../../../components/cruspher-ui/box/grid-box";
import {AuthContext} from "../../../../context/AuthContext";
import jwtDecode from "jwt-decode";
import {getUserRequest} from "../../../../actions/users";
import {getStatusByExp} from "../../../../helpers/users";
import {ShopModal} from "../../../../components/modals/shop-modal";
import {InverterModal} from "../../../../components/modals/inverter-modal";
import {BoxModal} from "../../../../components/modals/box-modal";
import {UserLineup} from "../../../../components/user-lineup";
import UserDefaultImage from '../../../../assets/image/icons/user-default.png'
import StarImage from '../../../../assets/image/icons/star.png'
import ShopImage from '../../../../assets/image/icons/shop.png'
import BoxImage from '../../../../assets/image/icons/box.png'
import InverterImage from '../../../../assets/image/icons/inverter.png'
import RankImage from '../../../../assets/image/icons/rank.png'
import CoinsImage from '../../../../assets/image/icons/coins.png'


const HomeUserData = () => {
  const auth = useContext(AuthContext)
  const {userId} = jwtDecode(auth.token)
  const intl = useIntl()
  const notify = (text) => toast(text)

  const [isModalShow, setIsModalShow] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [userData, setUserData] = useState(null)
  const [isShopShow, setIsShopShop] = useState(false)
  const [isInverterShow, setIsInverterShow] = useState(false)
  const [isBoxModalShow, setIsBoxModalShow] = useState(false)

  const toggleInverter = () => setIsInverterShow(!isInverterShow)
  const toggleShop = () => setIsShopShop(!isShopShow)
  const toggleModal = () => setIsModalShow(!isModalShow)
  const toggleBoxModal = () => setIsBoxModalShow(!isBoxModalShow)

  useEffect(() => {
    if (!isInverterShow && !isShopShow && !isModalShow && !isBoxModalShow) {
      getUserHandler()
    }
  }, [isModalShow, isInverterShow, isShopShow, isBoxModalShow])

  const getUserHandler = async () => {
    setIsLoading(true)
    const data = await getUserRequest(userId)

    if (data) {
      setUserData(data)
    } else {
      notify(intl.formatMessage({id: 'unknown_error'}))
    }

    setIsLoading(false)
  }

  if (isLoading) return <Loading/>


  const modal = isModalShow && <EditUserData toggleModal={toggleModal}/>
  const shopModal = isShopShow && <ShopModal coins={userData.coins} toggleModal={toggleShop}/>
  const inverter = isInverterShow && <InverterModal toggleModal={toggleInverter}/>
  const boxModal = isBoxModalShow && userData && (
    <BoxModal
      setUserData={setUserData}
      boxValue={userData.box}
      coins={userData.coins}
      userData={userData}
      toggleModal={toggleBoxModal}
    />
  )


  return (
    <>
      <GridBox rowGap='50px'>
        <div className={c.wrap}>
          <div className={c.container}>
            <div className={c.menu}>
              <img className={c.avatar} onClick={toggleModal} src={UserDefaultImage} alt=""/>

              <h2 className={c.name}>
                {userData.login}
              </h2>

              <div className={c.topMenu}>
                <div>
                  <img src={StarImage} alt=""/>
                  <h3>{userData.experience}</h3>
                </div>
                <div>
                  <img src={RankImage} alt=""/>
                  <h3>{intl.formatMessage({id: getStatusByExp(userData.experience)})}</h3>
                </div>
                <div>
                  <img src={CoinsImage} alt=""/>
                  <h3>{userData.coins}</h3>
                </div>
              </div>
            </div>

            <div className={c.menuBottom}>
              <div className={c.topMenu}>
                <div>
                  <img onClick={toggleShop} src={ShopImage} alt=""/>
                  <h3>{intl.formatMessage({id: 'market'})}</h3>
                </div>
                <div>
                  <img onClick={toggleBoxModal} src={BoxImage} alt=""/>
                  <h3>{intl.formatMessage({id: 'box'})}</h3>
                </div>
                <div>
                  <img onClick={toggleInverter} src={InverterImage} alt=""/>
                  <h3>{intl.formatMessage({id: 'inventer'})}</h3>
                </div>
              </div>
            </div>
          </div>


          <UserLineup shopElements={userData.shopElements}/>
        </div>

      </GridBox>

      {modal}
      {shopModal}
      {inverter}
      {boxModal}
    </>
  )
}

export {
  HomeUserData
}