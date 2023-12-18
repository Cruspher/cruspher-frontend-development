import React from 'react'
import {Wrap} from "../../../components/cruspher-ui/wrappers/wrap";
import {AdminMenu} from "../../../components/admin-menu";
import {LayoutDefault} from "../../../components/layouts/layout-default";
import {AdminThemesList} from "../../../components/lists/admin-themes-list";
import {GridBox} from "../../../components/cruspher-ui/box/grid-box";


const AdminForumPage = () => {


  return (
    <LayoutDefault>
      <Wrap vPadding='30px'>
        <GridBox rowGap='30px'>
          <AdminMenu name='forum' />

          <AdminThemesList />
        </GridBox>
      </Wrap>
    </LayoutDefault>
  )
}


export {
  AdminForumPage
}