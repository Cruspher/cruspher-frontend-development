import React from 'react'
import {useRoutes} from "./routes";
import {BrowserRouter as Router} from "react-router-dom";
import {AuthContext} from "./context/AuthContext";
import {useAuth} from "./hooks/auth.hooks";
import {ToastContainer} from "react-toastify";
import {messages} from "./I18n/messages";
import {useLanguage} from "./hooks/use-language.hook";
import {LOCALES} from "./I18n/locales";
import {IntlProvider} from "react-intl";

function App() {
  const {token, logout, login, role} = useAuth(AuthContext)
  const routes = useRoutes(role)
  const { getLanguage } = useLanguage();
  const chosenLanguage = getLanguage();
  const locale = chosenLanguage ? chosenLanguage : LOCALES.ENGLISH;


  return (
    <IntlProvider
      messages={messages[locale]}
      locale={locale}
      defaultLocale="en"
    >
      <AuthContext.Provider value={{
        token, logout, login, role
      }}>
      <Router>
        {role && routes}
      </Router>
        <ToastContainer
          autoClose={3000}
          hideProgressBar={true}
          newestOnTop={false}
          closeOnClick
        />
      </AuthContext.Provider>
    </IntlProvider>
  );
}

export default App;
