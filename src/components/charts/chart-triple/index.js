import React, { useState} from 'react'
import c from './style.module.scss'
import {
  Bar,
  BarChart,
  ResponsiveContainer,
  Tooltip,
  YAxis,
  CartesianGrid
} from "recharts";
import {AiOutlineAreaChart, BsArrowsFullscreen, BsFillBarChartFill} from "react-icons/all";
import {ChartTripleTwoTeam} from "./components/chart-triple-two-team";
import {ChatTripleArea} from "./components/chat-triple-area";
import {ChatTripleAreaProc} from "./components/chat-triple-area-proc";



const ChartTriple = ({stats, title, value, isProc, isBad, isYellow, count, updateData}) => {
  const [viewState, setViewState] = useState(1)
  const [isActive, setIsActive] = useState(false)
  const values = stats.data.map(item => item[value])
  const maxValue = !isProc ? values[values.indexOf(Math.max.apply(null, values))] : 100
  const areaFill = isYellow ? 'rgba(216, 219, 33, 0.5)' : isBad ? 'rgba(165, 0, 68, 0.5)' : 'rgba(40, 153, 28, 0.5)'
  const areaStroke = isYellow ? '#d8db21' : isBad ? '#a50044' : "#28991c"
  const wrapClass = isActive ? `${c.wrap} ${c.wrapActive}` : c.wrap

  const toggleActive = () => {
    setIsActive(!isActive)

    if (isActive) {
      updateData()
    }
  }

  return (
    <div className={wrapClass}>
      <>
        <div className={c.header}>
          <h4 className={c.title}>{title}
            {!!count && (
              <span className={c.count}>{count}</span>
            )}
          </h4>

          <div className={c.headerActions}>
            <div className={`${c.actionWrap} ${viewState === 1 ? c.active : ''}`} onClick={() => setViewState(1)}>
              <AiOutlineAreaChart />
            </div>
            <div className={`${c.actionWrap} ${viewState === 2 ? c.active : ''}`} onClick={() => setViewState(2)}>
              <BsFillBarChartFill />
            </div>
            <div className={`${c.actionWrap} ${viewState === 3 ? c.active : ''}`} onClick={() => setViewState(3)}>
              <BsFillBarChartFill />
            </div>
            <div className={`${c.actionWrap} ${isActive ? c.active : ''}`} onClick={toggleActive}>
              <BsArrowsFullscreen />
            </div>
          </div>
        </div>

        <div className={c.container}>
          {
            viewState === 1 && (
              <>
                {
                  isProc ? (
                    <ChatTripleAreaProc stats={stats} value={value} />
                  ) : (
                    <ChatTripleArea
                      maxValue={maxValue}
                      value={value}
                      stats={stats}
                      areaStroke={areaStroke}
                      areaFill={areaFill}
                    />
                  )
                }
              </>

            )
          }

          {
            viewState === 2 && (
              <ResponsiveContainer width="100%">
                <BarChart
                  data={stats.data}
                  margin={{
                    top: 5,
                    right: 0,
                    left: 0,
                    bottom: 0,
                  }}
                >
                  <YAxis hide={true} tickCount={maxValue + 2} domain={[0, maxValue + 1]} />
                  <Tooltip />
                  <CartesianGrid stroke='rgba(255,255,255, 0.1)' strokeDasharray='0' />

                  <Bar dataKey={value} fill={areaFill} />
                </BarChart>
              </ResponsiveContainer>
            )
          }
          {
            viewState === 3 && (
              <ChartTripleTwoTeam value={value} stats={stats} maxValue={maxValue} />
            )
          }
        </div>
      </>
    </div>
  )
}


export {
  ChartTriple
}
