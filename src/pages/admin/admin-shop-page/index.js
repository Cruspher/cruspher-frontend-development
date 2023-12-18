import React from 'react'
import {Wrap} from "../../../components/cruspher-ui/wrappers/wrap";
import {AdminMenu} from "../../../components/admin-menu";
import {LayoutDefault} from "../../../components/layouts/layout-default";
import c from './style.module.scss'
import {AdminFormsSection} from "../../../components/items/admin-forms-section";


const AdminShopPage = () => {


  return (
    <LayoutDefault>
      <Wrap vPadding='30px'>
        <div className={c.wrap}>
          <AdminMenu name='shop' />

          <AdminFormsSection />
        </div>
      </Wrap>
    </LayoutDefault>
  )
}


export {
  AdminShopPage
}