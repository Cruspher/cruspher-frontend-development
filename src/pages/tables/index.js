import React from 'react'
import {Wrap} from "../../components/cruspher-ui/wrappers/wrap";
import {TableLaLiga} from "../../components/tables/la-liga";
import {LayoutDefault} from "../../components/layouts/layout-default";

const TablesPage = () => {


  return (
    <LayoutDefault>
      <Wrap maxWidth='820px' vPadding='30px'>
        <TableLaLiga />
      </Wrap>
    </LayoutDefault>
  )
}

export {
  TablesPage
}
