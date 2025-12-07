"use client";

import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line, Area, AreaChart } from 'recharts';
import { Calendar, TrendingUp, Users, DollarSign, Award, Building2, Scale, ChevronRight, Download } from 'lucide-react';
import { MetricSelector } from './components/MetricSelector';
import { MetricsChart } from './components/MetricsChart';
import { KeyHighlights } from './components/KeyHighlights';
import { MonthSelector } from './components/MonthSelector';
import { MonthlyMetricCards } from './components/MonthlyMetricCards';
import Wrapped2025 from './components/Wrapped2025';


type CategoryType = "Community Building" | "Technical Excellence" | "Economic Impact" | "Product Market Fit" | "Government Partnership" | "Regulatory Recognition";

type EventType = {
  event: string;
  date: string;
  month: number;
  metric: string;
  impact: string;
  value: number;
  category: CategoryType;
  impactScore: number;
  participants: number;
  builders?: number;
  speakers?: number;
  wins?: number;
  gdp?: number;
  volume?: number;
  startups?: number;
  attendees?: number;
};

const CryptoEventsVisualization = () => {
  const [selectedEvent, setSelectedEvent] = useState<EventType | null>(null);
  const [activeView, setActiveView] = useState('timeline');
  const [selectedMonth, setSelectedMonth] = useState('Nov');
  const [selectedMetrics, setSelectedMetrics] = useState<Record<string, boolean>>({
    gdp: true,
    grants: true,
    bounties: true,
    hackathons: false,
    xFollowers: false,
    discordUsers: false,
    eventAttendees: true,
    irlEvents: false,
    virtualEvents: false,
    eventsHosted: false,
    contributors: false,
    members: false
  });
  const events: Array<{
    event: string;
    date: string;
    month: number;
    metric: string;
    impact: string;
    value: number;
    category: CategoryType;
    impactScore: number;
    participants: number;
    builders?: number;
    speakers?: number;
    wins?: number;
    gdp?: number;
    volume?: number;
    startups?: number;
    attendees?: number;
  }> = [
    {
      event: "Startup Village",
      date: "March 2025",
      month: 3,
      builders: 900,
      speakers: 50,
      metric: "900 Builders, 50 Speakers",
      impact: 'Shifted the ecosystem from "digital-only" to a physical workforce. Resulted in Ribh Finance processing $4.1M TVP immediately after.',
      value: 4100000,
      category: "Community Building" as CategoryType,
      impactScore: 85,
      participants: 950
    },
    {
      event: "Redacted Hackathon",
      date: "July 2025",
      month: 7,
      wins: 45,
      metric: "45 Wins by Nigerian Teams",
      impact: "Proved deep technical competence. Helius Labs is infrastructure-heavy; winning here proved Nigerians can build backend, not just frontend.",
      value: 45,
      category: "Technical Excellence" as CategoryType,
      impactScore: 78,
      participants: 200
    },
    {
      event: "The $1M Milestone",
      date: "August 2025",
      month: 8,
      gdp: 1015570,
      metric: "$1,015,570 Community GDP",
      impact: 'Validated the "Work-to-Earn" thesis. This represents over $1M of foreign capital injected into the youth economy, bypassing traditional FDI routes.',
      value: 1015570,
      category: "Economic Impact" as CategoryType,
      impactScore: 92,
      participants: 500
    },
    {
      event: "Ribh Finance Growth",
      date: "September 2025",
      month: 9,
      volume: 12000000,
      metric: "$12 Million Monthly Volume",
      impact: "Demonstrated Product-Market Fit for crypto rails. Proved that stablecoins are solving real cross-border payment friction for African SMEs.",
      value: 12000000,
      category: "Product Market Fit" as CategoryType,
      impactScore: 95,
      participants: 300
    },
    {
      event: "NiYA Startup Pitch",
      date: "October 2025",
      month: 10,
      startups: 17,
      metric: "17 Startups funded (₦1M each)",
      impact: "Institutional Legitimacy. The Ministry of Youth adopted the Superteam model to solve unemployment, turning a crypto community into a policy partner.",
      value: 17000000,
      category: "Government Partnership" as CategoryType,
      impactScore: 88,
      participants: 150
    },
    {
      event: "Solana Summit Africa",
      date: "November 2025",
      month: 11,
      attendees: 800,
      metric: "800+ Attendees, SEC Presence",
      impact: "The Coronation. Bridged the gap between regulators and builders. Established Nigeria as a critical market for global Solana players like Birdeye.",
      value: 800,
      category: "Regulatory Recognition" as CategoryType,
      impactScore: 98,
      participants: 800
    }
  ];

  const monthlyData = [
    { month: 'Jan', monthNum: 1, gdp: 422624, grants: 131800, bounties: 178000, hackathons: 89069, xFollowers: 27400, discordUsers: 7000, eventAttendees: 49200, irlEvents: 12100, virtualEvents: 37100, contributors: 201 },
    { month: 'Feb', monthNum: 2, gdp: 465020, grants: 134000, bounties: 190800, hackathons: 88393, xFollowers: 28400, discordUsers: 7000, eventAttendees: 53900, irlEvents: 12100, virtualEvents: 41900, contributors: 227 },
    { month: 'Mar', monthNum: 3, gdp: 551000, grants: 204250, bounties: 205174, hackathons: 88511, xFollowers: 28696, discordUsers: 7000, eventAttendees: 55842, irlEvents: 12100, virtualEvents: 43700, contributors: 230, milestone: 'Startup Village' },
    { month: 'Apr', monthNum: 4, gdp: 653646, grants: 271350, bounties: 220838, hackathons: 108488, xFollowers: 30800, discordUsers: 7000, eventAttendees: 61900, irlEvents: 12900, virtualEvents: 49000, contributors: 249 },
    { month: 'May', monthNum: 5, gdp: 817905, grants: 312250, bounties: 290707, hackathons: 161977, xFollowers: 31957, discordUsers: 7000, eventAttendees: 68900, irlEvents: 15200, virtualEvents: 53700, contributors: 492, members: 206 },
    { month: 'Jun', monthNum: 6, gdp: 878507, grants: 331700, bounties: 325301, hackathons: 168536, xFollowers: 32617, discordUsers: 10000, eventAttendees: 73100, irlEvents: 15300, virtualEvents: 57900, contributors: 516, members: 217 },
    { month: 'Jul', monthNum: 7, gdp: 935710, grants: 331700, bounties: 366567, hackathons: 168473, xFollowers: 33420, discordUsers: 10402, eventAttendees: 78100, irlEvents: 15300, virtualEvents: 62900, eventsHosted: 2300, contributors: 519, members: 221, milestone: 'Redacted Hackathon' },
    { month: 'Aug', monthNum: 8, gdp: 1015570, grants: 378050, bounties: 378103, hackathons: 168447, xFollowers: 34100, discordUsers: 10712, eventAttendees: 83000, irlEvents: 16100, virtualEvents: 66900, eventsHosted: 2400, contributors: 510, members: 241, milestone: '$1M Milestone' },
    { month: 'Sep', monthNum: 9, gdp: 1089375, grants: 399100, bounties: 425965, hackathons: 168340, xFollowers: 35000, discordUsers: 10906, eventAttendees: 87700, irlEvents: 16500, virtualEvents: 71200, eventsHosted: 2600, contributors: 529, members: 204, milestone: 'Ribh Finance' },
    { month: 'Oct', monthNum: 10, gdp: 1136282, grants: 423250, bounties: 448818, hackathons: 168244, xFollowers: 35100, discordUsers: 11036, eventAttendees: 91600, irlEvents: 16900, virtualEvents: 74700, eventsHosted: 2800, contributors: 528, members: 205, milestone: 'NiYA Pitch' },
    { month: 'Nov', monthNum: 11, gdp: 1179340, grants: 426500, bounties: 464904, hackathons: 190465, xFollowers: 35900, discordUsers: 11095, eventAttendees: 92700, irlEvents: 16900, virtualEvents: 75800, eventsHosted: 2800, contributors: 530, members: 205, milestone: 'Solana Summit' }
  ];

  const categoryDistribution = [
    { name: "Community Building", value: 25, count: 1, color: "#10b981" },
    { name: "Technical Excellence", value: 15, count: 1, color: "#14b8a6" },
    { name: "Economic Impact", value: 20, count: 1, color: "#22c55e" },
    { name: "Product Market Fit", value: 20, count: 1, color: "#84cc16" },
    { name: "Government Partnership", value: 10, count: 1, color: "#06b6d4" },
    { name: "Regulatory Recognition", value: 10, count: 1, color: "#059669" }
  ];

  const impactGrowthData = events.map((e, idx) => ({
    month: e.date.split(' ')[0],
    impactScore: e.impactScore,
    participants: e.participants,
    cumulativeImpact: events.slice(0, idx + 1).reduce((sum, ev) => sum + ev.impactScore, 0)
  }));

  const financialMetrics = [
    { name: "Startup Village", value: 4.1, label: "$4.1M TVP" },
    { name: "Community GDP", value: 1.02, label: "$1.02M" },
    { name: "Ribh Finance", value: 12, label: "$12M Volume" },
    { name: "NiYA Funding", value: 0.57, label: "₦17M (~$570K)" }
  ];


  const getCategoryColor = (category: CategoryType) => {
    const colors: Record<CategoryType, string> = {
      "Community Building": "bg-emerald-500",
      "Technical Excellence": "bg-teal-500",
      "Economic Impact": "bg-green-500",
      "Product Market Fit": "bg-lime-500",
      "Government Partnership": "bg-cyan-500",
      "Regulatory Recognition": "bg-emerald-600"
    };
    return colors[category] || "bg-gray-500";
  };

  const getCategoryIcon = (category: CategoryType) => {
    const icons: Record<CategoryType, React.JSX.Element> = {
      "Community Building": <Users className="w-5 h-5" />,
      "Technical Excellence": <Award className="w-5 h-5" />,
      "Economic Impact": <DollarSign className="w-5 h-5" />,
      "Product Market Fit": <TrendingUp className="w-5 h-5" />,
      "Government Partnership": <Building2 className="w-5 h-5" />,
      "Regulatory Recognition": <Scale className="w-5 h-5" />
    };
    return icons[category] || <TrendingUp className="w-5 h-5" />;
  };

  const formatNumber = (num: number) => {
    if (num >= 1000000) return `$${(num / 1000000).toFixed(2)}M`;
    if (num >= 1000) return `$${(num / 1000).toFixed(0)}K`;
    return `$${num}`;
  };

  const formatYAxis = (value: number): string => {
    if (value >= 1000000) return `${(value / 1000000).toFixed(1)}M`;
    if (value >= 1000) return `${(value / 1000).toFixed(0)}K`;
    return value.toString();
  };

  const downloadCSV = () => {
    const headers = ['Month', 'GDP', 'Grants', 'Bounties', 'Hackathons', 'X Followers', 'Discord Users', 'Event Attendees', 'Contributors', 'Members', 'Milestone'];
    const csvData = monthlyData.map(row => [
      row.month,
      row.gdp,
      row.grants,
      row.bounties,
      row.hackathons,
      row.xFollowers,
      row.discordUsers,
      row.eventAttendees,
      row.contributors || '',
      row.members || '',
      row.milestone || ''
    ]);
    
    const csv = [headers, ...csvData].map(row => row.join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'superteam-nigeria-complete-metrics.csv';
    a.click();
  };

  const toggleMetric = (metric: string) => {
    setSelectedMetrics(prev => ({ ...prev, [metric]: !prev[metric] }));
  };

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-slate-900 p-4 rounded-lg border border-slate-700 shadow-xl">
          <p className="text-white font-semibold mb-2">{payload[0].payload.month}</p>
          {payload[0].payload.milestone && (
            <p className="text-blue-400 text-xs mb-2 font-semibold">🎯 {payload[0].payload.milestone}</p>
          )}
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

  const COLORS = ['#10b981', '#14b8a6', '#22c55e', '#84cc16', '#06b6d4', '#059669'];

  React.useEffect(() => {
    if (!selectedEvent && events.length > 0) {
      setSelectedEvent(events[0]);
    }
  }, []);

  return (
    <div className="w-full min-h-screen p-4 md:p-6 overflow-hidden transition-colors duration-300 max-w-7xl mx-auto">
      <div className="h-full flex flex-col">
        <div className="mb-8 md:mb-12 text-center pt-10 md:pt-16">
          <h1 className="text-4xl md:text-6xl font-extrabold mb-4 text-[var(--text-primary)] tracking-tight flex items-center justify-center gap-6 flex-wrap">
            <div className="logo-scanner">
              <img src="/logo.svg" alt="Superteam Logo" className="w-16 h-16 md:w-20 md:h-20" />
            </div>
            <span>Superteam Nigeria <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-600">Ecosystem 2025</span></span>
          </h1>
          <p className="text-lg md:text-xl text-[var(--text-secondary)] max-w-2xl mx-auto font-medium">
            Community Growth & Major Milestones
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            {['timeline', 'metrics', 'monthly', 'analytics', 'wrapped'].map((view) => (
              <button 
                key={view}
                onClick={() => setActiveView(view)}
                className={`px-6 py-2 rounded-lg font-medium transition-all duration-300 custom-cursor ${
                  activeView === view 
                    ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/30 scale-105' 
                    : 'glass-card text-[var(--text-secondary)] hover:bg-[var(--surface-highlight)]'
                }`}
              >
                {view.charAt(0).toUpperCase() + view.slice(1)} {view === 'metrics' ? 'Metrics' : view === 'monthly' ? 'Summary' : view === 'analytics' ? 'Dashboard' : view === 'wrapped' ? '2025' : 'View'}
              </button>
            ))}
          </div>
        </div>

        {activeView === 'timeline' ? (
          <div className="flex-1 flex flex-col lg:flex-row gap-6 overflow-hidden">
            <div className="w-full lg:w-96 glass-card rounded-xl p-6 overflow-y-auto">
              <h2 className="text-xl font-bold text-[var(--text-primary)] mb-4 flex items-center gap-2">
                <Calendar className="w-6 h-6 text-[var(--text-accent)]" />
                Timeline Events
              </h2>
              <div className="space-y-3">
                {events.map((event, idx) => (
                    <div
                      key={idx}
                      onClick={() => setSelectedEvent(event)}
                      className={`p-4 rounded-lg cursor-pointer transition-all border-l-4 sidebar-cursor ${
                        selectedEvent?.event === event.event
                          ? `bg-[var(--surface-highlight)] ${getCategoryColor(event.category).replace('bg-', 'border-')} shadow-lg scale-105`
                          : `bg-[var(--surface)] border-[var(--border)] hover:bg-[var(--surface-highlight)]`
                      }`}
                    >
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <div className={`w-8 h-8 rounded-full ${getCategoryColor(event.category)} flex items-center justify-center text-white text-xs font-bold`}>
                            {event.month}
                          </div>
                          <h3 className="font-bold text-white text-sm">{event.event}</h3>
                        </div>
                        <p className="text-xs text-[var(--text-secondary)] mb-2">{event.date}</p>
                      </div>
                      <ChevronRight className={`w-5 h-5 ${selectedEvent?.event === event.event ? 'text-[var(--text-accent)]' : 'text-[var(--text-secondary)]'}`} />
                    </div>
                    <div className="flex items-center gap-2 text-xs">
                      <div className={`px-2 py-1 rounded ${getCategoryColor(event.category)} text-white flex items-center gap-1`}>
                        {getCategoryIcon(event.category)}
                        <span className="hidden sm:inline">{event.category}</span>
                      </div>
                      <div className="text-[var(--text-secondary)]">
                        Impact: <span className="text-[var(--text-primary)] font-semibold">{event.impactScore}/100</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex-1 glass-card rounded-xl p-8 overflow-y-auto">
              {selectedEvent ? (
                <div className="h-full flex flex-col">
                  <div className="mb-6">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h2 className="text-4xl font-bold text-[var(--text-primary)] mb-2">{selectedEvent.event}</h2>
                        <div className="flex items-center gap-3 text-[var(--text-secondary)]">
                          <Calendar className="w-5 h-5 text-[var(--text-accent)]" />
                          <span className="text-lg">{selectedEvent.date}</span>
                        </div>
                      </div>
                      <div className={`px-4 py-2 rounded-full ${getCategoryColor(selectedEvent.category)} text-white font-medium flex items-center gap-2`}>
                        {getCategoryIcon(selectedEvent.category)}
                        {selectedEvent.category}
                      </div>
                    </div>

                    <div className="grid grid-cols-3 gap-4 mb-6">
                      <div className="bg-emerald-500/10 border border-emerald-500/30 p-4 rounded-lg">
                        <div className="flex items-center gap-2 mb-2">
                          <TrendingUp className="w-5 h-5 text-emerald-500" />
                          <span className="text-[var(--text-secondary)] text-sm">Impact Score</span>
                        </div>
                        <div className="text-3xl font-bold text-[var(--text-primary)]">{selectedEvent.impactScore}<span className="text-xl text-[var(--text-secondary)]">/100</span></div>
                        <div className="mt-2 w-full bg-slate-700 rounded-full h-2">
                          <div 
                            className="h-2 rounded-full bg-gradient-to-r from-emerald-400 to-emerald-600"
                            style={{ width: `${selectedEvent.impactScore}%` }}
                          ></div>
                        </div>
                      </div>
                      
                      <div className="bg-teal-500/10 border border-teal-500/30 p-4 rounded-lg">
                        <div className="flex items-center gap-2 mb-2">
                          <Users className="w-5 h-5 text-teal-500" />
                          <span className="text-[var(--text-secondary)] text-sm">Participants</span>
                        </div>
                        <div className="text-3xl font-bold text-[var(--text-primary)]">{selectedEvent.participants.toLocaleString()}</div>
                        <div className="text-sm text-[var(--text-secondary)] mt-1">people engaged</div>
                      </div>
                      
                      <div className="bg-green-500/10 border border-green-500/30 p-4 rounded-lg">
                        <div className="flex items-center gap-2 mb-2">
                          <DollarSign className="w-5 h-5 text-green-500" />
                          <span className="text-[var(--text-secondary)] text-sm">Value</span>
                        </div>
                        <div className="text-2xl font-bold text-[var(--text-primary)]">
                          {selectedEvent.value > 1000000 
                            ? `$${(selectedEvent.value / 1000000).toFixed(1)}M` 
                            : selectedEvent.value.toLocaleString()}
                        </div>
                        <div className="text-sm text-[var(--text-secondary)] mt-1">generated</div>
                      </div>
                    </div>
                  </div>

                  <div className="mb-6 p-5 bg-[var(--surface-highlight)] rounded-lg border border-[var(--border)]">
                    <h3 className="font-semibold text-[var(--text-accent)] mb-2 text-lg flex items-center gap-2">
                      <Award className="w-5 h-5" />
                      Key Metric
                    </h3>
                    <p className="text-[var(--text-primary)] text-xl font-semibold">{selectedEvent.metric}</p>
                  </div>

                  <div className="flex-1 p-5 bg-[var(--surface)] rounded-lg border border-[var(--border)]">
                    <h3 className="font-semibold text-teal-500 mb-3 text-lg flex items-center gap-2">
                      <TrendingUp className="w-5 h-5" />
                      Impact & Ripple Effect
                    </h3>
                    <p className="text-[var(--text-secondary)] text-lg leading-relaxed">{selectedEvent.impact}</p>
                  </div>

                  <div className="mt-6 pt-4 border-t border-[var(--border)]">
                    <div className="flex items-center justify-between text-sm text-[var(--text-secondary)]">
                      <span>Event {events.findIndex(e => e.event === selectedEvent.event) + 1} of {events.length}</span>
                      <span>Month {selectedEvent.month} of 2025</span>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="h-full flex items-center justify-center text-[var(--text-secondary)]">
                  <p>Select an event from the timeline to view details</p>
                </div>
              )}
            </div>
          </div>
        ) : activeView === 'metrics' ? (
          <div className="flex-1 flex flex-col lg:flex-row gap-6 overflow-hidden">
            {/* Left Sidebar - Metric Selector */}
            <div className="w-full lg:w-80 glass-card rounded-xl p-6 overflow-y-auto">
              <div className="mb-6">
                <h2 className="text-xl font-semibold text-[var(--text-primary)] mb-4">Community Growth Metrics</h2>
                <p className="text-sm text-[var(--text-secondary)]">Jan - Nov 2025</p>
              </div>
              <MetricSelector 
                selectedMetrics={selectedMetrics}
                onToggleMetric={toggleMetric}
              />
              <div className="mt-6 pt-6 border-t border-[var(--border)]">
                <button
                  onClick={downloadCSV}
                  className="w-full flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-3 rounded-lg transition-colors"
                >
                  <Download size={18} />
                  Export CSV
                </button>
              </div>
            </div>

            {/* Right Side - Chart and Highlights */}
            <div className="flex-1 flex flex-col gap-6 overflow-y-auto">
              <div className="bg-slate-800/50 rounded-xl p-6 backdrop-blur">
                <MetricsChart data={monthlyData} selectedMetrics={selectedMetrics} />
              </div>
              <div className="glass-card rounded-xl p-6">
                <h3 className="text-xl font-semibold text-[var(--text-primary)] mb-4">Key Highlights</h3>
                <KeyHighlights data={monthlyData} />
              </div>
            </div>
          </div>
        ) : activeView === 'monthly' ? (
          <div className="flex-1 flex flex-col lg:flex-row gap-6 overflow-hidden">
            {/* Left Sidebar - Month Selector */}
            <div className="w-full lg:w-64 glass-card rounded-xl p-6 overflow-y-auto">
              <MonthSelector 
                months={monthlyData.map(d => d.month)}
                selectedMonth={selectedMonth}
                onSelectMonth={setSelectedMonth}
              />
            </div>

            {/* Right Side - Monthly Metric Cards */}
            <div className="flex-1 overflow-y-auto">
              <div className="glass-card rounded-xl p-8 min-h-full">
                <MonthlyMetricCards 
                  data={monthlyData.find(d => d.month === selectedMonth) || monthlyData[monthlyData.length - 1]}
                  allData={monthlyData}
                />
              </div>
            </div>
          </div>
        ) : activeView === 'analytics' ? (
          <div className="flex-1 overflow-y-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">

              <div className="glass-card p-6 rounded-xl shadow-2xl">
                <h3 className="text-xl font-bold text-[var(--text-primary)] mb-4">Cumulative Impact Score</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <AreaChart data={impactGrowthData}>
                    <defs>
                      <linearGradient id="colorImpact" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#10b981" stopOpacity={0.8}/>
                        <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                    <XAxis dataKey="month" stroke="var(--text-secondary)" />
                    <YAxis stroke="var(--text-secondary)" />
                    <Tooltip 
                      contentStyle={{ backgroundColor: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '8px' }}
                      labelStyle={{ color: 'var(--text-primary)' }}
                    />
                    <Area type="monotone" dataKey="cumulativeImpact" stroke="#10b981" fillOpacity={1} fill="url(#colorImpact)" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>

              <div className="glass-card p-6 rounded-xl shadow-2xl">
                <h3 className="text-xl font-bold text-[var(--text-primary)] mb-4">Impact Category Distribution</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={categoryDistribution}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }: any) => name && percent !== undefined ? `${name.split(' ')[0]} ${(percent * 100).toFixed(0)}%` : ''}
                      outerRadius={100}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {categoryDistribution.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip 
                      contentStyle={{ backgroundColor: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '8px', color: 'var(--text-primary)' }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>

              <div className="glass-card p-6 rounded-xl shadow-2xl lg:col-span-2">
                <h3 className="text-xl font-bold text-[var(--text-primary)] mb-4">Financial Impact Metrics (USD Millions)</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={financialMetrics}>
                    <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                    <XAxis dataKey="name" stroke="var(--text-secondary)" />
                    <YAxis stroke="var(--text-secondary)" />
                    <Tooltip 
                      contentStyle={{ backgroundColor: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '8px' }}
                      labelStyle={{ color: 'var(--text-primary)' }}
                    />
                    <Bar dataKey="value" fill="#10b981" radius={[8, 8, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>

              <div className="glass-card p-6 rounded-xl shadow-2xl lg:col-span-2">
                <h3 className="text-xl font-bold text-[var(--text-primary)] mb-4">Event Participation & Impact Correlation</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={impactGrowthData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                    <XAxis dataKey="month" stroke="var(--text-secondary)" />
                    <YAxis yAxisId="left" stroke="var(--text-secondary)" />
                    <YAxis yAxisId="right" orientation="right" stroke="var(--text-secondary)" />
                    <Tooltip 
                      contentStyle={{ backgroundColor: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '8px' }}
                      labelStyle={{ color: 'var(--text-primary)' }}
                    />
                    <Legend />
                    <Line yAxisId="left" type="monotone" dataKey="participants" stroke="#10b981" strokeWidth={3} name="Participants" />
                    <Line yAxisId="right" type="monotone" dataKey="impactScore" stroke="#34d399" strokeWidth={3} name="Impact Score" />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="p-6 bg-gradient-to-br from-emerald-500 to-emerald-700 rounded-xl shadow-lg text-center transform hover:scale-105 transition-all">
                <Users className="w-10 h-10 mx-auto mb-3 text-white" />
                <div className="text-3xl font-bold text-white">2,900+</div>
                <div className="text-sm text-emerald-100">Total Participants</div>
              </div>
              <div className="p-6 bg-gradient-to-br from-teal-500 to-teal-700 rounded-xl shadow-lg text-center transform hover:scale-105 transition-all">
                <DollarSign className="w-10 h-10 mx-auto mb-3 text-white" />
                <div className="text-3xl font-bold text-white">$17.7M</div>
                <div className="text-sm text-teal-100">Total Value Generated</div>
              </div>
              <div className="p-6 bg-gradient-to-br from-green-500 to-green-700 rounded-xl shadow-lg text-center transform hover:scale-105 transition-all">
                <Award className="w-10 h-10 mx-auto mb-3 text-white" />
                <div className="text-3xl font-bold text-white">536</div>
                <div className="text-sm text-green-100">Total Impact Score</div>
              </div>
              <div className="p-6 bg-gradient-to-br from-lime-500 to-lime-700 rounded-xl shadow-lg text-center transform hover:scale-105 transition-all">
                <Building2 className="w-10 h-10 mx-auto mb-3 text-white" />
                <div className="text-3xl font-bold text-white">6</div>
                <div className="text-sm text-lime-100">Major Milestones</div>
              </div>
            </div>
          </div>
        ) : activeView === 'wrapped' ? (
            <div className="flex-1 overflow-hidden h-full min-h-[600px]">
                <Wrapped2025 onClose={() => setActiveView('timeline')} />
            </div>
        ) : null}
      </div>
    </div>
  );
};

export default CryptoEventsVisualization;