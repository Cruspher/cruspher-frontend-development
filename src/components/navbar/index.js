import React, {useState} from 'react'
import {MenuButton} from './components/menu-button'
import {MobileMenu} from "../mobile-menu"
import {NavbarTitle} from "./components/navbar-title";
import {NavbarSettings} from "./components/navbar-settings";
import {FlexBox} from "../cruspher-ui/box/flexbox";
import c from './style.module.scss'
import {FcSettings} from "react-icons/all";


const Navbar = () => {
  const [isMenuActive, setIsMenuActive] = useState(false)
  const [isSettingModalShow, setIsSettingModalShow] = useState(false)

  const toggleSettingModal = () => setIsSettingModalShow(!isSettingModalShow)
  const toggleMenuHandler = () => setIsMenuActive(!isMenuActive)




  return (
    <div>
      <section className={c.wrap}>
        <MobileMenu isMenuActive={isMenuActive} toggleMenuHandler={toggleMenuHandler} />

        <NavbarTitle />

        <FlexBox items='center' columnGap='20px'>
          {isMenuActive && <FcSettings onClick={toggleSettingModal} className={c.icon}/>}

          <MenuButton style={{zIndex: 1000}} isMenuActive={isMenuActive} toggleMenuHandler={toggleMenuHandler} />
        </FlexBox>
      </section>
      <NavbarSettings toggleSettingModal={toggleSettingModal} isSettingModalShow={isSettingModalShow} />

    </div>
  )
}


export {
  Navbar
}
