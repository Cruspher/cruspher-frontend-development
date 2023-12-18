import React, {useState} from 'react'
import {useIntl} from "react-intl";
import {toast} from "react-toastify";
import {BsTable, FaGamepad, IoBagAdd, MdPersonAddAlt1} from "react-icons/all";
import {useNavigate} from "react-router-dom";
import {APPRoutes} from "../../../../../const/APP-routes";
import c from './style.module.scss'
import {updateTableRequest} from "../../../../../actions/tables";
import {updatePlayersRequest} from "../../../../../actions/players";

const AdminSettingDefault = () => {
  const intl = useIntl()
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()
  const [isSuperAdmin] = useState(process.env.REACT_APP_IS_SUPER_ADMIN === 'true')
  const notify = text => toast(text)
  const goToAddGamesHandler = () => {
    navigate('/admin/add-games')
  }


  const updateTableHandler = async () => {
    if (isLoading) return
    setIsLoading(true)

    const data = await updateTableRequest()

    if (data) {
      notify(intl.formatMessage({id: "table_success_updated"}))

    } else {
      notify(intl.formatMessage({id: "unknown_error"}))
    }

    setIsLoading(false)
  }

  const updatePlayersHandler = async () => {
    if (isLoading) return
    setIsLoading(true)

    const data = await updatePlayersRequest()

    if (data) {
      notify(intl.formatMessage({id: "players_success_updated"}))

    } else {
      notify(intl.formatMessage({id: "unknown_error"}))
    }

    setIsLoading(false)
  }

  return (
    <div className={c.wrap}>
      <div onClick={goToAddGamesHandler} className={c.block}>
        <FaGamepad className={c.icon} />
      </div>

      {
        isSuperAdmin && (
          <div onClick={() => navigate(APPRoutes.addShopElement)} className={c.block}>
            <IoBagAdd className={c.icon} />
          </div>
        )
      }

      <div onClick={updateTableHandler} className={c.block}>
        <BsTable className={c.icon} />
      </div>

      <div onClick={updatePlayersHandler} className={c.block}>
        <MdPersonAddAlt1 className={c.icon} />
      </div>
    </div>
  )
}


export {
  AdminSettingDefault
}