// components/charts/DonutChart.jsx
import React from 'react'
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts'

// Custom Tooltip – NOW FULLY OVERLAYS EVERYTHING
const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white rounded-2xl shadow-2xl border border-gray-200 px-4 py-3 pointer-events-none">
        <p className="text-xs font-medium text-gray-600">{payload[0].name}</p>
        <p className="text-lg font-bold text-gray-900 mt-1">
          {payload[0].value}%
        </p>
      </div>
    )
  }
  return null
}

const DonutChart = ({ data, total, title, subtitle = 'Devices Sold',formatter }) => {
  return (
    <div className="bg-white rounded-xl border border-gray-100">
      <div className="p-6">
        <h3 className="font-semibold text-gray-900 mb-6">{title}</h3>

        <div className="flex items-center justify-center gap-10">
          {/* Donut Chart */}
          <div className="relative flex-shrink-0">
            <ResponsiveContainer width={200} height={200}>
              <PieChart>
                <Pie
                  data={data}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  innerRadius={68}
                  outerRadius={92}
                  paddingAngle={5}
                  cornerRadius={0}
                  startAngle={90}
                  endAngle={-270}
                >
                  {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>

                {/* TOOLTIP NOW OVERLAYS EVERYTHING */}
                <Tooltip
                  formatter={formatter || ((value) => value)}
                  contentStyle={{
                    borderRadius: 8,
                    border: 'none',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                    fontSize: 13,
                  }}
                />
              </PieChart>
            </ResponsiveContainer>

            {/* Center Text */}
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
              <div className="text-3xl font-bold text-gray-900 leading-none">
                {total}
              </div>
              <div className="text-xs text-gray-600 mt-1 font-medium tracking-tight">
                {subtitle}
              </div>
            </div>
          </div>

          {/* Legend */}
          <div className="h-52 flex flex-col justify-center space-y-4">
            {data.map((item) => (
              <div key={item.name} className="flex items-center gap-3">
                <div
                  className="w-3 h-3 rounded-full flex-shrink-0"
                  style={{ backgroundColor: item.color }}
                />
                <div className="text-sm">
                  <span className="font-medium text-gray-900">
                    {item.value}%
                  </span>{' '}
                  <span className="text-gray-600">{item.name}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default DonutChart
