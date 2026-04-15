import React, { useState, useEffect } from 'react';
import { Sidebar } from '../components/layout/Sidebar';
import { TopNav } from '../components/layout/TopNav';
import { DashboardOverview } from '../components/dashboard/DashboardOverview';
import { LiveMap } from '../components/map/LiveMap';
import { AnalyticsView } from '../components/analytics/AnalyticsView';
import { AlertsView } from '../components/alerts/AlertsView';
import { AIInsights } from '../components/ai/AIInsights';
import { initialBins, initialAlerts, initialTrucks } from '../lib/mockData';
import { Bin, Alert, Truck, ActivityEvent } from '../types';

export function Dashboard() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [bins, setBins] = useState<Bin[]>(initialBins);
  const [alerts, setAlerts] = useState<Alert[]>(initialAlerts);
  const [trucks, setTrucks] = useState<Truck[]>(initialTrucks);
  const [activities, setActivities] = useState<ActivityEvent[]>([
    { id: 'act-init', message: 'System initialized. Monitoring 30 bins.', timestamp: new Date().toISOString(), type: 'info' }
  ]);
  const [stressMultiplier, setStressMultiplier] = useState(1);

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      let newActivity: ActivityEvent | null = null;

      setBins(currentBins => {
        const newBins = currentBins.map(bin => {
          // Simulate fill level increase, accelerated by stressMultiplier
          const increase = (Math.random() > 0.7 ? 1 : 0) * stressMultiplier;
          const newFillLevel = Math.min(100, bin.fillLevel + increase);
          
          let status: 'normal' | 'warning' | 'critical' = 'normal';
          if (newFillLevel > 85) status = 'critical';
          else if (newFillLevel > 60) status = 'warning';

          // Activity generation logic
          if (status === 'critical' && bin.status !== 'critical') {
            newActivity = {
              id: `act-${Date.now()}`,
              message: `CRITICAL: ${bin.locationName} reached ${Math.floor(newFillLevel)}% capacity.`,
              timestamp: new Date().toISOString(),
              type: 'critical'
            };
          } else if (status === 'warning' && bin.status === 'normal' && !newActivity) {
            newActivity = {
              id: `act-${Date.now()}`,
              message: `Warning: ${bin.locationName} is filling up (${Math.floor(newFillLevel)}%).`,
              timestamp: new Date().toISOString(),
              type: 'warning'
            };
          }

          // Update predicted overflow hours
          const predictedOverflowHours = Math.max(1, Math.floor((100 - newFillLevel) / (Math.random() * 5 * stressMultiplier + 1)));

          return {
            ...bin,
            fillLevel: newFillLevel,
            status,
            predictedOverflowHours,
            lastUpdated: new Date().toISOString()
          };
        });

        // Generate new alerts for newly critical bins
        const newCriticalBins = newBins.filter(b => b.status === 'critical');
        setAlerts(currentAlerts => {
          const newAlerts = [...currentAlerts];
          newCriticalBins.forEach(bin => {
            if (!newAlerts.some(a => a.binId === bin.id && !a.read)) {
              newAlerts.unshift({
                id: `alert-${Date.now()}-${bin.id}`,
                binId: bin.id,
                message: `Bin ${bin.id} at ${bin.locationName} is nearing overflow (${bin.fillLevel}%).`,
                timestamp: new Date().toISOString(),
                priority: 'high',
                read: false,
              });
            }
          });
          return newAlerts;
        });

        return newBins;
      });

      // Simulate truck movement
      setTrucks(currentTrucks => currentTrucks.map(truck => {
        if (truck.status === 'active') {
          return {
            ...truck,
            currentLat: truck.currentLat + (Math.random() - 0.5) * 0.002 * stressMultiplier,
            currentLng: truck.currentLng + (Math.random() - 0.5) * 0.002 * stressMultiplier,
          };
        }
        return truck;
      }));

      if (newActivity) {
        setActivities(prev => [newActivity!, ...prev].slice(0, 20)); // Keep last 20
      }

    }, 3000); // Update every 3 seconds for demo purposes

    return () => clearInterval(interval);
  }, [stressMultiplier]);

  const markAlertAsRead = (id: string) => {
    setAlerts(alerts.map(a => a.id === id ? { ...a, read: true } : a));
  };

  return (
    <div className="flex h-screen bg-[#050505] text-white overflow-hidden font-sans selection:bg-blue-500/30">
      {/* Background ambient glow */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-blue-900/20 blur-[150px] animate-ambient-drift" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-green-900/10 blur-[150px] animate-ambient-drift" style={{ animationDelay: '-7s' }} />
        <div className="absolute top-[40%] left-[40%] w-[30%] h-[30%] rounded-full bg-purple-900/10 blur-[120px] animate-ambient-drift" style={{ animationDelay: '-3s' }} />
      </div>

      <div className="z-10 flex h-full w-full">
        <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
        
        <div className="flex-1 flex flex-col h-full overflow-hidden relative">
          <TopNav alerts={alerts} />
          
          <main className="flex-1 overflow-y-auto p-6 scroll-smooth">
            <div className="max-w-7xl mx-auto">
              {activeTab === 'dashboard' && (
                <DashboardOverview 
                  bins={bins} 
                  alerts={alerts} 
                  trucks={trucks} 
                  activities={activities}
                  stressMultiplier={stressMultiplier}
                  setStressMultiplier={setStressMultiplier}
                />
              )}
              {activeTab === 'map' && <LiveMap bins={bins} trucks={trucks} />}
              {activeTab === 'analytics' && <AnalyticsView bins={bins} />}
              {activeTab === 'alerts' && <AlertsView alerts={alerts} markAsRead={markAlertAsRead} />}
              {activeTab === 'ai' && <AIInsights bins={bins} alerts={alerts} />}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
