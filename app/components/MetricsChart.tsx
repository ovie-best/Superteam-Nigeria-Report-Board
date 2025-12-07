import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { CustomTooltip } from './CustomTooltip';

interface MonthlyDataPoint {
  month: string;
  monthNum: number;
  gdp: number;
  grants: number;
  bounties: number;
  hackathons: number;
  xFollowers: number;
  discordUsers: number;
  eventAttendees: number;
  irlEvents: number;
  virtualEvents: number;
  eventsHosted?: number;
  contributors: number;
  members?: number;
  milestone?: string;
}

interface MetricsChartProps {
  data: MonthlyDataPoint[];
  selectedMetrics: Record<string, boolean>;
}

const formatYAxis = (value: number): string => {
  if (value >= 1000000) return `${(value / 1000000).toFixed(1)}M`;
  if (value >= 1000) return `${(value / 1000).toFixed(0)}K`;
  return value.toString();
};

export const MetricsChart: React.FC<MetricsChartProps> = ({ data, selectedMetrics }) => {
  return (
    <ResponsiveContainer width="100%" height={500}>
      <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
        <XAxis dataKey="month" stroke="var(--text-secondary)" />
        <YAxis stroke="var(--text-secondary)" tickFormatter={formatYAxis} />
        <Tooltip content={<CustomTooltip />} />
        <Legend wrapperStyle={{ color: 'var(--text-primary)' }} />
        
        {selectedMetrics.gdp && (
          <Line 
            type="monotone" 
            dataKey="gdp" 
            stroke="#FFD700" 
            strokeWidth={4} 
            name="Community GDP" 
            dot={{ r: 6, fill: '#FFD700' }}
            activeDot={{ r: 8 }}
          />
        )}
        {selectedMetrics.grants && (
          <Line type="monotone" dataKey="grants" stroke="#10B981" strokeWidth={2} name="Grants" dot={{ r: 4 }} />
        )}
        {selectedMetrics.bounties && (
          <Line type="monotone" dataKey="bounties" stroke="#14B8A6" strokeWidth={2} name="Bounties" dot={{ r: 4 }} />
        )}
        {selectedMetrics.hackathons && (
          <Line type="monotone" dataKey="hackathons" stroke="#22C55E" strokeWidth={2} name="Hackathons" dot={{ r: 4 }} />
        )}
        {selectedMetrics.xFollowers && (
          <Line type="monotone" dataKey="xFollowers" stroke="#84CC16" strokeWidth={2} name="X Followers" dot={{ r: 4 }} />
        )}
        {selectedMetrics.discordUsers && (
          <Line type="monotone" dataKey="discordUsers" stroke="#059669" strokeWidth={2} name="Discord Users" dot={{ r: 4 }} />
        )}
        {selectedMetrics.eventAttendees && (
          <Line type="monotone" dataKey="eventAttendees" stroke="#10B981" strokeWidth={2} name="Event Attendees" dot={{ r: 4 }} />
        )}
        {selectedMetrics.irlEvents && (
          <Line type="monotone" dataKey="irlEvents" stroke="#14B8A6" strokeWidth={2} name="IRL Events" dot={{ r: 4 }} />
        )}
        {selectedMetrics.virtualEvents && (
          <Line type="monotone" dataKey="virtualEvents" stroke="#06B6D4" strokeWidth={2} name="Virtual Events" dot={{ r: 4 }} />
        )}
        {selectedMetrics.eventsHosted && (
          <Line type="monotone" dataKey="eventsHosted" stroke="#34D399" strokeWidth={2} name="Events Hosted" dot={{ r: 4 }} />
        )}
        {selectedMetrics.contributors && (
          <Line type="monotone" dataKey="contributors" stroke="#10B981" strokeWidth={2} name="Contributors" dot={{ r: 4 }} />
        )}
        {selectedMetrics.members && (
          <Line type="monotone" dataKey="members" stroke="#06B6D4" strokeWidth={2} name="Members" dot={{ r: 4 }} />
        )}
      </LineChart>
    </ResponsiveContainer>
  );
};
