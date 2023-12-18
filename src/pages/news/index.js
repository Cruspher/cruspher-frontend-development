import React from 'react'
import {Wrap} from "../../components/cruspher-ui/wrappers/wrap";
import {LayoutDefault} from "../../components/layouts/layout-default";
import {NewsList} from "../../components/lists/news-list";
import c from './style.module.scss'
import {PageTitle} from "../../components/cruspher-ui/title";

const NewsPage = () => {




  return (
    <LayoutDefault>
      <Wrap vPadding='30px'>
        <div className={c.wrap}>
          <PageTitle title='News' />

          <NewsList />
        </div>
      </Wrap>
    </LayoutDefault>
  )
}

export {
  NewsPage
}
