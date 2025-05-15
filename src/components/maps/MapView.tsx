import React, { useState } from 'react';
import { Map, Navigation, AlertTriangle, Droplets } from 'lucide-react';
import Button from '../ui/Button';
import { useNavigate } from 'react-router-dom';

interface MapViewProps {
  fullscreen?: boolean;
}

const MapView: React.FC<MapViewProps> = ({ fullscreen = false }) => {
  const navigate = useNavigate();
  const [mapLoaded, setMapLoaded] = useState(true);

  // Mock hazard markers data
  const hazards = [
    { id: 1, type: 'pothole', lat: 5.6037, lng: -0.1870, severity: 'high' },
    { id: 2, type: 'flood', lat: 5.6500, lng: -0.1966, severity: 'medium' },
    { id: 3, type: 'pothole', lat: 5.6300, lng: -0.1700, severity: 'low' },
  ];

  const handleDownloadMap = () => {
    navigate('/offline-maps');
  };

  return (
    <div className={`relative ${fullscreen ? 'h-full' : 'h-64'} w-full bg-gray-200 overflow-hidden rounded-lg`}>
      {/* Map placeholder */}
      <div className="absolute inset-0 bg-[#e8eaed]">
        <div className="h-full w-full flex items-center justify-center">
          {!mapLoaded ? (
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-600"></div>
          ) : (
            <img 
              src="https://images.pexels.com/photos/2706750/pexels-photo-2706750.jpeg" 
              alt="Ghana Map"
              className="object-cover w-full h-full opacity-70"
            />
          )}
        </div>
      </div>

      {/* Hazard markers */}
      {mapLoaded && hazards.map(hazard => (
        <div 
          key={hazard.id} 
          className="absolute transform -translate-x-1/2 -translate-y-1/2"
          style={{ 
            top: `${30 + Math.random() * 40}%`, 
            left: `${30 + Math.random() * 40}%` 
          }}
        >
          <div className={`
            p-1 rounded-full 
            ${hazard.type === 'pothole' ? 'bg-orange-500' : 'bg-blue-500'} 
            ${hazard.severity === 'high' ? 'animate-pulse' : ''}
          `}>
            {hazard.type === 'pothole' ? (
              <AlertTriangle className="h-5 w-5 text-white" />
            ) : (
              <Droplets className="h-5 w-5 text-white" />
            )}
          </div>
        </div>
      ))}

      {/* Map Controls */}
      <div className="absolute top-4 left-4 right-4">
        <div className="bg-white rounded-full shadow-lg p-2 flex items-center">
          <Map className="h-5 w-5 text-gray-500 ml-2" />
          <input 
            type="text" 
            placeholder="Search route (e.g., Accra → Kumasi)"
            className="flex-1 bg-transparent border-none outline-none px-4 py-1 text-sm"
          />
          <Button variant="primary" size="sm" className="ml-2">
            <Navigation className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Download button */}
      <div className="absolute bottom-4 right-4">
        <Button
          variant="secondary"
          leftIcon={<Map className="h-4 w-4" />}
          onClick={handleDownloadMap}
        >
          Download Offline
        </Button>
      </div>

      {/* Region label */}
      <div className="absolute bottom-4 left-4 bg-black bg-opacity-70 px-3 py-1 rounded-lg">
        <span className="text-white text-sm font-medium">Accra Region</span>
      </div>
    </div>
  );
};

export default MapView;