import React from 'react';

interface StatsCardProps {
  value: string | number;
  label: string;
  Icon: React.ComponentType<{ className?: string }>;
  iconColor: string;
}

export default function StatsCard({ value, label, Icon, iconColor }: StatsCardProps) {
  return (
    <div className="bg-white dark:bg-card rounded-xl p-4 sm:p-6 shadow-lg border border-gray-100 dark:border-border hover:shadow-xl transition-all duration-200 hover:scale-105 min-h-[120px] flex items-center justify-center">
      <div className="text-center">
        <p className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 dark:text-foreground mb-2" data-testid={`stat-${label.toLowerCase().replace(/\s+/g, '-')}`}>
          {value}
        </p>
        <p className="text-xs sm:text-sm text-gray-600 dark:text-muted-foreground font-medium tracking-wide">{label}</p>
      </div>
    </div>
  );
}
