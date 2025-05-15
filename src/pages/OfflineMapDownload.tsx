import React, { useState } from 'react';
import { Download, Play, CreditCard, ChevronLeft, Map, CheckCircle, RefreshCw } from 'lucide-react';
import TopBar from '../components/ui/TopBar';
import Button from '../components/ui/Button';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';

const OfflineMapDownload: React.FC = () => {
  const navigate = useNavigate();
  const { setHasDownloadedMap } = useAppContext();
  const [downloadOption, setDownloadOption] = useState<'ad' | 'subscription' | ''>('');
  const [downloadProgress, setDownloadProgress] = useState(0);
  const [showProgress, setShowProgress] = useState(false);
  
  // Mock regions data
  const regions = [
    { id: 1, name: 'Accra Central', size: '50MB', recommended: true },
    { id: 2, name: 'Kumasi', size: '45MB', recommended: false },
    { id: 3, name: 'Takoradi', size: '35MB', recommended: false },
    { id: 4, name: 'Tamale', size: '30MB', recommended: false },
  ];
  
  const [selectedRegion, setSelectedRegion] = useState(regions[0]);
  
  const startDownload = () => {
    setShowProgress(true);
    
    // Simulate download progress
    let progress = 0;
    const interval = setInterval(() => {
      progress += 5;
      setDownloadProgress(progress);
      
      if (progress >= 100) {
        clearInterval(interval);
        setHasDownloadedMap(true);
        setTimeout(() => {
          navigate('/maps');
        }, 1000);
      }
    }, 200);
  };
  
  const handleBack = () => {
    navigate(-1);
  };

  return (
    <div className="pb-16 min-h-screen bg-white">
      <div className="px-4 py-3 flex items-center">
        <button onClick={handleBack} className="mr-2">
          <ChevronLeft className="h-6 w-6" />
        </button>
        <h1 className="text-xl font-semibold">Offline Maps</h1>
      </div>
      
      <div className="p-4">
        {showProgress ? (
          <div className="text-center p-6">
            <div className="mb-4">
              <Map className="h-16 w-16 text-green-600 mx-auto" />
            </div>
            <h2 className="text-xl font-bold mb-2">Downloading {selectedRegion.name}</h2>
            <p className="text-gray-600 mb-6">Please stay on this screen. Download using Wi-Fi recommended.</p>
            
            <div className="h-3 bg-gray-200 rounded-full overflow-hidden mb-2">
              <div 
                className="h-full bg-green-600 transition-all duration-300" 
                style={{ width: `${downloadProgress}%` }}
              ></div>
            </div>
            <p className="text-sm text-gray-600 mb-8">{downloadProgress}% Complete</p>
            
            {downloadProgress === 100 ? (
              <div className="flex items-center justify-center text-green-600">
                <CheckCircle className="h-6 w-6 mr-2" />
                <span className="font-medium">Download Complete!</span>
              </div>
            ) : (
              <Button 
                variant="outline" 
                leftIcon={<RefreshCw className="h-4 w-4" />}
              >
                Pause Download
              </Button>
            )}
          </div>
        ) : (
          <>
            <div className="mb-6">
              <h2 className="text-lg font-semibold mb-3">Select Region</h2>
              
              <div className="space-y-3">
                {regions.map(region => (
                  <div
                    key={region.id}
                    className={`border rounded-lg p-3 flex items-center ${selectedRegion.id === region.id ? 'border-green-500 bg-green-50' : 'border-gray-200'}`}
                    onClick={() => setSelectedRegion(region)}
                  >
                    <div className={`w-5 h-5 rounded-full border-2 mr-3 flex items-center justify-center ${selectedRegion.id === region.id ? 'border-green-500' : 'border-gray-300'}`}>
                      {selectedRegion.id === region.id && (
                        <div className="w-3 h-3 rounded-full bg-green-500"></div>
                      )}
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex items-center">
                        <h3 className="font-medium">{region.name}</h3>
                        {region.recommended && (
                          <span className="ml-2 text-xs bg-green-100 text-green-800 px-2 py-0.5 rounded-full">
                            Recommended
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-gray-600">{region.size}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="mb-6">
              <h2 className="text-lg font-semibold mb-3">Choose Option</h2>
              
              <div className="space-y-3">
                <div
                  className={`border rounded-lg p-4 ${downloadOption === 'ad' ? 'border-green-500 bg-green-50' : 'border-gray-200'}`}
                  onClick={() => setDownloadOption('ad')}
                >
                  <div className="flex items-start">
                    <div className="mr-3">
                      <Play className="h-6 w-6 text-red-600" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-medium">Watch a 15s Melcom ad</h3>
                      <p className="text-sm text-gray-600">Unlock offline maps for 24 hours</p>
                    </div>
                    <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${downloadOption === 'ad' ? 'border-green-500' : 'border-gray-300'}`}>
                      {downloadOption === 'ad' && (
                        <div className="w-3 h-3 rounded-full bg-green-500"></div>
                      )}
                    </div>
                  </div>
                </div>
                
                <div
                  className={`border rounded-lg p-4 ${downloadOption === 'subscription' ? 'border-green-500 bg-green-50' : 'border-gray-200'}`}
                  onClick={() => setDownloadOption('subscription')}
                >
                  <div className="flex items-start">
                    <div className="mr-3">
                      <CreditCard className="h-6 w-6 text-blue-600" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-medium">Subscribe for ₵5/month</h3>
                      <p className="text-sm text-gray-600">Unlimited access with MoMo payment</p>
                    </div>
                    <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${downloadOption === 'subscription' ? 'border-green-500' : 'border-gray-300'}`}>
                      {downloadOption === 'subscription' && (
                        <div className="w-3 h-3 rounded-full bg-green-500"></div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mb-4">
              <Button
                variant="primary"
                size="lg"
                fullWidth
                leftIcon={<Download className="h-5 w-5" />}
                disabled={!downloadOption}
                onClick={startDownload}
              >
                Download {selectedRegion.name} ({selectedRegion.size})
              </Button>
            </div>
            
            <div className="bg-blue-50 rounded-lg p-3 border border-blue-200">
              <div className="flex items-start">
                <Map className="h-5 w-5 text-blue-600 mr-2 mt-0.5" />
                <p className="text-sm text-blue-700">
                  Tip: Connect to Wi-Fi for faster download. Maps work completely offline after download.
                </p>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default OfflineMapDownload;