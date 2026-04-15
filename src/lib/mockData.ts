import { Bin, Alert, Truck } from '../types';

// Center around a mock city (e.g., Singapore or a generic grid)
// Let's use Singapore coordinates: 1.3521, 103.8198
const CITY_CENTER = { lat: 1.3521, lng: 103.8198 };

export const generateMockBins = (count: number): Bin[] => {
  return Array.from({ length: count }).map((_, i) => {
    const fillLevel = Math.floor(Math.random() * 100);
    let status: 'normal' | 'warning' | 'critical' = 'normal';
    if (fillLevel > 85) status = 'critical';
    else if (fillLevel > 60) status = 'warning';

    return {
      id: `bin-${i + 1}`,
      lat: CITY_CENTER.lat + (Math.random() - 0.5) * 0.1,
      lng: CITY_CENTER.lng + (Math.random() - 0.5) * 0.1,
      fillLevel,
      status,
      lastUpdated: new Date().toISOString(),
      locationName: `Sector ${String.fromCharCode(65 + (i % 26))}-${Math.floor(Math.random() * 100)}`,
      predictedOverflowHours: Math.max(1, Math.floor((100 - fillLevel) / (Math.random() * 5 + 1))),
    };
  });
};

export const initialBins = generateMockBins(30);

export const initialAlerts: Alert[] = initialBins
  .filter((bin) => bin.status === 'critical')
  .map((bin, i) => ({
    id: `alert-${i}`,
    binId: bin.id,
    message: `Bin ${bin.id} at ${bin.locationName} is nearing overflow (${bin.fillLevel}%).`,
    timestamp: new Date().toISOString(),
    priority: 'high',
    read: false,
  }));

export const initialTrucks: Truck[] = [
  { id: 'truck-1', name: 'Alpha Unit', capacity: 45, status: 'active', currentLat: CITY_CENTER.lat + 0.01, currentLng: CITY_CENTER.lng + 0.01 },
  { id: 'truck-2', name: 'Beta Unit', capacity: 12, status: 'idle', currentLat: CITY_CENTER.lat - 0.02, currentLng: CITY_CENTER.lng - 0.01 },
  { id: 'truck-3', name: 'Gamma Unit', capacity: 88, status: 'maintenance', currentLat: CITY_CENTER.lat + 0.03, currentLng: CITY_CENTER.lng - 0.02 },
];
