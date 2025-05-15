import React, { useState } from 'react';
import { MessageCircle, Gift, Heart, Award, DollarSign, Users } from 'lucide-react';
import TopBar from '../components/ui/TopBar';
import Button from '../components/ui/Button';

const LiveStreamScreen: React.FC = () => {
  const [message, setMessage] = useState('');
  const [showGiftPanel, setShowGiftPanel] = useState(false);
  
  // Mock chat messages
  const chatMessages = [
    { id: 1, user: 'AdwoaTraffic', message: 'Avoid Circle Interchange today!', time: '2m ago' },
    { id: 2, user: 'KofiSafe', message: 'Ei, the road at Kasoa is terrible!', time: '1m ago' },
    { id: 3, user: 'AccraDriver', message: 'Thanks for the update!', time: '1m ago' },
    { id: 4, user: 'AmaOkada', message: 'Is Spintex Road clear now?', time: '30s ago' }
  ];
  
  // Mock gifts
  const gifts = [
    { id: 1, icon: '🛑', name: 'Stop Sign', cost: 1 },
    { id: 2, icon: '🚨', name: 'Alert', cost: 5 },
    { id: 3, icon: '🚗', name: 'Car', cost: 10 },
    { id: 4, icon: '🚀', name: 'Rocket', cost: 50 }
  ];

  const sendMessage = () => {
    if (message.trim()) {
      // In a real app, send message logic would go here
      setMessage('');
    }
  };

  return (
    <div className="h-screen flex flex-col">
      <TopBar title="Live" />
      
      {/* Live Stream Video */}
      <div className="relative flex-1 bg-black">
        <div className="absolute inset-0">
          <img 
            src="https://images.pexels.com/photos/8145335/pexels-photo-8145335.jpeg" 
            alt="Live stream"
            className="h-full w-full object-cover opacity-90"
          />
        </div>
        
        {/* Overlay Elements */}
        <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
          <div className="flex items-center bg-black bg-opacity-50 rounded-full px-3 py-1.5">
            <div className="h-6 w-6 bg-red-600 rounded-full flex items-center justify-center mr-2">
              <span className="text-white text-xs font-bold">LIVE</span>
            </div>
            <span className="text-white font-medium">Kwame in Kumasi</span>
          </div>
          
          <div className="bg-black bg-opacity-50 rounded-full px-3 py-1.5 flex items-center">
            <Users className="h-4 w-4 text-white mr-1" />
            <span className="text-white">1.2K</span>
          </div>
        </div>
        
        {/* Poll */}
        <div className="absolute bottom-24 left-4 right-4 bg-black bg-opacity-70 rounded-lg p-3">
          <p className="text-white text-sm mb-2">Poll: Should Okada riders wear helmets?</p>
          <div className="flex space-x-3">
            <button className="flex-1 bg-green-600 py-2 rounded-lg text-white text-sm font-medium">
              Yes ✅ (78%)
            </button>
            <button className="flex-1 bg-gray-700 py-2 rounded-lg text-white text-sm font-medium">
              No ❌ (22%)
            </button>
          </div>
          <p className="text-xs text-white text-opacity-70 mt-2">Sponsored by SIC Insurance</p>
        </div>
      </div>
      
      {/* Chat Panel */}
      <div className="h-1/3 bg-white border-t border-gray-200">
        <div className="flex items-center justify-between border-b border-gray-200 px-4 py-2">
          <h3 className="font-semibold">Live Chat</h3>
          <div className="flex">
            <button 
              className="p-2 text-gray-500"
              onClick={() => setShowGiftPanel(!showGiftPanel)}
            >
              <Gift className="h-5 w-5" />
            </button>
            <button className="p-2 text-gray-500">
              <Heart className="h-5 w-5" />
            </button>
          </div>
        </div>
        
        {showGiftPanel ? (
          <div className="p-3">
            <div className="flex items-center justify-between mb-3">
              <h4 className="font-medium">Send a Gift</h4>
              <div className="flex items-center">
                <DollarSign className="h-4 w-4 text-yellow-500 mr-1" />
                <span className="text-sm font-medium">45 Coins</span>
              </div>
            </div>
            
            <div className="grid grid-cols-4 gap-3">
              {gifts.map(gift => (
                <button key={gift.id} className="flex flex-col items-center p-2 bg-gray-50 rounded-lg">
                  <span className="text-2xl mb-1">{gift.icon}</span>
                  <span className="text-xs">{gift.name}</span>
                  <span className="text-xs font-medium">{gift.cost} coins</span>
                </button>
              ))}
            </div>
            
            <button 
              className="text-sm text-green-600 font-medium mt-3 block mx-auto"
              onClick={() => setShowGiftPanel(false)}
            >
              Close
            </button>
          </div>
        ) : (
          <>
            <div className="p-3 overflow-y-auto h-[calc(100%-96px)]">
              {chatMessages.map(msg => (
                <div key={msg.id} className="mb-3">
                  <div className="flex items-start">
                    <div className="h-6 w-6 rounded-full bg-gray-300 mr-2 flex-shrink-0"></div>
                    <div>
                      <div className="flex items-center">
                        <span className="font-medium text-sm">{msg.user}</span>
                        <span className="text-xs text-gray-500 ml-2">{msg.time}</span>
                      </div>
                      <p className="text-sm">{msg.message}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="flex items-center p-3 border-t border-gray-200">
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Type a message..."
                className="flex-1 border border-gray-300 rounded-full px-4 py-2 text-sm outline-none"
              />
              <Button
                variant="primary"
                size="sm"
                className="ml-2"
                leftIcon={<MessageCircle className="h-4 w-4" />}
                onClick={sendMessage}
              >
                Send
              </Button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default LiveStreamScreen;