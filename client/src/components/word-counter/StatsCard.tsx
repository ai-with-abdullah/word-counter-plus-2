interface StatsCardProps {
  value: string | number;
  label: string;
  icon: string;
  iconColor: string;
}

export default function StatsCard({ value, label, icon, iconColor }: StatsCardProps) {
  return (
    <div className="bg-card rounded-lg p-6 shadow-sm border border-border hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <p className="text-3xl font-bold text-foreground mb-1" data-testid={`stat-${label.toLowerCase().replace(/\s+/g, '-')}`}>
            {value}
          </p>
          <p className="text-sm text-muted-foreground font-medium">{label}</p>
        </div>
        <div className="ml-4">
          <i className={`${icon} text-2xl ${iconColor} opacity-80`}></i>
        </div>
      </div>
    </div>
  );
}
