import React from 'react'
import c from './style.module.scss'
import {UserLineupAreaItem} from "../user-lineup-area-item";

const mockData = [
  {column: 3, row: 7, position: 'goalkeeper'},

  {column: 1, row: 6, position: 'null'},
  {column: 2, row: 6, position: 'null'},
  {column: 4, row: 6, position: 'null'},
  {column: 5, row: 6, position: 'null'},

  {column: 3, row: 5, position: 'null'},
  {column: 2, row: 4, position: 'null'},
  {column: 4, row: 4, position: 'null'},

  {column: 1, row: 2, position: 'null'},
  {column: 5, row: 2, position: 'null'},
  {column: 3, row: 1, position: 'null'},
]


const UserLineupArea = (
  {
    shopElements
  }
) => {


  return (
      <>
        <img className={c.dec} src={process.env.REACT_APP_API_URL + shopElements.stadium} alt=""/>
        <div className={c.area}>
          {
            mockData.map((item, index) => (
                <UserLineupAreaItem
                  shopElements={shopElements}
                  item={item}
                  key={index}
                />
              )
            )
          }
        </div>
      </>
  )
}


export {
  UserLineupArea
}