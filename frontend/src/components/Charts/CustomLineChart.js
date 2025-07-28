import React from 'react';
import {
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Area, AreaChart
} from 'recharts';
import CustomToolTip from './CustomToolTip';

const CustomLineChart = ({ data }) => {
  return (
    <div style={{ backgroundColor: 'white', marginTop: '1.5rem'}}>
      <ResponsiveContainer width="100%" height={300}>
        <AreaChart data={data}>
          <defs>
            <linearGradient id="incomeGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#ec4899" stopOpacity={0.4} />
              <stop offset="95%" stopColor="#ec4899" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid stroke="none" />
          <XAxis dataKey="label" tick={{ fontSize: 12, fill: "#555" }} stroke="none" />
          <YAxis tick={{ fontSize: 12, fill: "#555" }} stroke="none" />
          <Tooltip content={<CustomToolTip />} />
          <Area type="monotone" dataKey="amount" stroke="#ec4899" fill="url(#incomeGradient)" strokeWidth={3} dot={{ r: 3, fill: "#f88dddff" }} />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default CustomLineChart;