import React from 'react'
import {useIntl} from "react-intl";
import {Loading} from "../../cruspher-ui/loading";
import {EmptyTitle} from "../../cruspher-ui/empty-title";
import {Pagination} from "../../cruspher-ui/pagination";
import {FlexBox} from "../../cruspher-ui/box/flexbox";
import {ThemesActiveItem} from "../../items/themes-active-item";
import c from './style.module.scss'

const ThemesActive = ({submit, isLoading, themesList, page, setPage, title, removeThemeHandler, editThemeHandler}) => {
  const intl = useIntl()

  const body = isLoading ? (
    <Loading />
  ) : (
    <FlexBox direction='column' rowGap='30px'>
      <h2 className={c.title}>{title}</h2>
      {
        themesList?.length ? (
          <>
            {
              themesList.themes.map((theme) => (
                <ThemesActiveItem
                  editThemeHandler={editThemeHandler}
                  removeThemeHandler={removeThemeHandler}
                  key={Math.random().toString()}
                  {...{theme, submit}}
                />
              ))
            }
          </>
        ) : (
          <EmptyTitle errorText={intl.formatMessage({id: 'list_is_empty'})} />
        )
      }

      {
        themesList?.length > 20 && <Pagination page={page + 1} length={themesList.length} rows={20} onChangePage={setPage} />
      }
    </FlexBox>
  )

  return (
    <div className={c.wrap}>
      {body}
    </div>
  )
}

export {
  ThemesActive
}