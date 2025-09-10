import React from 'react';

interface StatsCardProps {
  value: string | number;
  label: string;
  Icon: React.ComponentType<{ className?: string }>;
  iconColor: string;
}

export default function StatsCard({ value, label, Icon, iconColor }: StatsCardProps) {
  return (
    <div className="bg-white dark:bg-card rounded-xl p-6 shadow-lg border border-gray-100 dark:border-border hover:shadow-xl transition-all duration-200 hover:scale-105">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-4xl font-bold text-gray-900 dark:text-foreground mb-2" data-testid={`stat-${label.toLowerCase().replace(/\s+/g, '-')}`}>
            {value}
          </p>
          <p className="text-sm text-gray-600 dark:text-muted-foreground font-medium tracking-wide">{label}</p>
        </div>
        <div className="flex-shrink-0 ml-4">
          <div className="w-12 h-12 rounded-lg bg-gray-50 dark:bg-muted/50 flex items-center justify-center">
            <Icon className={`text-xl ${iconColor}`} />
          </div>
        </div>
      </div>
    </div>
  );
}
