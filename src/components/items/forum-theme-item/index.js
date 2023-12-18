import React from 'react'
import {NavLink} from "react-router-dom";
import c from './style.module.scss'
import {APPRoutes} from "../../../const/APP-routes";
import {DateView} from "../../cruspher-ui/date-view";


const ForumThemeItem = ({theme}) => {

  return (
    <div className={c.wrap}>
      <NavLink to={`${APPRoutes.forum}/${theme.id}`}>
        <div className={c.container}>
          <h3>
            <NavLink to={`${APPRoutes.forum}/${theme.id}`}>
              {theme.title}
            </NavLink>
          </h3>

          <DateView date={theme.date} format='DD/MM hh:mm' />
        </div>
      </NavLink>

    </div>
  )
}


export {
  ForumThemeItem
}
