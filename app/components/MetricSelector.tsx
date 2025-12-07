import React from 'react';

interface MetricSelectorProps {
  selectedMetrics: Record<string, boolean>;
  onToggleMetric: (metric: string) => void;
}

const metricLabels: Record<string, string> = {
  gdp: 'Community GDP',
  grants: 'Grants',
  bounties: 'Bounties',
  hackathons: 'Hackathons',
  xFollowers: 'X Followers',
  discordUsers: 'Discord Users',
  eventAttendees: 'Event Attendees',
  irlEvents: 'IRL Events',
  virtualEvents: 'Virtual Events',
  eventsHosted: 'Events Hosted',
  contributors: 'Contributors',
  members: 'Members'
};

export const MetricSelector: React.FC<MetricSelectorProps> = ({ selectedMetrics, onToggleMetric }) => {
  return (
    <div className="space-y-2">
      <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-4">Select Metrics</h3>
      <div className="space-y-2">
        {Object.entries(metricLabels).map(([key, label]) => (
          <label 
            key={key} 
            className="flex items-center space-x-3 text-[var(--text-primary)] cursor-pointer hover:bg-[var(--surface-highlight)] p-3 rounded-lg transition-colors sidebar-cursor"
          >
            <input
              type="checkbox"
              checked={selectedMetrics[key] || false}
              onChange={() => onToggleMetric(key)}
              className="w-4 h-4 accent-[var(--primary)] cursor-pointer"
            />
            <span className="text-sm">{label}</span>
          </label>
        ))}
      </div>
    </div>
  );
};
