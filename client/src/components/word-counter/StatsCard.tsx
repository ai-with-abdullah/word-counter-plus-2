interface StatsCardProps {
  value: string | number;
  label: string;
  icon: string;
  iconColor: string;
}

export default function StatsCard({ value, label, icon, iconColor }: StatsCardProps) {
  return (
    <div className="bg-card rounded-lg p-4 shadow-sm border border-border">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-2xl font-bold text-foreground" data-testid={`stat-${label.toLowerCase().replace(/\s+/g, '-')}`}>
            {value}
          </p>
          <p className="text-sm text-muted-foreground">{label}</p>
        </div>
        <i className={`${icon} text-xl ${iconColor}`}></i>
      </div>
    </div>
  );
}
