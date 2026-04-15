import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polyline, useMap } from 'react-leaflet';
import L from 'leaflet';
import { Bin, Truck } from '@/src/types';
import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';

// Fix Leaflet icon issue
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

const createCustomIcon = (color: string) => {
  return L.divIcon({
    className: 'custom-icon',
    html: `<div style="background-color: ${color}; width: 16px; height: 16px; border-radius: 50%; border: 2px solid white; box-shadow: 0 0 10px ${color};"></div>`,
    iconSize: [16, 16],
    iconAnchor: [8, 8],
  });
};

const truckIcon = L.divIcon({
  className: 'truck-icon',
  html: `<div style="background-color: #3b82f6; width: 20px; height: 20px; border-radius: 4px; border: 2px solid white; box-shadow: 0 0 15px #3b82f6; display: flex; align-items: center; justify-content: center;"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10 17h4V5H2v12h3"/><path d="M20 17h2v-3.34a4 4 0 0 0-1.17-2.83L19 9h-5"/><path d="M14 17h1"/><circle cx="7.5" cy="17.5" r="2.5"/><circle cx="17.5" cy="17.5" r="2.5"/></svg></div>`,
  iconSize: [20, 20],
  iconAnchor: [10, 10],
});

interface LiveMapProps {
  bins: Bin[];
  trucks: Truck[];
}

export function LiveMap({ bins, trucks }: LiveMapProps) {
  const [selectedTruck, setSelectedTruck] = useState<Truck | null>(null);
  const [route, setRoute] = useState<[number, number][]>([]);

  const center: [number, number] = [1.3521, 103.8198]; // Singapore center

  const generateRoute = (truck: Truck) => {
    setSelectedTruck(truck);
    // Simple mock route: Truck -> Critical Bin 1 -> Critical Bin 2 ...
    const criticalBins = bins.filter(b => b.status === 'critical').sort((a, b) => {
      // Sort by distance to truck roughly
      const distA = Math.pow(a.lat - truck.currentLat, 2) + Math.pow(a.lng - truck.currentLng, 2);
      const distB = Math.pow(b.lat - truck.currentLat, 2) + Math.pow(b.lng - truck.currentLng, 2);
      return distA - distB;
    });

    const newRoute: [number, number][] = [
      [truck.currentLat, truck.currentLng],
      ...criticalBins.map(b => [b.lat, b.lng] as [number, number])
    ];
    setRoute(newRoute);
  };

  return (
    <div className="h-[calc(100vh-12rem)] relative rounded-xl overflow-hidden border border-white/10 shadow-2xl">
      <MapContainer 
        center={center} 
        zoom={13} 
        style={{ height: '100%', width: '100%', background: '#0a0a0a' }}
        zoomControl={false}
      >
        {/* Dark theme map tiles */}
        <TileLayer
          url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
        />
        
        {bins.map(bin => {
          let color = '#22c55e'; // green
          if (bin.status === 'warning') color = '#eab308'; // yellow
          if (bin.status === 'critical') color = '#ef4444'; // red

          return (
            <Marker 
              key={bin.id} 
              position={[bin.lat, bin.lng]} 
              icon={createCustomIcon(color)}
            >
              <Popup className="custom-popup">
                <div className="p-1">
                  <h4 className="font-bold text-gray-900">{bin.locationName}</h4>
                  <p className="text-sm text-gray-600 mb-2">ID: {bin.id}</p>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium">Fill Level:</span>
                    <Badge variant={bin.status === 'critical' ? 'destructive' : bin.status === 'warning' ? 'warning' : 'success'}>
                      {bin.fillLevel}%
                    </Badge>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
                    <div 
                      className="h-2 rounded-full" 
                      style={{ 
                        width: `${bin.fillLevel}%`,
                        backgroundColor: color
                      }}
                    ></div>
                  </div>
                  <p className="text-xs text-gray-500">
                    Predicted Overflow: <span className="font-bold">{bin.predictedOverflowHours}h</span>
                  </p>
                </div>
              </Popup>
            </Marker>
          );
        })}

        {trucks.map(truck => (
          <Marker 
            key={truck.id} 
            position={[truck.currentLat, truck.currentLng]}
            icon={truckIcon}
          >
            <Popup>
              <div className="p-1">
                <h4 className="font-bold text-gray-900">{truck.name}</h4>
                <p className="text-sm text-gray-600 mb-2">Capacity: {truck.capacity}%</p>
                <Button size="sm" onClick={() => generateRoute(truck)} className="w-full">
                  Optimize Route
                </Button>
              </div>
            </Popup>
          </Marker>
        ))}

        {route.length > 1 && (
          <Polyline 
            positions={route} 
            color="#3b82f6" 
            weight={4} 
            opacity={0.8} 
            dashArray="10, 10"
            className="animate-pulse"
          />
        )}
      </MapContainer>

      {/* Floating Panel for Route Info */}
      {selectedTruck && route.length > 1 && (
        <Card className="absolute bottom-6 left-6 w-80 z-[1000] bg-black/80 backdrop-blur-md border-blue-500/30">
          <div className="p-4">
            <h3 className="font-bold text-white mb-1">Active Route: {selectedTruck.name}</h3>
            <p className="text-sm text-white/60 mb-4">Optimized path for {route.length - 1} critical bins</p>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-white/60">Est. Distance</span>
                <span className="text-white font-medium">12.4 km</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-white/60">Est. Time</span>
                <span className="text-white font-medium">45 mins</span>
              </div>
            </div>
            <Button 
              variant="outline" 
              size="sm" 
              className="w-full mt-4"
              onClick={() => {
                setSelectedTruck(null);
                setRoute([]);
              }}
            >
              Clear Route
            </Button>
          </div>
        </Card>
      )}
    </div>
  );
}
