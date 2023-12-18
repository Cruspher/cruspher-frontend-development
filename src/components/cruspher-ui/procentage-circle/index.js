import React from 'react'
import c from './style.module.scss'

const cleanPercentage = (percentage) => {
  const isNegativeOrNaN = !Number.isFinite(+percentage) || percentage < 0; // we can set non-numbers to 0 here
  const isTooHigh = percentage > 100;
  return isNegativeOrNaN ? 0 : isTooHigh ? 100 : +percentage;
};

const Circle = ({colour, percentage}) => {
  const r = 70;
  const circ = 2 * Math.PI * r;
  const strokePct = ((100 - percentage) * circ) / 100; // where stroke will start, e.g. from 15% to 100%.
  return (
    <circle
      r={r}
      cx={100}
      cy={100}
      fill="transparent"
      stroke={strokePct !== circ ? colour : ""} // remove colour as 0% sets full circumference
      strokeWidth={"2rem"}
      strokeDasharray={circ}
      strokeDashoffset={percentage ? strokePct : 0}
    />
  );
};

const CircleBig = ({colour, percentage}) => {
  const r = 100;
  const circ = 2 * Math.PI * r;
  const strokePct = ((100 - percentage) * circ) / 100; // where stroke will start, e.g. from 15% to 100%.
  return (
    <circle
      r={r}
      cx={40}
      cy={160}
      fill="transparent"
      stroke={strokePct !== circ ? colour : ""} // remove colour as 0% sets full circumference
      strokeWidth={"4rem"}
      strokeDasharray={circ}
      strokeDashoffset={percentage ? strokePct : 0}
    />
  );
};

const Text = ({percentage, length}) => {

  if (!length) return  (
    <text
      x="50%"
      y="50%"
      dominantBaseline="central"
      textAnchor="middle"
      fill='#00be14'
      className={c.text}
    >
      {percentage}
    </text>
  )

  return (
    <>
      <text
        x="40%"
        y="50%"
        dominantBaseline="central"
        textAnchor="middle"
        fill='#00be14'
        className={c.text}
      >
        {percentage}
      </text>

      <text
        x="50%"
        y="50%"
        dominantBaseline="central"
        textAnchor="middle"
        fill='silver'
        className={c.text}
      >
        /
      </text>

      <text
        x="60%"
        y="50%"
        dominantBaseline="central"
        textAnchor="middle"
        fill='rgba(96, 187, 230, 1)'
        className={c.text}
      >
        {length}
      </text>
    </>
  );
};

const Pie = ({percentage, colour, position}) => {
  const pct = cleanPercentage(percentage);
  return (
    <svg width={200} height={200}>
      <g transform={`rotate(-90 ${"100 100"})`}>
        <Circle colour="lightgrey"/>
        <Circle colour={colour} percentage={pct}/>
      </g>
      <Text percentage={position}/>
    </svg>
  );
};


const PieBig = ({percentage, position, length}) => {
  const pct = cleanPercentage(percentage);
  return (
    <svg width={320} height={320}>
      <g transform={`rotate(-90 ${"100 100"})`}>
        <CircleBig colour="silver"/>
        <CircleBig colour='#00be14' percentage={pct}/>
      </g>
      <Text percentage={position} length={length} />
    </svg>
  );
};

export {
  Pie,
  PieBig
}