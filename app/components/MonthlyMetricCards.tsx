import React from 'react';
import { DollarSign, Gift, Award, Users, MessageCircle, MapPin, Video, Code, UserPlus, UserCheck, Calendar, TrendingUp } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from 'recharts';

interface MonthlyData {
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
}

interface MonthlyMetricCardsProps {
  data: MonthlyData;
  allData?: MonthlyData[];
}

const formatNumber = (num: number): string => {
  if (num >= 1000000) return `$${(num / 1000000).toFixed(2)}M`;
  if (num >= 1000) return `$${(num / 1000).toFixed(0)}K`;
  return num.toLocaleString();
};

const formatValue = (value: number, includeSymbol: boolean = false): string => {
  if (includeSymbol) {
    return formatNumber(value);
  }
  return value.toLocaleString();
};

export const MonthlyMetricCards: React.FC<MonthlyMetricCardsProps> = ({ data, allData }) => {
  const metrics = [
    { 
      label: 'Community GDP', 
      value: data.gdp, 
      icon: DollarSign, 
      includeSymbol: true,
      size: 'large' 
    },
    { 
      label: 'Grants', 
      value: data.grants, 
      icon: Gift, 
      includeSymbol: true,
      size: 'large' 
    },
    { 
      label: 'Bounties', 
      value: data.bounties, 
      icon: Award, 
      includeSymbol: true,
      size: 'normal' 
    },
    { 
      label: 'X Followers', 
      value: data.xFollowers, 
      icon: Users, 
      includeSymbol: false,
      size: 'normal' 
    },
    { 
      label: 'Discord Members', 
      value: data.discordUsers, 
      icon: MessageCircle, 
      includeSymbol: false,
      size: 'normal' 
    },
    // Center card placeholder - will be replaced with branding
    null,
    { 
      label: 'Event Attendees', 
      value: data.eventAttendees, 
      icon: Users, 
      includeSymbol: false,
      size: 'normal' 
    },
    { 
      label: 'IRL Events', 
      value: data.irlEvents, 
      icon: MapPin, 
      includeSymbol: false,
      size: 'normal' 
    },
    { 
      label: 'Virtual Events', 
      value: data.virtualEvents, 
      icon: Video, 
      includeSymbol: false,
      size: 'normal' 
    },
    { 
      label: 'Hackathons', 
      value: data.hackathons, 
      icon: Code, 
      includeSymbol: true,
      size: 'normal' 
    },
    { 
      label: 'Contributors', 
      value: data.contributors, 
      icon: UserPlus, 
      includeSymbol: false,
      size: 'normal' 
    },
  ];

  // Add conditional metrics
  if (data.eventsHosted) {
    metrics.push({ 
      label: 'Events Hosted', 
      value: data.eventsHosted, 
      icon: Calendar, 
      includeSymbol: false,
      size: 'normal' 
    });
  }
  
  if (data.members) {
    metrics.push({ 
      label: 'Members', 
      value: data.members, 
      icon: UserCheck, 
      includeSymbol: false,
      size: 'normal' 
    });
  }

  // Prepare data for charts
  const pieChartData = [
    { name: 'GDP', value: data.gdp, color: '#10b981' },
    { name: 'Grants', value: data.grants, color: '#3b82f6' },
    { name: 'Bounties', value: data.bounties, color: '#8b5cf6' },
    { name: 'Hackathons', value: data.hackathons, color: '#f59e0b' },
  ];

  // Get last 3 months for comparison
  const getComparisonData = () => {
    if (!allData) return [];
    const currentIndex = allData.findIndex(d => d.month === data.month);
    if (currentIndex === -1) return [];
    
    const startIndex = Math.max(0, currentIndex - 2);
    return allData.slice(startIndex, currentIndex + 1).map(d => ({
      month: d.month,
      GDP: d.gdp,
      Grants: d.grants,
      Bounties: d.bounties,
      Contributors: d.contributors,
    }));
  };

  const comparisonData = getComparisonData();
  const COLORS = ['#10b981', '#3b82f6', '#8b5cf6', '#f59e0b'];

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="glass-card p-4 rounded-lg shadow-xl">
          <p className="text-[var(--text-primary)] font-semibold mb-2">{payload[0].payload.month || payload[0].name}</p>
          {payload.map((entry: any, index: number) => (
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

  return (
    <div className="space-y-8">
      {/* Growth Charts Section */}
      {allData && comparisonData.length > 0 && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Bar Chart - Growth Comparison */}
          <div className="glass-card p-6 rounded-xl shadow-lg">
            <div className="flex items-center gap-2 mb-4">
              <TrendingUp className="w-6 h-6 text-[var(--text-accent)]" />
              <h3 className="text-xl font-bold text-[var(--text-primary)]">3-Month Growth Trend</h3>
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={comparisonData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#064e3b" />
                <XAxis dataKey="month" stroke="#6ee7b7" />
                <YAxis stroke="#6ee7b7" tickFormatter={(value) => {
                  if (value >= 1000000) return `${(value / 1000000).toFixed(1)}M`;
                  if (value >= 1000) return `${(value / 1000).toFixed(0)}K`;
                  return value.toString();
                }} />
                <Tooltip content={<CustomTooltip />} />
                <Legend />
                <Bar dataKey="GDP" fill="#10b981" radius={[8, 8, 0, 0]} />
                <Bar dataKey="Grants" fill="#3b82f6" radius={[8, 8, 0, 0]} />
                <Bar dataKey="Bounties" fill="#8b5cf6" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Pie Chart - Current Month Distribution */}
          <div className="glass-card p-6 rounded-xl shadow-lg">
            <div className="flex items-center gap-2 mb-4">
              <DollarSign className="w-6 h-6 text-[var(--text-accent)]" />
              <h3 className="text-xl font-bold text-[var(--text-primary)]">{data.month} Financial Distribution</h3>
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={pieChartData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }: any) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {pieChartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}

      {/* Metric Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {metrics.map((metric, index) => {
          // Center branding card
          if (metric === null) {
            return (
              <div 
                key="branding"
                className="bg-gradient-to-br from-emerald-600 to-emerald-800 p-8 rounded-xl shadow-lg flex flex-col items-center justify-center text-white"
              >
                <div className="text-6xl mb-4">🇳🇬</div>
                <h2 className="text-3xl font-bold text-center mb-2">Superteam Nigeria</h2>
                <p className="text-xl opacity-90">{data.month} 2025</p>
              </div>
            );
          }

          const Icon = metric.icon;
          const isLarge = metric.size === 'large';

          return (
            <div
              key={metric.label}
              className={`glass-card p-6 rounded-xl shadow-lg hover:scale-105 transition-all duration-300 ${
                isLarge ? 'md:col-span-1' : ''
              }`}
            >
              <div className="flex items-start justify-between mb-3">
                <Icon className="w-8 h-8 text-[var(--text-accent)]" />
              </div>
              <p className="text-sm text-[var(--text-secondary)] mb-2">{metric.label}</p>
              <p className="text-4xl font-bold text-[var(--text-primary)]">
                {formatValue(metric.value, metric.includeSymbol)}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};
