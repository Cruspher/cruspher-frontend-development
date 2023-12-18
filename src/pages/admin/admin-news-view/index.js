import React from 'react'
import {LayoutDefault} from "../../../components/layouts/layout-default";
import {Wrap} from "../../../components/cruspher-ui/wrappers/wrap";
import {NewsForm} from "../../../components/forms/news-form";


const AdminNewsViewPage = ({isEdit}) => {

  return (
    <LayoutDefault>
      <Wrap vPadding='30px'>
        <NewsForm isEdit={isEdit}  />
      </Wrap>
    </LayoutDefault>
  )
}

export {
  AdminNewsViewPage
}