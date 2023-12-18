import React, {useEffect, useState} from 'react'
import {Table} from "../table";
import {LastGamesItem} from "../../items/last-games-item";
import {Loading} from "../../cruspher-ui/loading";
import {getLaLigaTableRequest} from "../../../actions/tables";
import {useIntl} from "react-intl";
import {toast} from "react-toastify";
import {TableGoals} from "./components/table-goals";
import {TableText} from "../table/components/table-text";
import c from './style.module.scss'

const tableConfig = {
  rowColumns: "180px 40px 40px 40px 40px 40px 40px 40px 40px 185px",
  rowColumnsFixed: '35px 40px',
  type: 'laLiga',
  fixedData: [
    {
      title: '',
      name: 'rank',
      type: 'component',
      component: (team) => <div style={{paddingLeft: '5px'}} className={c.fixed}>
        {team.rank}
      </div>
    },
    {
      title: '',
      name: 'logo',
      type: 'component',
      component: (team) => <div className={c.fixed}>
        <img alt='football' style={{height: '20px'}} src={team.logo} />
      </div>
    },
  ],
  data: [
    {
      title: '',
      name: 'team'
    },
    {
      title: 'G',
      name: 'games'
    },
    {
      title: 'P',
      name: 'points',
      type: 'component',
      component: ({points}) => <TableText text={points} />
    },
    {
      title: 'W',
      name: 'win',
    },
    {
      title: 'D',
      name: 'draw',
    },
    {
      title: 'L',
      name: 'lose',
    },
    {
      title: 'GS',
      name: 'goalsScored',
      type: 'component',
      component: ({goalsScored}) => <TableGoals isSimple={true} value={goalsScored} />
    },
    {
      title: 'GM',
      name: 'goalsMissed',
      type: 'component',
      component: ({goalsMissed}) => <TableGoals isSimple={true} value={goalsMissed} />
    },
    {
      title: 'GP',
      name: 'goalsPlus',
      type: 'component',
      component: ({goalsMissed, goalsScored}) => <TableGoals value={goalsScored * 1 - goalsMissed * 1} />
    },
    {
      title: '',
      name: 'form',
      type: 'component',
      component: (team) => <LastGamesItem {...{team}} />
    },
  ]
}



const TableLaLiga = () => {
  const intl = useIntl()
  const notify = text => toast(text)
  const [isLoading, setIsLoading] = useState(false)
  const [table, setTable] = useState([])

  useEffect(() => {
    getTableHandler()
  }, [])

  const getTableHandler = async () => {
    setIsLoading(true)

    const data = await getLaLigaTableRequest()

    if (data) setTable(data)
    else notify(intl.formatMessage({id: 'unknown_error'}))

    setIsLoading(false)
  }

  return (
    <div>
      {
        isLoading ? (
          <Loading />
        ) : (
          <Table config={tableConfig} data={table} />
        )
      }
    </div>
  )
}


export {
  TableLaLiga
}
