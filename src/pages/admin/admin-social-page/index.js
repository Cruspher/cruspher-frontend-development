import React from 'react'
import {Wrap} from "../../../components/cruspher-ui/wrappers/wrap";
import {LayoutDefault} from "../../../components/layouts/layout-default";
import {AdminMenu} from "../../../components/admin-menu";
import {AdminSocialList} from "../../../components/lists/admin-social-list";
import c from './style.module.scss'


const AdminSocialPage = () => {


  return (
    <LayoutDefault>
      <Wrap vPadding='30px'>
        <div className={c.wrap}>
          <AdminMenu name='social' />

          <AdminSocialList />
        </div>
      </Wrap>
    </LayoutDefault>
  )
}


export {
  AdminSocialPage
}