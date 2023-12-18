import React from 'react'
import {useIntl} from "react-intl";
import {Wrap} from "../../../components/cruspher-ui/wrappers/wrap";
import {AdminMenu} from "../../../components/admin-menu";
import {PageHeader} from "../../../components/items/page-header";
import {PageTitle} from "../../../components/cruspher-ui/title";
import {LayoutDefault} from "../../../components/layouts/layout-default";
import {NewsLanguageSettings} from "./components/news-language-settings";
import {AdminSettingSection} from "./components/admin-setting-section";
import {ForumLanguageSettings} from "./components/forum-language-settings";
import {AdminSettingDefault} from "./components/admin-setting-default";
import {GridBox} from "../../../components/cruspher-ui/box/grid-box";
import c from './style.module.scss'


const AdminSettingPage = () => {
  const intl = useIntl()

  return (
    <LayoutDefault>
      <Wrap vPadding='30px'>
        <GridBox rowGap='30px'>
          <AdminMenu name='settings' />

          <PageHeader>
            <PageTitle title={intl.formatMessage({id: "settings"})} />
          </PageHeader>

          <AdminSettingDefault />

          <div className={c.languageWrap}>
            <div>
              <AdminSettingSection title={intl.formatMessage({id: "news_language"})}>
                <NewsLanguageSettings />
              </AdminSettingSection>
            </div>

            <div>
              <AdminSettingSection title={intl.formatMessage({id: "forum_language"})}>
                <ForumLanguageSettings />
              </AdminSettingSection>
            </div>
          </div>
        </GridBox>
      </Wrap>
    </LayoutDefault>
  )
}


export {
  AdminSettingPage
}