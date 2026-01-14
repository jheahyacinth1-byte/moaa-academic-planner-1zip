import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell
} from 'recharts';
import { AggregatedStats } from '../types';
import { SUBJECTS } from '../constants';

interface StatsProps {
  data: AggregatedStats;
}

export const Stats: React.FC<StatsProps> = ({ data }) => {
  const chartData = SUBJECTS.map(sub => {
    const subData = data.subjectBreakdown.find(s => s.subjectId === sub.id);
    return {
      name: sub.code,
      hours: subData ? parseFloat((subData.seconds / 3600).toFixed(1)) : 0,
      color: sub.color
    };
  });

  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
      <h3 className="text-lg font-bold text-slate-800 mb-4">Weekly Velocity</h3>
      <div className="h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData} barSize={40}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
            <XAxis 
              dataKey="name" 
              axisLine={false} 
              tickLine={false} 
              tick={{ fill: '#64748b', fontSize: 12 }} 
              dy={10}
            />
            <YAxis 
              axisLine={false} 
              tickLine={false} 
              tick={{ fill: '#64748b', fontSize: 12 }}
              unit="h"
            />
            <Tooltip 
              cursor={{ fill: '#f8fafc' }}
              contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
            />
            <Bar dataKey="hours" radius={[4, 4, 0, 0]}>
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
      <div className="mt-4 flex justify-between text-xs text-gray-500 px-2">
         <span>Target: 22h / week</span>
         <span>Current Avg: {(data.totalSeconds / 3600 / 12).toFixed(1)}h / week</span>
      </div>
    </div>
  );
};