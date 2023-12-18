import React, {useContext, useEffect, useState} from 'react'
import {useIntl} from "react-intl";
import {toast} from "react-toastify";
import {getUsersRatingPaginationRequest} from "../../../../actions/users";
import {EmptyTitle} from "../../../../components/cruspher-ui/empty-title";
import {UserRatingList} from "../../../../components/lists/user-rating-list";
import {Loading} from "../../../../components/cruspher-ui/loading";
import jwtDecode from "jwt-decode";
import {AuthContext} from "../../../../context/AuthContext";

const UserRatingListSection = () => {
  const intl = useIntl()
  const auth = useContext(AuthContext)
  const notify = (text) => toast(text)
  const [isLoading, setIsLoading] = useState(false)
  const [listPage, setListPage] = useState(0)
  const [ratingsList, setRatingsList] = useState({data: 0, length: 0})
  useEffect(() => {
    getRatingListHandler(listPage)
  }, [listPage])
  const {userId} = jwtDecode(auth.token)


  const getRatingListHandler = async (page) => {
    setIsLoading(true)
    const data = await getUsersRatingPaginationRequest(page)

    if (data) {
      setRatingsList(data)
    } else {
      notify(intl.formatMessage({id: 'unknown_error'}))
    }

    setIsLoading(false)
  }

  const isNextActive = isLoading ? false : listPage + 1 < ratingsList.length / 10
  const isPrevActive = isLoading ? false : listPage * 10 - 10 >= 0 / 10
  const isTopActive = isLoading ? false : listPage > 0

  const nextPageHandler = () => {
    if (!isNextActive) return
    setIsLoading(true)

    if (listPage + 1 < ratingsList.length / 10) {
      setListPage(listPage + 1)
    } else {
      notify(intl.formatMessage({id: 'unknown_error'}))
    }

    setIsLoading(false)
  }

  const prevPageHandler = () => {
    if (!isPrevActive) return
    setIsLoading(true)

    if (isPrevActive) {
      setListPage(listPage - 1)
    } else {
      notify(intl.formatMessage({id: 'unknown_error'}))
    }

    setIsLoading(false)
  }

  const topPageHandler = () => {
    if (!isTopActive) return
    setIsLoading(true)

    if (isPrevActive) {
      setListPage(0)
    } else {
      notify(intl.formatMessage({id: 'unknown_error'}))
    }

    setIsLoading(false)
  }

  if (isLoading) return <Loading />

  return (
    <>
      {
        !ratingsList.data ? (
          <EmptyTitle errorText={intl.formatMessage({id: 'your_rating_is_missing'})}/>
        ) : (
            <UserRatingList
              prevPageHandler={prevPageHandler}
              nextPageHandler={nextPageHandler}
              usersList={ratingsList.data}
              userPosition={1}
              isPrevActive={isPrevActive}
              isNextActive={isNextActive}
              isTopActive={isTopActive}
              topPageHandler={topPageHandler}
              userId={userId}
            />
        )
      }
    </>
  )
}


export {
  UserRatingListSection
}