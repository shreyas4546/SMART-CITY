import React, { useState, useEffect } from 'react';
import { Sidebar } from '../components/layout/Sidebar';
import { TopNav } from '../components/layout/TopNav';
import { DashboardOverview } from '../components/dashboard/DashboardOverview';
import { LiveMap } from '../components/map/LiveMap';
import { AnalyticsView } from '../components/analytics/AnalyticsView';
import { AlertsView } from '../components/alerts/AlertsView';
import { AIInsights } from '../components/ai/AIInsights';
import { initialBins, initialAlerts, initialTrucks } from '../lib/mockData';
import { Bin, Alert, Truck } from '../types';

export function Dashboard() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [bins, setBins] = useState<Bin[]>(initialBins);
  const [alerts, setAlerts] = useState<Alert[]>(initialAlerts);
  const [trucks, setTrucks] = useState<Truck[]>(initialTrucks);

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setBins(currentBins => {
        const newBins = currentBins.map(bin => {
          // Simulate fill level increase
          const newFillLevel = Math.min(100, bin.fillLevel + (Math.random() > 0.7 ? 1 : 0));
          let status: 'normal' | 'warning' | 'critical' = 'normal';
          if (newFillLevel > 85) status = 'critical';
          else if (newFillLevel > 60) status = 'warning';

          // Update predicted overflow hours
          const predictedOverflowHours = Math.max(1, Math.floor((100 - newFillLevel) / (Math.random() * 5 + 1)));

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
            currentLat: truck.currentLat + (Math.random() - 0.5) * 0.001,
            currentLng: truck.currentLng + (Math.random() - 0.5) * 0.001,
          };
        }
        return truck;
      }));

    }, 3000); // Update every 3 seconds for demo purposes

    return () => clearInterval(interval);
  }, []);

  const markAlertAsRead = (id: string) => {
    setAlerts(alerts.map(a => a.id === id ? { ...a, read: true } : a));
  };

  return (
    <div className="flex h-screen bg-[#050505] text-white overflow-hidden font-sans selection:bg-blue-500/30">
      {/* Background ambient glow */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-blue-900/20 blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-green-900/10 blur-[120px]" />
      </div>

      <div className="z-10 flex h-full w-full">
        <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
        
        <div className="flex-1 flex flex-col h-full overflow-hidden relative">
          <TopNav alerts={alerts} />
          
          <main className="flex-1 overflow-y-auto p-6 scroll-smooth">
            <div className="max-w-7xl mx-auto">
              {activeTab === 'dashboard' && <DashboardOverview bins={bins} alerts={alerts} trucks={trucks} />}
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
