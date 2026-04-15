import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/Card';
import { Bin } from '@/src/types';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';

interface AnalyticsViewProps {
  bins: Bin[];
}

export function AnalyticsView({ bins }: AnalyticsViewProps) {
  // Mock historical data
  const historicalData = Array.from({ length: 7 }).map((_, i) => ({
    day: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'][i],
    collected: Math.floor(Math.random() * 50) + 100,
    overflows: Math.floor(Math.random() * 5),
  }));

  const fillLevelDistribution = [
    { name: '0-25%', count: bins.filter(b => b.fillLevel <= 25).length },
    { name: '26-50%', count: bins.filter(b => b.fillLevel > 25 && b.fillLevel <= 50).length },
    { name: '51-75%', count: bins.filter(b => b.fillLevel > 50 && b.fillLevel <= 75).length },
    { name: '76-100%', count: bins.filter(b => b.fillLevel > 75).length },
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Weekly Collection vs Overflows</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={historicalData} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                  <XAxis dataKey="day" stroke="rgba(255,255,255,0.5)" />
                  <YAxis yAxisId="left" stroke="rgba(255,255,255,0.5)" />
                  <YAxis yAxisId="right" orientation="right" stroke="rgba(255,255,255,0.5)" />
                  <Tooltip 
                    contentStyle={{ backgroundColor: 'rgba(0,0,0,0.8)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px' }}
                  />
                  <Line yAxisId="left" type="monotone" dataKey="collected" stroke="#3b82f6" strokeWidth={3} dot={{ r: 4 }} />
                  <Line yAxisId="right" type="monotone" dataKey="overflows" stroke="#ef4444" strokeWidth={3} dot={{ r: 4 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Current Fill Level Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={fillLevelDistribution} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                  <XAxis dataKey="name" stroke="rgba(255,255,255,0.5)" />
                  <YAxis stroke="rgba(255,255,255,0.5)" />
                  <Tooltip 
                    contentStyle={{ backgroundColor: 'rgba(0,0,0,0.8)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px' }}
                    cursor={{ fill: 'rgba(255,255,255,0.05)' }}
                  />
                  <Bar dataKey="count" fill="#22c55e" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Predictive Analysis: Time to Overflow</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left text-white/70">
              <thead className="text-xs text-white/50 uppercase bg-white/5">
                <tr>
                  <th className="px-6 py-3 rounded-tl-lg">Bin ID</th>
                  <th className="px-6 py-3">Location</th>
                  <th className="px-6 py-3">Current Fill</th>
                  <th className="px-6 py-3 rounded-tr-lg">Est. Time to Overflow</th>
                </tr>
              </thead>
              <tbody>
                {bins.filter(b => b.fillLevel > 50).sort((a, b) => a.predictedOverflowHours - b.predictedOverflowHours).slice(0, 10).map((bin, i) => (
                  <tr key={bin.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                    <td className="px-6 py-4 font-medium text-white">{bin.id}</td>
                    <td className="px-6 py-4">{bin.locationName}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <div className="w-16 bg-white/10 rounded-full h-1.5">
                          <div className="bg-blue-500 h-1.5 rounded-full" style={{ width: `${bin.fillLevel}%` }}></div>
                        </div>
                        <span>{bin.fillLevel}%</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={bin.predictedOverflowHours < 5 ? "text-red-400 font-bold" : "text-yellow-400"}>
                        {bin.predictedOverflowHours} hours
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
