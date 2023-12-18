import React from 'react'
import c from './style.module.scss'
import {AdminListPlayerItem} from "../list-player-item";
import {EmptyTitle} from "../../cruspher-ui/empty-title";
import {useIntl} from "react-intl";


const PlayerCardWrap = ({players, submit, submitTitle, shopElements}) => {
  const intl = useIntl()



  return (
    <>
        {
          players.length ?  (
              <div className={c.container}>
                {
                  players.data.map(player => (
                    <AdminListPlayerItem
                      key={player.id}
                      player={player}
                      submit={submit}
                      submitTitle={submitTitle}
                      shopElements={shopElements}
                    />
                  ))
                }
              </div>
          ) : (
            <EmptyTitle errorText={intl.formatMessage({id: 'list_is_empty'})} />
          )
        }

    </>
  )
}

export {
  PlayerCardWrap
}