import React, { useState } from 'react';
import { Camera, Mic, MapPin, AlertTriangle, Droplets, Navigation } from 'lucide-react';
import TopBar from '../components/ui/TopBar';
import Button from '../components/ui/Button';
import { useAppContext } from '../context/AppContext';

const ReportHazard: React.FC = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [hazardType, setHazardType] = useState<'pothole' | 'flood' | ''>('');
  const [description, setDescription] = useState('');
  const { addSafetyPoints } = useAppContext();
  
  // Mock location data
  const location = 'Makola Market, Accra';
  
  const startRecording = () => {
    setIsRecording(true);
    
    // Simulate recording timer
    const interval = setInterval(() => {
      setRecordingTime(prev => {
        if (prev >= 15) {
          clearInterval(interval);
          setIsRecording(false);
          return 15;
        }
        return prev + 1;
      });
    }, 1000);
  };
  
  const submitReport = () => {
    // In a real app, we would submit the hazard report
    addSafetyPoints(10);
    
    // Reset form
    setHazardType('');
    setDescription('');
    setRecordingTime(0);
    
    // Show success message
    alert('Hazard reported successfully! You earned 10 Safety Points.');
  };

  return (
    <div className="pb-16">
      <TopBar title="Report Hazard" />
      
      <div className="p-4">
        <div className="bg-white rounded-lg shadow-lg p-4 mb-4">
          <div className="flex items-center space-x-2 mb-4">
            <MapPin className="h-5 w-5 text-red-600" />
            <div>
              <span className="block text-sm text-gray-500">Current Location</span>
              <strong>{location}</strong>
            </div>
          </div>
          
          <div className="relative h-48 bg-gray-100 rounded-lg mb-4 overflow-hidden">
            {isRecording ? (
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-black bg-opacity-80">
                <div className="h-16 w-16 rounded-full border-4 border-red-600 flex items-center justify-center mb-2">
                  <div className="h-12 w-12 bg-red-600 rounded-full animate-pulse"></div>
                </div>
                <p className="text-white font-medium">{recordingTime}/15s</p>
              </div>
            ) : (
              <div className="absolute inset-0 flex items-center justify-center">
                {recordingTime > 0 ? (
                  <div className="text-center">
                    <div className="bg-gray-300 h-36 w-36 rounded-lg mx-auto mb-2 flex items-center justify-center">
                      <Camera className="h-12 w-12 text-gray-500" />
                    </div>
                    <span className="text-sm text-gray-500">Preview</span>
                  </div>
                ) : (
                  <div className="text-center">
                    <Camera className="h-12 w-12 text-gray-400 mx-auto mb-2" />
                    <span className="text-sm text-gray-500">Record a hazard video</span>
                  </div>
                )}
              </div>
            )}
          </div>
          
          <div className="flex justify-center space-x-4 mb-6">
            <button 
              className={`h-16 w-16 rounded-full ${isRecording ? 'bg-red-600' : 'bg-gray-200'} flex items-center justify-center`}
              onTouchStart={startRecording}
              onMouseDown={startRecording}
              onTouchEnd={() => setIsRecording(false)}
              onMouseUp={() => setIsRecording(false)}
            >
              <Camera className={`h-6 w-6 ${isRecording ? 'text-white' : 'text-gray-600'}`} />
            </button>
            
            <button className="h-16 w-16 rounded-full bg-gray-200 flex items-center justify-center">
              <Mic className="h-6 w-6 text-gray-600" />
            </button>
          </div>
          
          <p className="text-center text-sm text-gray-600 mb-6">
            Hold to record a 15s video of the hazard
          </p>
          
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Hazard Type
            </label>
            <div className="flex space-x-3">
              <button 
                className={`flex-1 py-2 px-3 rounded-lg border ${hazardType === 'pothole' ? 'bg-orange-50 border-orange-200' : 'border-gray-200'} flex items-center justify-center`}
                onClick={() => setHazardType('pothole')}
              >
                <AlertTriangle className={`h-5 w-5 mr-2 ${hazardType === 'pothole' ? 'text-orange-500' : 'text-gray-400'}`} />
                <span className={hazardType === 'pothole' ? 'text-orange-700' : 'text-gray-600'}>Pothole</span>
              </button>
              
              <button 
                className={`flex-1 py-2 px-3 rounded-lg border ${hazardType === 'flood' ? 'bg-blue-50 border-blue-200' : 'border-gray-200'} flex items-center justify-center`}
                onClick={() => setHazardType('flood')}
              >
                <Droplets className={`h-5 w-5 mr-2 ${hazardType === 'flood' ? 'text-blue-500' : 'text-gray-400'}`} />
                <span className={hazardType === 'flood' ? 'text-blue-700' : 'text-gray-600'}>Flooding</span>
              </button>
            </div>
          </div>
          
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Description
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe the hazard (optional)"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 h-20 focus:outline-none focus:ring-2 focus:ring-green-500"
            ></textarea>
          </div>
          
          <Button 
            variant="primary" 
            fullWidth
            onClick={submitReport}
            disabled={!hazardType || recordingTime === 0}
          >
            Submit Report
          </Button>
          
          <div className="mt-3 text-center">
            <span className="text-sm text-gray-600">Earn 10 Safety Points for reporting!</span>
          </div>
        </div>
        
        <div className="bg-yellow-50 rounded-lg p-4 border border-yellow-200">
          <h3 className="font-medium text-yellow-800 mb-2">GOIL Reward</h3>
          <p className="text-sm text-yellow-700 mb-3">Share your report with friends and earn GOIL fuel vouchers!</p>
          <Button 
            variant="outline" 
            fullWidth
            leftIcon={<Navigation className="h-4 w-4" />}
          >
            Share & Earn
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ReportHazard;