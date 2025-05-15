import React, { useState } from 'react';
import { Video, Music, Lock, ChevronDown, ChevronUp, ThumbsUp, Heart, Smile } from 'lucide-react';

interface MediaItem {
  id: number;
  type: 'video' | 'audio';
  title: string;
  description: string;
  url: string;
  likes: number;
  comments: number;
  shares: number;
  isPremium: boolean;
}

const MediaPage: React.FC = () => {
  const [mediaTab, setMediaTab] = useState<'videos' | 'audio' | 'documents'>('videos');
  const [showAd, setShowAd] = useState(false);
  const [selectedItem, setSelectedItem] = useState<MediaItem | null>(null);
  const [expandedQuestion, setExpandedQuestion] = useState<number | null>(null); // State for expanded question
  const isPremiumUser = false;
  const [reactions, setReactions] = useState<{ [key: number]: { like: number; love: number; laugh: number } }>({});

  const mediaItems: MediaItem[] = [
    // Videos
    {
      id: 1,
      type: 'video',
      title: 'How to Fix a Flat Tire',
      description: 'Learn how to fix a flat tire in just 5 minutes! 🚗',
      url: 'https://example.com/video1',
      likes: 1243,
      comments: 89,
      shares: 56,
      isPremium: false,
    },
    {
      id: 2,
      type: 'video',
      title: 'New Seat Belt Laws',
      description: 'Everything you need to know about the new seat belt laws. 👮‍♂️',
      url: 'https://example.com/video2',
      likes: 2105,
      comments: 312,
      shares: 189,
      isPremium: true,
    },
    {
      id: 3,
      type: 'video',
      title: 'Flooding on Ring Road Central',
      description: 'Avoid Ring Road Central due to heavy flooding. ⚠️',
      url: 'https://example.com/video3',
      likes: 856,
      comments: 124,
      shares: 231,
      isPremium: false,
    },
    {
      id: 4,
      type: 'video',
      title: 'Road Safety Tips',
      description: 'Essential road safety tips for all drivers. 🛣️',
      url: 'https://example.com/video4',
      likes: 543,
      comments: 67,
      shares: 34,
      isPremium: false,
    },
    {
      id: 5,
      type: 'video',
      title: 'Live Traffic Update: Tema Motorway',
      description: 'Stay updated on traffic conditions on Tema Motorway. 🚧',
      url: 'https://example.com/video5',
      likes: 432,
      comments: 54,
      shares: 21,
      isPremium: true,
    },
    {
      id: 6,
      type: 'video',
      title: 'Car Maintenance Tips',
      description: 'Simple tips to keep your car in top condition. 🚙',
      url: 'https://example.com/video6',
      likes: 1234,
      comments: 98,
      shares: 45,
      isPremium: false,
    },
    {
      id: 7,
      type: 'video',
      title: 'Emergency Braking Techniques',
      description: 'Learn how to brake safely in emergencies. 🚦',
      url: 'https://example.com/video7',
      likes: 876,
      comments: 65,
      shares: 32,
      isPremium: true,
    },
    {
      id: 8,
      type: 'video',
      title: 'Fuel Efficiency Tips',
      description: 'Save money on fuel with these tips. ⛽',
      url: 'https://example.com/video8',
      likes: 654,
      comments: 43,
      shares: 21,
      isPremium: false,
    },
    {
      id: 9,
      type: 'video',
      title: 'Accident Prevention Strategies',
      description: 'How to avoid accidents on the road. 🚑',
      url: 'https://example.com/video9',
      likes: 987,
      comments: 76,
      shares: 54,
      isPremium: true,
    },
    {
      id: 10,
      type: 'video',
      title: 'Driving in Bad Weather',
      description: 'Tips for driving safely in rain and fog. 🌧️',
      url: 'https://example.com/video10',
      likes: 432,
      comments: 32,
      shares: 12,
      isPremium: false,
    },

    // Audios
    {
      id: 11,
      type: 'audio',
      title: 'Traffic Update: Accra',
      description: 'Live traffic updates for Accra. Avoid delays! 🚦',
      url: 'https://example.com/audio1',
      likes: 856,
      comments: 124,
      shares: 231,
      isPremium: true,
    },
    {
      id: 12,
      type: 'audio',
      title: 'Road Safety Tips',
      description: 'Essential road safety tips for all drivers. 🛣️',
      url: 'https://example.com/audio2',
      likes: 543,
      comments: 67,
      shares: 34,
      isPremium: false,
    },
    {
      id: 13,
      type: 'audio',
      title: 'Live Traffic Update: Tema Motorway',
      description: 'Stay updated on traffic conditions on Tema Motorway. 🚧',
      url: 'https://example.com/audio3',
      likes: 432,
      comments: 54,
      shares: 21,
      isPremium: true,
    },
    {
      id: 14,
      type: 'audio',
      title: 'Accident Prevention Strategies',
      description: 'How to avoid accidents on the road. 🚑',
      url: 'https://example.com/audio4',
      likes: 987,
      comments: 76,
      shares: 54,
      isPremium: true,
    },
    {
      id: 15,
      type: 'audio',
      title: 'Driving in Bad Weather',
      description: 'Tips for driving safely in rain and fog. 🌧️',
      url: 'https://example.com/audio5',
      likes: 432,
      comments: 32,
      shares: 12,
      isPremium: false,
    },
    {
      id: 16,
      type: 'audio',
      title: 'Fuel Efficiency Tips',
      description: 'Save money on fuel with these tips. ⛽',
      url: 'https://example.com/audio6',
      likes: 654,
      comments: 43,
      shares: 21,
      isPremium: false,
    },
    {
      id: 17,
      type: 'audio',
      title: 'Emergency Braking Techniques',
      description: 'Learn how to brake safely in emergencies. 🚦',
      url: 'https://example.com/audio7',
      likes: 876,
      comments: 65,
      shares: 32,
      isPremium: true,
    },
    {
      id: 18,
      type: 'audio',
      title: 'Car Maintenance Tips',
      description: 'Simple tips to keep your car in top condition. 🚙',
      url: 'https://example.com/audio8',
      likes: 1234,
      comments: 98,
      shares: 45,
      isPremium: false,
    },
    {
      id: 19,
      type: 'audio',
      title: 'New Seat Belt Laws',
      description: 'Everything you need to know about the new seat belt laws. 👮‍♂️',
      url: 'https://example.com/audio9',
      likes: 2105,
      comments: 312,
      shares: 189,
      isPremium: true,
    },
    {
      id: 20,
      type: 'audio',
      title: 'How to Fix a Flat Tire',
      description: 'Learn how to fix a flat tire in just 5 minutes! 🚗',
      url: 'https://example.com/audio10',
      likes: 1243,
      comments: 89,
      shares: 56,
      isPremium: false,
    },
  ];

  const roadSafetyQuestions = [
    { id: 1, question: 'What is the speed limit in urban areas?', answer: 'The speed limit is typically 50 km/h unless otherwise posted.' },
    { id: 2, question: 'When should you use your hazard lights?', answer: 'Use hazard lights when your vehicle is stationary and causing an obstruction.' },
    { id: 3, question: 'What is the safe following distance?', answer: 'Maintain a 2-second gap between your vehicle and the one in front.' },
    { id: 4, question: 'What should you do at a yellow traffic light?', answer: 'Prepare to stop unless it is unsafe to do so.' },
    { id: 5, question: 'How often should you check your tire pressure?', answer: 'Check your tire pressure at least once a month.' },
    { id: 6, question: 'What is the purpose of seat belts?', answer: 'Seat belts reduce the risk of injury in a collision.' },
    { id: 7, question: 'What should you do if your brakes fail?', answer: 'Shift to a lower gear and use the handbrake to slow down.' },
    { id: 8, question: 'When is it safe to overtake another vehicle?', answer: 'Only overtake when the road ahead is clear and it is safe to do so.' },
    { id: 9, question: 'What should you do in foggy conditions?', answer: 'Use low-beam headlights and reduce your speed.' },
    { id: 10, question: 'What is defensive driving?', answer: 'Defensive driving involves anticipating potential hazards and driving safely to avoid them.' },
  ];
  const handleReaction = (id: number, type: 'like' | 'love' | 'laugh') => {
    setReactions((prevReactions) => ({
      ...prevReactions,
      [id]: {
        like: prevReactions[id]?.like || 0,
        love: prevReactions[id]?.love || 0,
        laugh: prevReactions[id]?.laugh || 0,
        [type]: (prevReactions[id]?.[type] || 0) + 1,
      },
    }));
  };

  let filteredItems = mediaItems.filter(
    (item) => item.type === mediaTab
  );

  console.log('Current Tab:', mediaTab);
  console.log('Filtered Items:', filteredItems);

  if (filteredItems.length === 0) {
    console.warn('No items found for the current tab. Showing all items as fallback.');
    filteredItems = mediaItems; // Fallback to show all items
  }

  const handleWatch = (item: MediaItem) => {
    if (item.isPremium && !isPremiumUser) {
      setSelectedItem(item);
      setShowAd(true); // Show an ad if the user is not premium
    } else {
      window.open(item.url, '_blank'); // Open the video/audio URL
    }
  };

  const handleAdComplete = () => {
    setShowAd(false);
    if (selectedItem) {
      window.open(selectedItem.url, '_blank'); // Open the video/audio URL after the ad
      setSelectedItem(null);
    }
  };

  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Tabs for Videos, Audio, and Documents */}
      <div className="fixed top-0 left-0 right-0 bg-white border-b border-gray-200 z-20">
        <div className="flex justify-around py-2">
          <button
            className={`flex flex-col items-center ${
              mediaTab === 'videos' ? 'text-blue-500 font-bold' : 'text-gray-500'
            }`}
            onClick={() => setMediaTab('videos')}
          >
            <Video className="h-6 w-6" />
            <span className="text-xs">Videos</span>
          </button>
          <button
            className={`flex flex-col items-center ${
              mediaTab === 'audio' ? 'text-blue-500 font-bold' : 'text-gray-500'
            }`}
            onClick={() => setMediaTab('audio')}
          >
            <Music className="h-6 w-6" />
            <span className="text-xs">Audio</span>
          </button>
          <button
            className={`flex flex-col items-center ${
              mediaTab === 'documents' ? 'text-blue-500 font-bold' : 'text-gray-500'
            }`}
            onClick={() => setMediaTab('documents')}
          >
            {mediaTab === 'documents' ? <ChevronUp className="h-6 w-6" /> : <ChevronDown className="h-6 w-6" />}
            <span className="text-xs">Documents</span>
          </button>
        </div>
      </div>

      {/* Media List */}
      <div className="mt-16 p-4">
        {mediaTab === 'videos' &&
          mediaItems
            .filter((item) => item.type === 'video')
            .map((item) => (
              <div
                key={item.id}
                className="p-4 mb-4 bg-white shadow-md rounded-md flex flex-col"
              >
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-semibold">{item.title}</h3>
                  {item.isPremium && !isPremiumUser && (
                    <Lock className="h-6 w-6 text-gray-400" />
                  )}
                </div>
                <p className="text-sm text-gray-600">{item.description}</p>
                <div className="flex justify-between items-center mt-2">
                  <button
                    onClick={() => handleWatch(item)}
                    className="text-blue-500 text-sm"
                  >
                    Watch Video
                  </button>
                  <div className="flex space-x-4 text-gray-500 text-sm">
                    <span>👍 {item.likes}</span>
                    <span>💬 {item.comments}</span>
                    <span>🔄 {item.shares}</span>
                  </div>
                </div>
              </div>
            ))}
        {mediaTab === 'audio' &&
          mediaItems
            .filter((item) => item.type === 'audio')
            .map((item) => (
              <div
                key={item.id}
                className="p-4 mb-4 bg-white shadow-md rounded-md flex flex-col"
              >
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-semibold">{item.title}</h3>
                  {item.isPremium && !isPremiumUser && (
                    <Lock className="h-6 w-6 text-gray-400" />
                  )}
                </div>
                <p className="text-sm text-gray-600">{item.description}</p>
                <div className="flex justify-between items-center mt-2">
                  <button
                    onClick={() => handleWatch(item)}
                    className="text-blue-500 text-sm"
                  >
                    Listen to Audio
                  </button>
                  <div className="flex space-x-4 text-gray-500 text-sm">
                    <span>👍 {item.likes}</span>
                    <span>💬 {item.comments}</span>
                    <span>🔄 {item.shares}</span>
                  </div>
                </div>
              </div>
            ))}
      </div>

      {/* Documents Section */}
      {mediaTab === 'documents' && (
       <div className="p-4 bg-gray-100 rounded-md mt-4">
       <h2 className="text-lg font-semibold mb-2">Road Safety Questions & Answers</h2>
       <ul className="space-y-4">
         {roadSafetyQuestions.map((qa) => (
           <li key={qa.id} className="bg-white p-3 rounded-md shadow">
             <button
               className="text-md font-bold w-full text-left"
               onClick={() =>
                 setExpandedQuestion(expandedQuestion === qa.id ? null : qa.id)
               }
             >
               {qa.question}
             </button>
             {expandedQuestion === qa.id && (
               <div className="mt-2">
                 <p className="text-sm text-gray-600">{qa.answer}</p>
                 <div className="flex space-x-4 mt-2">
                   <button
                     onClick={() => handleReaction(qa.id, 'like')}
                     className="flex items-center space-x-1 text-gray-500"
                   >
                     <ThumbsUp className="h-5 w-5" />
                     <span>{reactions[qa.id]?.like || 0}</span>
                   </button>
                   <button
                     onClick={() => handleReaction(qa.id, 'love')}
                     className="flex items-center space-x-1 text-red-500"
                   >
                     <Heart className="h-5 w-5" />
                     <span>{reactions[qa.id]?.love || 0}</span>
                   </button>
                   <button
                     onClick={() => handleReaction(qa.id, 'laugh')}
                     className="flex items-center space-x-1 text-gray-500"
                   >
                     <Smile className="h-5 w-5" />
                     <span>{reactions[qa.id]?.laugh || 0}</span>
                   </button>
                 </div>
               </div>
             )}
           </li>
         ))}
       </ul>
     </div>
      )}

      {/* Ad Modal */}
      {showAd && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-md shadow-lg text-center">
            <h2 className="text-lg font-bold mb-4">Watch an Ad to Continue</h2>
            <p className="text-sm text-gray-600 mb-4">
              Watch this ad to unlock the premium content.
            </p>
            <button
              onClick={handleAdComplete}
              className="bg-blue-500 text-white px-4 py-2 rounded-md"
            >
              Complete Ad
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MediaPage;