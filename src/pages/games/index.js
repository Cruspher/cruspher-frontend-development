import React from 'react'
import {LayoutDefault} from "../../components/layouts/layout-default";
import {Wrap} from "../../components/cruspher-ui/wrappers/wrap";
import {GamesList} from "../../components/lists/games-list";


const GamesPage = () => {


  return (
    <LayoutDefault>
      <Wrap maxWidth='1280px' vPadding='50px' >
        <GamesList />
      </Wrap>
    </LayoutDefault>
  )
}


export {GamesPage}
