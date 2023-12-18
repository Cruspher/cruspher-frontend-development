import React from "react";
import {Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, YAxis} from "recharts";


const ChatTripleArea = ({stats, maxValue, areaStroke, areaFill, value}) => {

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
        <Tooltip />
        <YAxis hide={true} tickCount={maxValue + 2} domain={[0, maxValue + 1]} stroke="#ffffff"  />
        <CartesianGrid stroke='rgba(255,255,255, 0.1)' strokeDasharray='0' />
        <Area dot={{ stroke: '#fff', strokeWidth: 2, fill: '#28991c' }} type="monotone" stroke={areaStroke} fill={areaFill}  dataKey={value}  />
      </AreaChart>
    </ResponsiveContainer>
  )
}

export {
  ChatTripleArea
}