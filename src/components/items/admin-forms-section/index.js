import React, {useEffect, useState} from 'react'
import {useIntl} from "react-intl";
import {toast} from "react-toastify";
import {Loading} from "../../cruspher-ui/loading";
import {PageTitle} from "../../cruspher-ui/title";
import {PageHeader} from "../page-header";
import {getShopElements} from "../../../actions/shop";
import c from './style.module.scss'
import {ShopElementList} from "../../lists/shop-element-list";
import {SelectDefault} from "../../cruspher-ui/selects/select";
import {Pagination} from "../../cruspher-ui/pagination";
import {GridBox} from "../../cruspher-ui/box/grid-box";



const AdminFormsSection = () => {
  const intl = useIntl()
  const notify = text => toast(text)
  const [isLoading, setIsLoading] = useState(false)
  const [page, setPage] = useState(0)
  const [elements, setElements] = useState({data: [], length: 0})
  const [elementTypeValue, setElementTypeValue] = useState({
    value: 'playerForm',
    title: intl.formatMessage({id: 'playerForm'})
  })
  const [isInShopValue, setIsInShopValue] = useState({
    value: true,
    title: intl.formatMessage({id: 'shop'})
  })

  const isInShopOptions = [
    {
      value: true,
      title: intl.formatMessage({id: 'shop'})
    },
    {
      value: false,
      title: intl.formatMessage({id: 'box'})
    }
  ]

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

  useEffect(() => {
    getShopElementsHandler()
  }, [elementTypeValue, isInShopValue, page])

  const getShopElementsHandler = async () => {
    setIsLoading(true)


    const data = await getShopElements({page, type: elementTypeValue.value, isInShop: isInShopValue.value})

    if (data) {
      setElements(data)
    } else {
      notify(intl.formatMessage({id: "unknown_error"}))
    }

    setIsLoading(false)
  }


  if (isLoading) return <Loading />


  return (
    <div className={c.wrap}>
      <PageHeader>
        <PageTitle title={intl.formatMessage({id: 'shop'})} />

        <div className={c.selectWrap}>
          <SelectDefault
            value={elementTypeValue}
            labelValue='title'
            submit={(val) => setElementTypeValue(val)}
            options={elementsTypesOptions}
            maxWidth='200px'
          />

          <SelectDefault
            value={isInShopValue}
            labelValue='title'
            submit={(val) => setIsInShopValue(val)}
            options={isInShopOptions}
            maxWidth='200px'
          />
        </div>
      </PageHeader>

      <GridBox rowGap='30px'>
        <ShopElementList elements={elements} />

        {elements.length > 18 && (
          <Pagination length={elements.length} page={page + 1} onChangePage={setPage} rows={18} />
        )}
      </GridBox>

    </div>
  )
}


export {
  AdminFormsSection
}