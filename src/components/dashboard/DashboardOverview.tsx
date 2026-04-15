import React from 'react';
import { Bin, Alert, Truck, ActivityEvent } from '@/src/types';
import { StatCard } from './StatCard';
import { Trash2, AlertTriangle, Truck as TruckIcon, Activity, BrainCircuit, Clock, Zap } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { motion, AnimatePresence } from 'motion/react';

interface DashboardOverviewProps {
  bins: Bin[];
  alerts: Alert[];
  trucks: Truck[];
  activities: ActivityEvent[];
  stressMultiplier: number;
  setStressMultiplier: (val: number) => void;
}

export function DashboardOverview({ bins, alerts, trucks, activities, stressMultiplier, setStressMultiplier }: DashboardOverviewProps) {
  const criticalBins = bins.filter(b => b.status === 'critical').length;
  const warningBins = bins.filter(b => b.status === 'warning').length;
  const activeTrucks = trucks.filter(t => t.status === 'active').length;
  
  const avgFillLevel = Math.round(bins.reduce((acc, bin) => acc + bin.fillLevel, 0) / bins.length);

  // Get top 3 bins predicted to overflow soonest
  const predictiveBins = [...bins]
    .filter(b => b.fillLevel < 100)
    .sort((a, b) => a.predictedOverflowHours - b.predictedOverflowHours)
    .slice(0, 3);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-3">
          <StatCard 
            title="Total Bins Monitored" 
            value={bins.length} 
            icon={Trash2} 
            color="blue"
          />
        </div>
        <div className="lg:col-span-3">
          <StatCard 
            title="Critical Overflow" 
            value={criticalBins} 
            icon={AlertTriangle} 
            color="red"
            trend="+2 since last hour"
            trendUp={false}
          />
        </div>
        <div className="lg:col-span-3">
          <StatCard 
            title="Active Trucks" 
            value={`${activeTrucks}/${trucks.length}`} 
            icon={TruckIcon} 
            color="green"
          />
        </div>
        <div className="lg:col-span-3">
          <StatCard 
            title="Avg Fill Level" 
            value={`${avgFillLevel}%`} 
            icon={Activity} 
            color={avgFillLevel > 75 ? 'red' : avgFillLevel > 50 ? 'yellow' : 'green'}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-8 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BrainCircuit className="w-5 h-5 text-purple-400" />
                AI Predictive Overflow Analysis
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {predictiveBins.map((bin, i) => (
                  <motion.div 
                    key={bin.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="p-4 rounded-xl bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/10 relative overflow-hidden"
                  >
                    <div className={`absolute top-0 right-0 w-24 h-24 blur-[40px] rounded-full ${bin.predictedOverflowHours < 5 ? 'bg-red-500/20' : 'bg-yellow-500/20'}`} />
                    <div className="flex justify-between items-start mb-4 relative z-10">
                      <div>
                        <h4 className="font-bold text-white">{bin.locationName}</h4>
                        <p className="text-xs text-white/50">ID: {bin.id}</p>
                      </div>
                      <Badge variant={bin.predictedOverflowHours < 5 ? 'destructive' : 'warning'}>
                        {bin.fillLevel}%
                      </Badge>
                    </div>
                    <div className="flex items-center gap-2 text-sm relative z-10">
                      <Clock className="w-4 h-4 text-purple-400" />
                      <span className="text-white/80">Est. Overflow:</span>
                      <span className="font-bold text-white">{bin.predictedOverflowHours} hrs</span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Zap className="w-5 h-5 text-blue-400" />
                System Stress Test (Simulation)
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="flex justify-between text-sm">
                  <span className="text-white/60">Waste Generation Rate</span>
                  <span className="font-bold text-blue-400 bg-blue-500/10 px-3 py-1 rounded-full border border-blue-500/20">{stressMultiplier}x Normal</span>
                </div>
                
                {/* Neumorphic Slider */}
                <div className="relative h-6 bg-[#0a0a0a] rounded-full shadow-[inset_2px_2px_6px_rgba(0,0,0,0.8),inset_-1px_-1px_4px_rgba(255,255,255,0.05)] flex items-center px-1">
                  <div 
                    className="absolute h-4 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 shadow-[0_0_10px_rgba(59,130,246,0.5)] pointer-events-none"
                    style={{ width: `${((stressMultiplier - 1) / 9) * 100}%` }}
                  />
                  <input 
                    type="range" 
                    min="1" 
                    max="10" 
                    step="1"
                    value={stressMultiplier}
                    onChange={(e) => setStressMultiplier(Number(e.target.value))}
                    className="w-full h-full appearance-none bg-transparent cursor-pointer relative z-10 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:shadow-[0_0_10px_rgba(255,255,255,0.8)]"
                  />
                </div>
                
                <p className="text-xs text-white/40">
                  Increase to simulate holiday seasons, events, or reduced collection frequency. Watch the predictive models and alerts react in real-time.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card className="flex flex-col h-[500px] lg:col-span-4 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/80 pointer-events-none z-10" />
          <CardHeader className="relative z-20 bg-black/40 backdrop-blur-md border-b border-white/5">
            <CardTitle className="flex items-center justify-between">
              Real-Time Activity
              <div className="flex items-center gap-2">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                </span>
                <span className="text-xs text-white/40 uppercase tracking-wider">Live</span>
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent className="flex-1 overflow-hidden relative">
            <div className="absolute inset-0 overflow-y-auto p-6 pt-0 space-y-4 custom-scrollbar">
              <AnimatePresence initial={false}>
                {activities.map((activity) => (
                  <motion.div 
                    key={activity.id}
                    initial={{ opacity: 0, height: 0, x: -20 }}
                    animate={{ opacity: 1, height: 'auto', x: 0 }}
                    exit={{ opacity: 0, height: 0 }}
                    className="flex gap-3 items-start"
                  >
                    <div className="mt-1">
                      {activity.type === 'critical' && <div className="w-2 h-2 rounded-full bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.8)]" />}
                      {activity.type === 'warning' && <div className="w-2 h-2 rounded-full bg-yellow-500 shadow-[0_0_8px_rgba(234,179,8,0.8)]" />}
                      {activity.type === 'info' && <div className="w-2 h-2 rounded-full bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.8)]" />}
                      {activity.type === 'success' && <div className="w-2 h-2 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.8)]" />}
                    </div>
                    <div>
                      <p className={`text-sm ${activity.type === 'critical' ? 'text-red-200' : 'text-white/90'}`}>
                        {activity.message}
                      </p>
                      <p className="text-xs text-white/40 mt-1">{new Date(activity.timestamp).toLocaleTimeString()}</p>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
