import React from 'react';
import { Bin, Alert, Truck } from '@/src/types';
import { StatCard } from './StatCard';
import { Trash2, AlertTriangle, Truck as TruckIcon, Activity } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { motion } from 'motion/react';

interface DashboardOverviewProps {
  bins: Bin[];
  alerts: Alert[];
  trucks: Truck[];
}

export function DashboardOverview({ bins, alerts, trucks }: DashboardOverviewProps) {
  const criticalBins = bins.filter(b => b.status === 'critical').length;
  const warningBins = bins.filter(b => b.status === 'warning').length;
  const activeTrucks = trucks.filter(t => t.status === 'active').length;
  
  const avgFillLevel = Math.round(bins.reduce((acc, bin) => acc + bin.fillLevel, 0) / bins.length);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard 
          title="Total Bins Monitored" 
          value={bins.length} 
          icon={Trash2} 
          color="blue"
        />
        <StatCard 
          title="Critical Overflow" 
          value={criticalBins} 
          icon={AlertTriangle} 
          color="red"
          trend="+2 since last hour"
          trendUp={false}
        />
        <StatCard 
          title="Active Trucks" 
          value={`${activeTrucks}/${trucks.length}`} 
          icon={TruckIcon} 
          color="green"
        />
        <StatCard 
          title="Avg Fill Level" 
          value={`${avgFillLevel}%`} 
          icon={Activity} 
          color={avgFillLevel > 75 ? 'red' : avgFillLevel > 50 ? 'yellow' : 'green'}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>System Status Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] flex items-center justify-center border border-white/5 rounded-lg bg-black/20">
              {/* Placeholder for a chart, we will add Recharts here later if needed, or just a stylized visual */}
              <div className="flex flex-col items-center justify-center text-white/40">
                <Activity className="w-12 h-12 mb-4 opacity-20" />
                <p>Live metrics visualization active in Analytics tab</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              Recent Alerts
              <Badge variant="destructive">{alerts.filter(a => !a.read).length} New</Badge>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {alerts.slice(0, 5).map((alert, i) => (
              <motion.div 
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                key={alert.id} 
                className="flex gap-3 p-3 rounded-lg bg-white/5 border border-white/5 hover:bg-white/10 transition-colors"
              >
                <div className="mt-0.5">
                  <div className="w-2 h-2 rounded-full bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.8)]" />
                </div>
                <div>
                  <p className="text-sm text-white/90">{alert.message}</p>
                  <p className="text-xs text-white/40 mt-1">{new Date(alert.timestamp).toLocaleTimeString()}</p>
                </div>
              </motion.div>
            ))}
            {alerts.length === 0 && (
              <div className="text-center text-white/40 py-8">
                No active alerts
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
