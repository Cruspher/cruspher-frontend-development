import React from 'react'
import {Area, CartesianGrid, ResponsiveContainer, YAxis, AreaChart} from "recharts";
import {Tooltip} from "chart.js";


const ChartTripleTwoTeam = ({maxValue, stats, value}) => {

  return (
    <ResponsiveContainer width="100%">
      <AreaChart
        data={stats.data}
        margin={{
          top: 10,
          right: 0,
          left: 0,
          bottom: 0,
        }}
      >
        <defs>
          <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="green" stopOpacity={0.8}/>
            <stop offset="95%" stopColor="green" stopOpacity={0}/>
          </linearGradient>
          <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="red" stopOpacity={0.8}/>
            <stop offset="95%" stopColor="red" stopOpacity={0}/>
          </linearGradient>
        </defs>
        <Tooltip />
        <YAxis hide={true} tickCount={maxValue + 2} domain={[0, maxValue + 1]} stroke="#ffffff"  />
        <CartesianGrid stroke='rgba(255,255,255, 0.1)' strokeDasharray='0' />
        <Area type="monotone" dataKey={value} stroke="green" fillOpacity={1} fill="url(#colorUv)" />
        <Area type="monotone" dataKey={`opponent_${value}`} stroke="red" fillOpacity={1} fill="url(#colorPv)" /></AreaChart>
    </ResponsiveContainer>
  )
}

export {
  ChartTripleTwoTeam
}