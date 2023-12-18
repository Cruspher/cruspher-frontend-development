import React from 'react'
import {LayoutDefault} from "../../components/layouts/layout-default";
import {Wrap} from "../../components/cruspher-ui/wrappers/wrap";
import {UserGame} from "../../components/items/user-game";


const GamePage = () => {


  return (
    <LayoutDefault>
      <Wrap vPadding='30px'>
        <UserGame />
      </Wrap>
    </LayoutDefault>
  )
}


export {GamePage}
