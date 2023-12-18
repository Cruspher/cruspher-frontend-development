import React from 'react'
import c from './style.module.scss'
import {useIntl} from "react-intl";
import {GridBox} from "../../../../../components/cruspher-ui/box/grid-box";
import moment from "moment";
import {ClearIcon} from "../../../../../components/cruspher-ui/icons/actions";
import {RemoveIcon} from "../../../../../components/cruspher-ui/icons/default";


const MessageReportItem = ({item, removeThemeMessageHandler, clearThemeMessageHandler}) => {
  const intl = useIntl()

  return (
    <div className={c.wrap}>
      <GridBox rowGap='15px'>
        <div className={c.header}>
          <div className={c.idWrap}>
          <span className={c.idTitle}>
            {intl.formatMessage({id: "id"})}
          </span>
            -
            <span className={c.idTitle}>{item.id}</span>
          </div>

          <span className={c.reports}>
          {item.reports}
        </span>

          <div className={c.user}>
            <span>
              {item.user.name} {item.user.surname}
            </span>
          </div>

        </div>

        <div className={c.message}>
          {item.message}
        </div>

        <span className={c.date}>
          {moment(item.date).calendar()}
        </span>

        <div className={c.actions}>
          <RemoveIcon submit={() => removeThemeMessageHandler(item.id)} />
          <ClearIcon submit={() => clearThemeMessageHandler(item.id)} />
        </div>

      </GridBox>
    </div>
  )
}


export {
  MessageReportItem
}