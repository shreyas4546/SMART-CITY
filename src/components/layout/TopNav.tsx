import React from 'react';
import { Bell, Search, User } from 'lucide-react';
import { Alert } from '@/src/types';

interface TopNavProps {
  alerts: Alert[];
}

export function TopNav({ alerts }: TopNavProps) {
  const unreadCount = alerts.filter(a => !a.read).length;

  return (
    <header className="h-16 border-b border-white/10 bg-black/40 backdrop-blur-xl flex items-center justify-between px-6 sticky top-0 z-50">
      <div className="flex items-center gap-4 flex-1">
        <div className="relative w-64">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-white/40" />
          <input 
            type="text" 
            placeholder="Search sectors, bins..." 
            className="w-full bg-white/5 border border-white/10 rounded-full py-1.5 pl-9 pr-4 text-sm text-white focus:outline-none focus:border-blue-500/50 focus:bg-white/10 transition-all"
          />
        </div>
      </div>

      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2 text-sm text-white/60">
          <span className="w-2 h-2 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.8)] animate-pulse"></span>
          System Online
        </div>
        
        <div className="w-px h-6 bg-white/10 mx-2"></div>

        <button className="relative p-2 text-white/60 hover:text-white transition-colors rounded-full hover:bg-white/5">
          <Bell className="w-5 h-5" />
          {unreadCount > 0 && (
            <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.8)]"></span>
          )}
        </button>

        <button className="w-8 h-8 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-white hover:bg-white/20 transition-colors">
          <User className="w-4 h-4" />
        </button>
      </div>
    </header>
  );
}
