import React from 'react';

interface MonthSelectorProps {
  months: string[];
  selectedMonth: string;
  onSelectMonth: (month: string) => void;
}

export const MonthSelector: React.FC<MonthSelectorProps> = ({ months, selectedMonth, onSelectMonth }) => {
  return (
    <div className="space-y-2">
      <h3 className="text-lg font-semibold text-[var(--text-accent)] mb-4">Select Month</h3>
      <div className="space-y-1">
        {months.map((month) => (
          <button
            key={month}
            onClick={() => onSelectMonth(month)}
            className={`w-full text-left px-4 py-3 rounded-lg transition-all sidebar-cursor ${
              selectedMonth === month
                ? 'bg-[var(--primary)] text-white font-semibold shadow-lg'
                : 'bg-[var(--surface)] text-[var(--text-secondary)] hover:bg-[var(--surface-highlight)] hover:text-[var(--text-primary)]'
            }`}
          >
            {month} 2025
          </button>
        ))}
      </div>
    </div>
  );
};
