import React from 'react'
import c from './style.module.scss'
import {LineupsFormationItem} from "../lineups-formation-item";
import {FORMATIONS_DATA} from "../../../../data/formations.data";
import {ActionIcon } from "../../../cruspher-ui/icons/default";


const LineupsFormations = ({setFormation, formationsData, formation, setFormationPage, page}) => {

  const nextPageHandler = () => {
    if (page + 1 > FORMATIONS_DATA.length ) return
    setFormationPage(page + 1)
  }

  const prevPageHandler = () => {
    if (page - 1 < 0) return
    setFormationPage(page - 1)
  }

  return (
    <div className={c.wrap}>
      <ActionIcon type='left' submit={prevPageHandler} />

      <div className={c.chooseFormation}>
        {
          formationsData.map((item => (
            <LineupsFormationItem key={Math.random().toString()} setFormation={setFormation} item={item} formation={formation} />
          )))
        }
      </div>

      <ActionIcon type='right' submit={nextPageHandler} />
    </div>
  )
}


export {
  LineupsFormations
}