import React from 'react';
import TopBar from '../components/ui/TopBar';
import MapView from '../components/maps/MapView';
import { AlertTriangle, Droplets, Navigation, MapPin } from 'lucide-react';

const MapsTab: React.FC = () => {
  // Mock hazards data
  const recentHazards = [
    { id: 1, type: 'pothole', location: 'Spintex Road', time: '25 mins ago' },
    { id: 2, type: 'flood', location: 'Kaneshie Market', time: '1 hour ago' },
    { id: 3, type: 'pothole', location: 'East Legon', time: '3 hours ago' }
  ];

  return (
    <div className="pb-16 min-h-screen">
      <TopBar title="Maps" />
      
      <div className="p-4">
        <MapView fullscreen={false} />
        
        <div className="mt-6">
          <h2 className="text-lg font-semibold mb-4">Recently Reported Hazards</h2>
          
          <div className="space-y-3">
            {recentHazards.map(hazard => (
              <div key={hazard.id} className="bg-white rounded-lg shadow p-4 flex items-center">
                <div className={`p-2 rounded-full mr-3 ${hazard.type === 'pothole' ? 'bg-orange-100' : 'bg-blue-100'}`}>
                  {hazard.type === 'pothole' ? (
                    <AlertTriangle className="h-5 w-5 text-orange-500" />
                  ) : (
                    <Droplets className="h-5 w-5 text-blue-500" />
                  )}
                </div>
                
                <div className="flex-1">
                  <h3 className="font-medium">{hazard.type === 'pothole' ? 'Pothole' : 'Flooding'}</h3>
                  <div className="flex items-center text-gray-500 text-sm">
                    <MapPin className="h-3 w-3 mr-1" />
                    <span>{hazard.location}</span>
                  </div>
                </div>
                
                <div className="text-right">
                  <span className="text-xs text-gray-500">{hazard.time}</span>
                  <button className="block mt-1 text-green-600 text-sm font-medium">
                    Navigate
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="mt-6 bg-white rounded-lg shadow-lg p-4">
          <h2 className="text-lg font-semibold mb-2">Driving Stats</h2>
          
          <div className="grid grid-cols-2 gap-4 mt-4">
            <div className="bg-gray-50 p-3 rounded-lg">
              <p className="text-sm text-gray-500">Total Distance</p>
              <p className="text-xl font-bold">247 km</p>
            </div>
            
            <div className="bg-gray-50 p-3 rounded-lg">
              <p className="text-sm text-gray-500">Hazards Avoided</p>
              <p className="text-xl font-bold">17</p>
            </div>
            
            <div className="bg-gray-50 p-3 rounded-lg">
              <p className="text-sm text-gray-500">Safety Score</p>
              <p className="text-xl font-bold text-green-600">92/100</p>
            </div>
            
            <div className="bg-gray-50 p-3 rounded-lg">
              <p className="text-sm text-gray-500">Reports Made</p>
              <p className="text-xl font-bold">5</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MapsTab;