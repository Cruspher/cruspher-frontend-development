import React from 'react'
import {Wrap} from "../../../components/cruspher-ui/wrappers/wrap";
import {AdminMenu} from "../../../components/admin-menu";
import {LayoutDefault} from "../../../components/layouts/layout-default";
import {PlayersList} from "../../../components/lists/players-list";
import c from './style.module.scss';

const AdminPlayersPage = () => {

  return (
    <LayoutDefault>
      <Wrap vPadding='30px'>
        <div className={c.wrap}>
          <AdminMenu name={'players'} />

          <PlayersList />
        </div>
      </Wrap>
    </LayoutDefault>
  )
}


export {
  AdminPlayersPage
}