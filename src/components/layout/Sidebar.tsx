import React from 'react';
import { LayoutDashboard, Map, BarChart3, Bell, Settings, Truck, BrainCircuit } from 'lucide-react';
import { cn } from '@/src/lib/utils';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export function Sidebar({ activeTab, setActiveTab }: SidebarProps) {
  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'map', label: 'Live Map', icon: Map },
    { id: 'analytics', label: 'Analytics', icon: BarChart3 },
    { id: 'alerts', label: 'Alerts', icon: Bell },
    { id: 'ai', label: 'AI Insights', icon: BrainCircuit },
  ];

  return (
    <aside className="w-64 border-r border-white/10 bg-black/40 backdrop-blur-xl flex flex-col h-full">
      <div className="p-6 flex items-center gap-3 border-b border-white/10">
        <div className="w-8 h-8 rounded bg-blue-600 flex items-center justify-center shadow-[0_0_15px_rgba(37,99,235,0.8)]">
          <Truck className="w-5 h-5 text-white" />
        </div>
        <h1 className="font-bold text-lg text-white tracking-wider uppercase">City<span className="text-blue-400">Waste</span></h1>
      </div>

      <nav className="flex-1 p-4 space-y-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={cn(
                "w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200",
                isActive 
                  ? "bg-blue-600/20 text-blue-400 border border-blue-500/30 shadow-[inset_0_0_20px_rgba(37,99,235,0.15)]" 
                  : "text-white/60 hover:bg-white/5 hover:text-white"
              )}
            >
              <Icon className={cn("w-5 h-5", isActive ? "text-blue-400" : "text-white/40")} />
              {item.label}
            </button>
          );
        })}
      </nav>

      <div className="p-4 border-t border-white/10">
        <button className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-white/60 hover:bg-white/5 hover:text-white transition-all">
          <Settings className="w-5 h-5 text-white/40" />
          Settings
        </button>
      </div>
    </aside>
  );
}
