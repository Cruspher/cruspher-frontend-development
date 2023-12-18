import React from 'react'
import { useNavigate } from "react-router-dom";
import {useIntl} from "react-intl";
import {NeonButton} from "../../cruspher-ui/buttons/neon-button";
import {FlexBox} from "../../cruspher-ui/box/flexbox";
import {APPRoutes} from "../../../const/APP-routes";
import c from './style.module.scss'
import {EditIcon, RemoveIcon} from "../../cruspher-ui/icons/default";
import {DateView} from "../../cruspher-ui/date-view";


const ThemesActiveItem = ({theme, submit, removeThemeHandler, editThemeHandler}) => {
  const intl = useIntl()
  const navigate = useNavigate()

  const buttonText = intl.formatMessage({id: theme.isConfirmed ? 'deactivate' : 'activate'})
  const buttonType = theme.isConfirmed  ? 'remove' : 'add'
  const wrapClass = theme.isConfirmed ? `${c.wrap} ${c.wrapActive}` : `${c.wrap} ${c.wrapDefault}`

  const navigateToTheme = () => {
    navigate(`${APPRoutes.forum}/${theme.id}`)
  }

  const buttonSubmit = () => {
    submit(theme.id, !theme.isConfirmed)
  }

  const removeHandler = () => removeThemeHandler(theme.id)

  return (
    <div className={wrapClass}>
      <div className={c.container}>
        <FlexBox items='center' columnGap='10px'>
          <span className={c.titleName}>{intl.formatMessage({id: "title"})}:</span>
          <span className={c.title} onClick={navigateToTheme}>{theme.title}</span>
        </FlexBox>

        <FlexBox items='center' columnGap='10px'>
          <span className={c.titleName}>{intl.formatMessage({id: "date"})}:</span>
          <DateView date={theme.date} format='DD/MM HH:mm' />
        </FlexBox>

      </div>

      <div className={c.buttonWrap}>
        <NeonButton submit={buttonSubmit} variant={buttonType}>
          {buttonText}
        </NeonButton>

        <FlexBox items='center' columnGap='10px'>
          <RemoveIcon submit={removeHandler} />

          <EditIcon submit={() => editThemeHandler(theme)} />
        </FlexBox>
      </div>
    </div>
  )
}

export {
  ThemesActiveItem
}