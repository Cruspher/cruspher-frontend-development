import React from 'react'
import c from './style.module.scss'
import {GameItem} from "../../items/game-item";
import {Pagination} from "../../cruspher-ui/pagination";


const GameListPagination = ({games, page, setPage, link}) => {

  return (
    <div className={c.wrap}>
      <div className={c.container}>
        {
          games.data.map((game, index) => (
            <GameItem  link={link} game={game} key={index} />
          ))
        }
      </div>

      {
        games.length > 16
        && <Pagination length={games.length} page={page + 1} onChangePage={(val) => setPage(val)} rows={16} />
      }
    </div>
  )
}

export {
  GameListPagination
}