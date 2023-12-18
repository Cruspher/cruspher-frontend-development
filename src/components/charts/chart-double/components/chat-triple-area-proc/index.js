import React from "react";
import {Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, YAxis} from "recharts";


const toPercent = (decimal, fixed = 0) => `${(decimal * 100).toFixed(fixed)}%`;

const getPercent = (value, total) => {
  const ratio = total > 0 ? value / total : 0;

  return toPercent(ratio, 2);
};

const renderTooltipContent = (o) => {
  const { payload, label } = o;
  const total = payload.reduce((result, entry) => result + entry.value, 0);

  return (
    <div className="customized-tooltip-content">
      <p className="total">{`${label} (Total: ${total})`}</p>
      <ul className="list">
        {payload.map((entry, index) => (
          <li key={`item-${index}`} style={{ color: entry.color }}>
            {`${entry.name}: ${entry.value}(${getPercent(entry.value, total)})`}
          </li>
        ))}
      </ul>
    </div>
  );
};

const ChatTripleAreaProc = ({stats,value}) => {

  const sortedData = stats.data.map(item => {
    item[`opponent__${value}`] = 100 - item[value]

    return item
  })

  return (
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart
        width={500}
        height={400}
        data={sortedData}
        stackOffset="expand"
        margin={{
          top: 0,
          right: 0,
          left: 0,
          bottom: 0,
        }}
      >
        <CartesianGrid stroke='rgba(255,255,255, 0.1)' strokeDasharray='0' />
        <YAxis hide={true} tickFormatter={toPercent} />
        <Tooltip content={renderTooltipContent} />
        <Area type="monotone" dataKey={value} stackId="1" stroke="#28991c" fill="#28991c" />
        <Area type="monotone" dataKey={`opponent__${value}`} stackId="1" stroke="red" fill="red" />
      </AreaChart>
    </ResponsiveContainer>
  )
}

export {
  ChatTripleAreaProc
}