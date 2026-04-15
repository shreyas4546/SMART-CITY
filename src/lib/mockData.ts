import { Bin, Alert, Truck, Zone } from '../types';

// Center around a mock city (e.g., Singapore or a generic grid)
// Let's use Singapore coordinates: 1.3521, 103.8198
const CITY_CENTER = { lat: 1.3521, lng: 103.8198 };

export const mockZones: Zone[] = [
  { id: 'zone-north', name: 'North District', center: [CITY_CENTER.lat + 0.04, CITY_CENTER.lng], radius: 3000 },
  { id: 'zone-south', name: 'South District', center: [CITY_CENTER.lat - 0.03, CITY_CENTER.lng + 0.02], radius: 2500 },
  { id: 'zone-west', name: 'West District', center: [CITY_CENTER.lat, CITY_CENTER.lng - 0.05], radius: 3500 },
  { id: 'zone-east', name: 'East District', center: [CITY_CENTER.lat + 0.01, CITY_CENTER.lng + 0.06], radius: 2800 },
];

export const generateMockBins = (count: number): Bin[] => {
  return Array.from({ length: count }).map((_, i) => {
    const fillLevel = Math.floor(Math.random() * 100);
    let status: 'normal' | 'warning' | 'critical' = 'normal';
    if (fillLevel > 85) status = 'critical';
    else if (fillLevel > 60) status = 'warning';

    const zone = mockZones[i % mockZones.length];
    // Place bin roughly within its zone
    const lat = zone.center[0] + (Math.random() - 0.5) * 0.04;
    const lng = zone.center[1] + (Math.random() - 0.5) * 0.04;

    return {
      id: `bin-${i + 1}`,
      lat,
      lng,
      fillLevel,
      status,
      lastUpdated: new Date().toISOString(),
      locationName: `${zone.name} - Sector ${String.fromCharCode(65 + (i % 26))}`,
      predictedOverflowHours: Math.max(1, Math.floor((100 - fillLevel) / (Math.random() * 5 + 1))),
      zoneId: zone.id,
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
