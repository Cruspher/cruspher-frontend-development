import React from 'react'
import {Wrap} from "../../components/cruspher-ui/wrappers/wrap";
import {ForumThemeList} from "../../components/lists/forum-theme-list";
import {LayoutDefault} from "../../components/layouts/layout-default";


const ForumPage = () => {

  return (
    <LayoutDefault>
      <Wrap vPadding='30px'>
        <ForumThemeList />
      </Wrap>
    </LayoutDefault>
  )
}


export {
  ForumPage
}
