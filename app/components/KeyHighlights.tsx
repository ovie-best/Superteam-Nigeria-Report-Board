import React from 'react';

interface MonthlyDataPoint {
  month: string;
  gdp: number;
  grants: number;
  eventAttendees: number;
}

interface KeyHighlightsProps {
  data: MonthlyDataPoint[];
}

const formatNumber = (num: number): string => {
  if (num >= 1000000) return `$${(num / 1000000).toFixed(2)}M`;
  if (num >= 1000) return `$${(num / 1000).toFixed(0)}K`;
  return `$${num}`;
};

export const KeyHighlights: React.FC<KeyHighlightsProps> = ({ data }) => {
  const firstMonth = data[0];
  const lastMonth = data[data.length - 1];

  const gdpGrowth = lastMonth.gdp - firstMonth.gdp;
  const gdpPercentage = ((lastMonth.gdp / firstMonth.gdp - 1) * 100).toFixed(1);
  
  const attendeesPercentage = ((lastMonth.eventAttendees / firstMonth.eventAttendees - 1) * 100).toFixed(1);
  
  const grantsPercentage = ((lastMonth.grants / firstMonth.grants - 1) * 100).toFixed(1);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div className="bg-gradient-to-br from-lime-500 to-lime-600 p-6 rounded-xl shadow-xl">
        <p className="text-sm text-lime-100 mb-1">Community GDP Growth</p>
        <p className="text-4xl font-bold text-white mb-2">{formatNumber(gdpGrowth)}</p>
        <p className="text-sm text-lime-100">+{gdpPercentage}% increase</p>
      </div>
      
      <div className="bg-gradient-to-br from-teal-500 to-teal-600 p-6 rounded-xl shadow-xl">
        <p className="text-sm text-teal-100 mb-1">Total Event Attendees</p>
        <p className="text-4xl font-bold text-white mb-2">{lastMonth.eventAttendees.toLocaleString()}</p>
        <p className="text-sm text-teal-100">+{attendeesPercentage}% increase</p>
      </div>
      
      <div className="bg-gradient-to-br from-emerald-500 to-emerald-600 p-6 rounded-xl shadow-xl">
        <p className="text-sm text-emerald-100 mb-1">Total Grants Distributed</p>
        <p className="text-4xl font-bold text-white mb-2">{formatNumber(lastMonth.grants)}</p>
        <p className="text-sm text-emerald-100">+{grantsPercentage}% increase</p>
      </div>
    </div>
  );
};
