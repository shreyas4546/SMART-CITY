import React from 'react';
import { Card, CardContent } from '../ui/Card';
import { cn } from '@/src/lib/utils';
import { LucideIcon } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  trend?: string;
  trendUp?: boolean;
  color?: 'blue' | 'green' | 'red' | 'yellow';
}

export function StatCard({ title, value, icon: Icon, trend, trendUp, color = 'blue' }: StatCardProps) {
  const colorStyles = {
    blue: "text-blue-400 bg-blue-500/10 border-blue-500/20 shadow-[0_0_15px_rgba(37,99,235,0.15)]",
    green: "text-green-400 bg-green-500/10 border-green-500/20 shadow-[0_0_15px_rgba(34,197,94,0.15)]",
    red: "text-red-400 bg-red-500/10 border-red-500/20 shadow-[0_0_15px_rgba(239,68,68,0.15)]",
    yellow: "text-yellow-400 bg-yellow-500/10 border-yellow-500/20 shadow-[0_0_15px_rgba(234,179,8,0.15)]",
  };

  return (
    <Card className="overflow-hidden relative group">
      <div className={cn("absolute top-0 left-0 w-1 h-full", colorStyles[color].split(' ')[0].replace('text-', 'bg-'))} />
      <CardContent className="p-6">
        <div className="flex justify-between items-start">
          <div>
            <p className="text-sm font-medium text-white/50 mb-1">{title}</p>
            <h3 className="text-3xl font-bold text-white tracking-tight">{value}</h3>
            {trend && (
              <p className={cn("text-xs mt-2 font-medium flex items-center gap-1", trendUp ? "text-green-400" : "text-red-400")}>
                {trendUp ? '↑' : '↓'} {trend}
              </p>
            )}
          </div>
          <div className={cn("p-3 rounded-lg border", colorStyles[color])}>
            <Icon className="w-5 h-5" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
