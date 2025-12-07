import React from 'react';

interface CustomTooltipProps {
  active?: boolean;
  payload?: Array<{
    name: string;
    value: number;
    color: string;
    payload: {
      month: string;
      milestone?: string;
    };
  }>;
}

const formatNumber = (num: number): string => {
  if (num >= 1000000) return `$${(num / 1000000).toFixed(2)}M`;
  if (num >= 1000) return `$${(num / 1000).toFixed(0)}K`;
  return `$${num}`;
};

export const CustomTooltip: React.FC<CustomTooltipProps> = ({ active, payload }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-slate-900 p-4 rounded-lg border border-slate-700 shadow-xl">
        <p className="text-white font-semibold mb-2">{payload[0].payload.month}</p>
        {payload[0].payload.milestone && (
          <p className="text-blue-400 text-xs mb-2 font-semibold">🎯 {payload[0].payload.milestone}</p>
        )}
        {payload.map((entry, index) => (
          <p key={index} style={{ color: entry.color }} className="text-sm">
            {entry.name}: {typeof entry.value === 'number' && entry.value >= 10000 
              ? formatNumber(entry.value) 
              : entry.value.toLocaleString()}
          </p>
        ))}
      </div>
    );
  }
  return null;
};
