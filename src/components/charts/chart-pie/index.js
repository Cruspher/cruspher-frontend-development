import React  from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import c from './style.module.scss'
import {useIntl} from "react-intl";



const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text style={{transform: 'translateX(7px)'}} x={x} y={y} fill="white" textAnchor={x > cx ? 'center' : 'end'} dominantBaseline="central">
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};


const ChartPie = ({data, colors}) => {
  const intl = useIntl()


  return (
    <div className={c.wrap}>
      <div>
        <div className={c.header}>
          {
            data.map(item => (
              <div className={c.itemWrap} key={Math.random().toString()}>
                <span style={{background: item.color}} className={c.itemCircle} />

                <span>
                {
                  intl.formatMessage({id: item.name})
                }
              </span>
              </div>
            ))
          }
        </div>
      </div>

      <div className={c.chart}>
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={renderCustomizedLabel}
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}


export {
  ChartPie
}
