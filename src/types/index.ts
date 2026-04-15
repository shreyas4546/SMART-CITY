export type BinStatus = 'normal' | 'warning' | 'critical';

export interface Bin {
  id: string;
  lat: number;
  lng: number;
  fillLevel: number; // 0 to 100
  status: BinStatus;
  lastUpdated: string;
  locationName: string;
  predictedOverflowHours: number; // Advanced feature
  zoneId: string;
}

export interface Zone {
  id: string;
  name: string;
  center: [number, number];
  radius: number;
}

export interface ActivityEvent {
  id: string;
  message: string;
  timestamp: string;
  type: 'warning' | 'info' | 'critical' | 'success';
}

export interface Alert {
  id: string;
  binId: string;
  message: string;
  timestamp: string;
  priority: 'high' | 'medium' | 'low';
  read: boolean;
}

export interface Truck {
  id: string;
  name: string;
  capacity: number; // 0 to 100
  status: 'active' | 'idle' | 'maintenance';
  currentLat: number;
  currentLng: number;
}

export interface RoutePoint {
  lat: number;
  lng: number;
}
