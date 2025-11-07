// components/charts/DynamicChart.jsx
import React from 'react';
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

const DynamicChart = ({
  type,
  data,
  dataKey,
  xAxisKey = 'name',
  title,
  badges = [],
  height = 240,
  color = '#3b82f6',
  formatter,
  barSize = 16, // NEW: Control bar width! (default was ~40–60)
}) => {
  const ChartComponent = type === 'bar' ? BarChart : LineChart;
  const BarOrLine = type === 'bar' ? Bar : Line;

  return (
    <div className="bg-white rounded-xl border border-gray-100">
      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold text-gray-900">{title}</h3>
          <div className="flex gap-2">
            {badges.map((badge, i) => (
              <span
                key={i}
                className={`px-3 py-1 text-xs font-medium rounded-full ${
                  badge.variant === 'outline'
                    ? 'border border-gray-300 text-gray-700 bg-white'
                    : 'text-white'
                }`}
                style={{ backgroundColor: badge.color || '#e5e7eb' }}
              >
                {badge.label}
              </span>
            ))}
          </div>
        </div>

        <ResponsiveContainer width="100%" height={height}>
          <ChartComponent data={data}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
            
            <XAxis
              dataKey={xAxisKey}
              tick={{ fontSize: 12 }}
              axisLine={false}
              tickLine={false}
            />
            
            <YAxis tick={{ fontSize: 12 }} axisLine={false} tickLine={false} />
            
            <Tooltip
              formatter={formatter || ((value) => value)}
              contentStyle={{
                borderRadius: 12,
                border: 'none',
                boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
                fontSize: 13,
              }}
            />
            
            <BarOrLine
              dataKey={dataKey}
              fill={type === 'bar' ? color : undefined}
              stroke={type === 'line' ? color : undefined}
              strokeWidth={type === 'line' ? 1.18 : undefined}
              dot={type === 'line' ? { fill: color, r: 1 } : false}
              radius={type === 'bar' ? [4, 4, 0, 0] : undefined}
              type={type === 'line' ? 'monotone' : undefined}
              
              // THIS MAKES THE BARS THINNER
              barSize={type === 'bar' ? barSize : undefined}
            />
          </ChartComponent>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default DynamicChart;