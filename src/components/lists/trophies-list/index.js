import React, {useEffect, useState} from 'react'
import c from './style.module.scss'
import {Pagination} from "../../cruspher-ui/pagination";
import {GridBox} from "../../cruspher-ui/box/grid-box";
import {getTrophiesRequest} from "../../../actions/trophy";
import {useIntl} from "react-intl";
import {toast} from "react-toastify";
import {Loading} from "../../cruspher-ui/loading";
import {TrophyItem} from "../../items/trophy-item";
import {EmptyTitle} from "../../cruspher-ui/empty-title";

const TrophiesList = ({submit}) => {
  const intl = useIntl()
  const [isLoading, setIsLoading] = useState(false)
  const [page, setPage] = useState(0)
  const [trophiesList, setTrophiesList] = useState({data: [], length: 0})

  useEffect(() => {
    getTrophiesHandler()
  }, [page])

  const notify = text => toast(text)

  const getTrophiesHandler = async () => {
    if (isLoading) return
    setIsLoading(true)

    const data = await getTrophiesRequest(page)

    if (data) {
      setTrophiesList(data)
    } else {
      notify(intl.formatMessage({id: "unknown_error"}))
    }

    setIsLoading(false)
  }

  if (isLoading) return <Loading />

  return (
    <GridBox rowGap='30px'>
      {
        trophiesList.length > 0 ? (
          <div className={c.wrap}>
            {
              trophiesList.data.map(item => (
                <TrophyItem submit={submit} item={item} key={item.id} />
              ))
            }
          </div>
        ) : (
          <EmptyTitle errorText={intl.formatMessage({id: "list_is_empty"})} />
        )
      }

      {
        trophiesList.length > 18 && (
          <Pagination length={trophiesList.length} page={page + 1} onChangePage={setPage} rows={18} />
        )
      }
    </GridBox>
  )
}


export {
  TrophiesList
}