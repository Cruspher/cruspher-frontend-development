import React from 'react'
import c from './style.module.scss'


const AdminPlayersFormList = ({forms}) => {

  return (
    <div className={c.wrap}>
      {
        forms.map(item => (
          <div className={c.item}>
            <h2 className={c.name}>{item.name}</h2>

            <div className={c.test}>
              <img className={c.image} src={process.env.REACT_APP_API_URL + item.image} alt={item.name}/>
            </div>

          </div>
        ))
      }
    </div>
  )
}


export {
  AdminPlayersFormList
}