import React, {useState} from 'react'
import {RatingItem} from "../../items/rating-item";
import {FlexBox} from "../../cruspher-ui/box/flexbox";
import {AiOutlineLeftCircle, AiOutlineRightCircle, FaGifts, GiPodiumWinner} from "react-icons/all";
import c from './style.module.scss'
import {useIntl} from "react-intl";
import {GridBox} from "../../cruspher-ui/box/grid-box";
import {Modal} from "../../cruspher-ui/modal";
import {SurpriseList} from "../surprise-list";


const UserRatingList = ({usersList,userId, userPosition, nextPageHandler, prevPageHandler, isPrevActive, isNextActive, isTopActive, topPageHandler}) => {
  const intl = useIntl()
  const [isModalShow, setIsModalShow] = useState(false)
  const toggleModal = () => setIsModalShow(!isModalShow)

  return (
    <GridBox rowGap='8px'>
      <FlexBox items='center' content='space-between' width='100%'>
        <h2 className={c.title}>
          {intl.formatMessage({id: 'season_rating'})}
        </h2>

        <div className={c.buttonContainer}>
          <FaGifts onClick={toggleModal} className={`${c.giftsIcon}`} />
          <GiPodiumWinner onClick={topPageHandler} style={{opacity: isTopActive ? 1 : 0.3}}  className={`${c.navigateIcon}`} />
          <AiOutlineLeftCircle style={{opacity: isPrevActive ? 1 : 0.3}} onClick={prevPageHandler} className={`${c.navigateIcon} ${c.navigateIconBack}`} />
          <AiOutlineRightCircle style={{opacity: isNextActive ? 1 : 0.3}} onClick={nextPageHandler} className={`${c.navigateIcon} ${c.navigateIconNext}`} />
        </div>
      </FlexBox>

      <div className={c.list}>
        {
          usersList.length ? (
            usersList.map(user => <RatingItem userId={userId} key={Math.random().toString()} {...{user, userPosition}} />)
          ) : null
        }
      </div>

      {
        isModalShow && (
          <Modal toggleModal={toggleModal} maxWidth={'1000px'}>
            <SurpriseList />
          </Modal>
        )
      }
    </GridBox>
  )
}


export {
  UserRatingList
}
