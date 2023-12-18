import React from 'react'
import c from './style.module.scss'
import {Title} from "../../../../cruspher-ui/title";
import {NewsLanguageInput} from "../news-language-input";
import {FormikTitleWrap} from "../../../../cruspher-ui/formik/formik-title-wrap";
import {NewsLanguageArea} from "../news-language-area";
import {FlexBox} from "../../../../cruspher-ui/box/flexbox";
import {NewsLanguageCheckbox} from "../news-language-checkbox";
import {useIntl} from "react-intl";


const NewsViewsLanguage = ({language, changeFormValue}) => {
  const intl = useIntl()
  const wrapClass = language.isActive ? `${c.wrap} ${c.wrapActive}` : c.wrap


  return (
    <div className={wrapClass}>
      <FlexBox content='space-between' items='center'>
        <Title variant='h3' size='17px' uppercase={true}>{language.name}</Title>

        <NewsLanguageCheckbox language={language} name='isActive' changeFormValue={changeFormValue} />
      </FlexBox>

      {
        language.isActive && (
          <>
            <FormikTitleWrap title={intl.formatMessage({id: 'title'})}>
              <NewsLanguageInput language={language} name='title' changeFormValue={changeFormValue} />
            </FormikTitleWrap>

            <FormikTitleWrap title={intl.formatMessage({id: 'content'})}>
              <NewsLanguageArea language={language} name='content' changeFormValue={changeFormValue} />
            </FormikTitleWrap>
          </>
        )
      }

    </div>
  )
}


export {
  NewsViewsLanguage
}