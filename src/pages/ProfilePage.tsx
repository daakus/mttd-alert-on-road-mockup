import React from 'react';
import { User, Award, Gift, Settings, ChevronRight, Shield, Activity, Star } from 'lucide-react';
import TopBar from '../components/ui/TopBar';
import Button from '../components/ui/Button';
import { useAppContext } from '../context/AppContext';

const ProfilePage: React.FC = () => {
  const { safetyPoints, language, setLanguage, dataMode, setDataMode } = useAppContext();
  
  // Mock user data
  const userData = {
    name: 'Kwame Ansah',
    username: '@RoadHeroGH',
    level: 3,
    safetyPoints,
    hazardsReported: 12,
    lives: 5,
    videos: [
      { id: 1, thumbnail: 'https://images.pexels.com/photos/1770754/pexels-photo-1770754.jpeg', views: '1.2K' },
      { id: 2, thumbnail: 'https://images.pexels.com/photos/2365572/pexels-photo-2365572.jpeg', views: '845' },
      { id: 3, thumbnail: 'https://images.pexels.com/photos/3052361/pexels-photo-3052361.jpeg', views: '2.5K' },
      { id: 4, thumbnail: 'https://images.pexels.com/photos/1563356/pexels-photo-1563356.jpeg', views: '678' },
    ],
    rewards: [
      { id: 1, name: '100MB MTN data', points: 100, icon: 'data' },
      { id: 2, name: '₵2 GOIL discount', points: 150, icon: 'fuel' },
      { id: 3, name: 'Free Car Wash', points: 200, icon: 'car' },
    ]
  };
  
  // Progress calculation (level 5 unlocks ad-free maps)
  const maxPoints = 200;
  const progress = Math.min((userData.safetyPoints / maxPoints) * 100, 100);
  const pointsToNextLevel = Math.max(0, maxPoints - userData.safetyPoints);

  return (
    <div className="pb-16">
      <TopBar title="Profile" showLocation={false} />
      
      <div className="p-4">
        {/* User Header */}
        <div className="flex items-center mb-6">
          <div className="h-20 w-20 rounded-full bg-gray-200 flex items-center justify-center relative">
            <User className="h-8 w-8 text-gray-500" />
            <div className="absolute -bottom-1 -right-1 bg-green-600 text-white text-xs font-bold rounded-full h-6 w-6 flex items-center justify-center border-2 border-white">
              {userData.level}
            </div>
          </div>
          
          <div className="ml-4 flex-1">
            <h2 className="text-xl font-bold">{userData.name}</h2>
            <p className="text-gray-600">{userData.username}</p>
            <div className="flex items-center mt-1">
              <Award className="h-4 w-4 text-yellow-500 mr-1" />
              <span className="text-sm text-gray-700">Road Hero Level {userData.level}</span>
            </div>
          </div>
          
          <Button variant="outline" size="sm">
            Edit
          </Button>
        </div>
        
        {/* Progress Bar */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center">
              <Shield className="h-5 w-5 text-green-600 mr-2" />
              <span className="font-medium">Safety Points: {userData.safetyPoints}</span>
            </div>
            <span className="text-sm text-gray-600">{pointsToNextLevel} to Level {userData.level + 1}</span>
          </div>
          
          <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-green-500 to-green-600" 
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          
          <p className="text-sm text-gray-600 mt-2">
            <Star className="h-4 w-4 text-yellow-500 inline mr-1" />
            Unlock ad-free maps at Level 5!
          </p>
        </div>
        
        {/* Stats Cards */}
        <div className="grid grid-cols-3 gap-3 mb-6">
          <div className="bg-white rounded-lg shadow p-3 text-center">
            <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-2">
              <Activity className="h-5 w-5 text-red-600" />
            </div>
            <span className="block text-2xl font-bold">{userData.hazardsReported}</span>
            <span className="text-xs text-gray-600">Reports</span>
          </div>
          
          <div className="bg-white rounded-lg shadow p-3 text-center">
            <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-2">
              <Shield className="h-5 w-5 text-green-600" />
            </div>
            <span className="block text-2xl font-bold">{userData.safetyPoints}</span>
            <span className="text-xs text-gray-600">Points</span>
          </div>
          
          <div className="bg-white rounded-lg shadow p-3 text-center">
            <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-2">
              <Award className="h-5 w-5 text-blue-600" />
            </div>
            <span className="block text-2xl font-bold">{userData.level}</span>
            <span className="text-xs text-gray-600">Level</span>
          </div>
        </div>
        
        {/* My Videos */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-semibold">My Videos</h3>
            <button className="text-sm text-green-600">See All</button>
          </div>
          
          <div className="grid grid-cols-2 gap-3">
            {userData.videos.map(video => (
              <div key={video.id} className="relative rounded-lg overflow-hidden aspect-video bg-gray-200">
                <img 
                  src={video.thumbnail} 
                  alt="Video thumbnail"
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-2 right-2 bg-black bg-opacity-70 text-white text-xs px-2 py-1 rounded-md">
                  {video.views} views
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Rewards */}
        <div className="mb-6">
          <div className="flex items-center mb-3">
            <Gift className="h-5 w-5 text-green-600 mr-2" />
            <h3 className="font-semibold">Rewards</h3>
          </div>
          
          <div className="bg-white rounded-lg shadow overflow-hidden">
            {userData.rewards.map((reward, index) => (
              <div key={reward.id} className={`p-4 flex items-center justify-between ${index !== userData.rewards.length - 1 && 'border-b border-gray-100'}`}>
                <div className="flex items-center">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center mr-3 ${
                    reward.icon === 'data' ? 'bg-blue-100' :
                    reward.icon === 'fuel' ? 'bg-yellow-100' : 'bg-green-100'
                  }`}>
                    <span className="text-lg">
                      {reward.icon === 'data' ? '📱' : 
                      reward.icon === 'fuel' ? '⛽' : '🚗'}
                    </span>
                  </div>
                  <div>
                    <p className="font-medium">{reward.name}</p>
                    <p className="text-sm text-gray-600">{reward.points} points</p>
                  </div>
                </div>
                <Button 
                  variant={userData.safetyPoints >= reward.points ? 'primary' : 'outline'} 
                  size="sm"
                  disabled={userData.safetyPoints < reward.points}
                >
                  {userData.safetyPoints >= reward.points ? 'Redeem' : 'Locked'}
                </Button>
              </div>
            ))}
          </div>
        </div>
        
        {/* Settings */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="p-4 border-b border-gray-100">
            <div className="flex items-center mb-3">
              <Settings className="h-5 w-5 text-gray-600 mr-2" />
              <h3 className="font-semibold">Settings</h3>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span>Language</span>
                <button 
                  className="flex items-center text-green-600"
                  onClick={() => setLanguage(language === 'en' ? 'twi' : 'en')}
                >
                  {language === 'en' ? 'English' : 'Twi'}
                  <ChevronRight className="h-4 w-4 ml-1" />
                </button>
              </div>
              
              <div className="flex items-center justify-between">
                <span>Data Usage</span>
                <button 
                  className="flex items-center text-green-600"
                  onClick={() => setDataMode(dataMode === 'normal' ? 'low' : 'normal')}
                >
                  {dataMode === 'normal' ? 'Normal' : 'Low Data Mode'}
                  <ChevronRight className="h-4 w-4 ml-1" />
                </button>
              </div>
              
              <div className="flex items-center justify-between">
                <span>Payment Methods</span>
                <button className="flex items-center text-green-600">
                  MTN MoMo
                  <ChevronRight className="h-4 w-4 ml-1" />
                </button>
              </div>
              
              <div className="flex items-center justify-between">
                <span>Notifications</span>
                <button className="flex items-center text-green-600">
                  Manage
                  <ChevronRight className="h-4 w-4 ml-1" />
                </button>
              </div>
            </div>
          </div>
          
          <div className="p-4">
            <Button variant="outline" fullWidth>Log Out</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;