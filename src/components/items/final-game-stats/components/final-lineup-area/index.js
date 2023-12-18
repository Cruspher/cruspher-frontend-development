import React from 'react'
import c from './style.module.scss'
import {FinalLineupAreaItem} from "../final-lineup-area-item";
import {GridBox} from "../../../../cruspher-ui/box/grid-box";



const FinalLineupArea = ({lineup, isRate, title, shopElements, formation}) => {

  return (
    <div>
      <GridBox rowGap='30px'>
        <div className={c.title}>
        <span>
          {title}
        </span>
          <span>
            {formation}
          </span>
        </div>

        <div className={c.wrap}>
          <img className={c.dec} src={process.env.REACT_APP_API_URL + shopElements.stadium} alt=""/>
          <div  className={c.area}>
            {
              Object.keys(lineup).map(key => (
                <FinalLineupAreaItem key={key} shopElements={shopElements} isRate={isRate} player={lineup[key]}/>
              ))
            }
          </div>
        </div>
      </GridBox>
    </div>
  )
}

export {
  FinalLineupArea
}
