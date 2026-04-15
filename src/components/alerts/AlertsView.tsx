import React from 'react';
import { Alert } from '@/src/types';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { AlertTriangle, CheckCircle2, Clock } from 'lucide-react';
import { motion } from 'motion/react';

interface AlertsViewProps {
  alerts: Alert[];
  markAsRead: (id: string) => void;
}

export function AlertsView({ alerts, markAsRead }: AlertsViewProps) {
  // Sort alerts: unread first, then high priority first
  const sortedAlerts = [...alerts].sort((a, b) => {
    if (a.read !== b.read) return a.read ? 1 : -1;
    if (a.priority !== b.priority) return a.priority === 'high' ? -1 : 1;
    return new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime();
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-white tracking-tight">System Alerts</h2>
        <div className="flex gap-2">
          <Badge variant="destructive">{alerts.filter(a => a.priority === 'high' && !a.read).length} High Priority</Badge>
          <Badge variant="outline">{alerts.filter(a => !a.read).length} Unread</Badge>
        </div>
      </div>

      <Card>
        <CardContent className="p-0">
          <div className="divide-y divide-white/10">
            {sortedAlerts.length === 0 ? (
              <div className="p-8 text-center text-white/50 flex flex-col items-center justify-center">
                <CheckCircle2 className="w-12 h-12 mb-4 opacity-20" />
                <p>No active alerts. System is operating normally.</p>
              </div>
            ) : (
              sortedAlerts.map((alert, index) => (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  key={alert.id} 
                  className={`p-4 flex items-start gap-4 transition-colors hover:bg-white/5 ${!alert.read ? 'bg-white/[0.02]' : 'opacity-60'} ${alert.priority === 'high' && !alert.read ? 'border-l-2 border-red-500' : ''}`}
                >
                  <div className="mt-1">
                    {alert.priority === 'high' ? (
                      <AlertTriangle className="w-5 h-5 text-red-500 drop-shadow-[0_0_8px_rgba(239,68,68,0.8)]" />
                    ) : (
                      <AlertTriangle className="w-5 h-5 text-yellow-500" />
                    )}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <h4 className="font-medium text-white">{alert.message}</h4>
                      <span className="text-xs text-white/40 flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {new Date(alert.timestamp).toLocaleString()}
                      </span>
                    </div>
                    <p className="text-sm text-white/60 mb-3">
                      Bin ID: {alert.binId} requires immediate attention to prevent overflow.
                    </p>
                    {!alert.read && (
                      <button 
                        onClick={() => markAsRead(alert.id)}
                        className="text-xs font-medium text-blue-400 hover:text-blue-300 transition-colors"
                      >
                        Mark as resolved
                      </button>
                    )}
                  </div>
                </motion.div>
              ))
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
