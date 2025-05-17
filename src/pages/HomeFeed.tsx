import React, { useState } from 'react';
import TopBar from '../components/ui/TopBar';
import VideoPlayer from '../components/video/VideoPlayer';
import Onboarding from './Onboarding';
import { Play } from 'lucide-react';

const DailyAudioTips: React.FC = () => {
  const today = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const tip = {
    id: 1,
    title: 'Check Your Tires',
    description: 'Ensure your tires are properly inflated before hitting the road.',
    audioUrl: 'https://example.com/audio-tip1.mp3',
  };

  return (
    <div className="p-4 bg-gray-100 rounded-md mt-4">
      <h2 className="text-lg font-semibold mb-2">Daily Audio Tip for Road Users</h2>
      <p className="text-sm text-gray-500 mb-4">Today is {today}</p>
      <div className="flex items-center justify-between bg-white p-3 rounded-md shadow">
        <div>
          <h3 className="text-md font-medium">{tip.title}</h3>
          <p className="text-sm text-gray-600">{tip.description}</p>
        </div>
        <a
          href={tip.audioUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-500 text-sm"
        >
          <Play className="h-6 w-6 text-blue-500" />
        </a>
      </div>
    </div>
  );
};

const HomeFeed: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'videos' | 'audio'>('videos');

  const [isOnboardingComplete, setIsOnboardingComplete] = useState(false);

  const handleOnboardingComplete = () => {
    setIsOnboardingComplete(true);
  };

  if (!isOnboardingComplete) {
    return <Onboarding onComplete={handleOnboardingComplete} />;
  }

  const videos = [
    {
      id: 1,
      videoUrl: 'https://test-videos.co.uk/vids/bigbuckbunny/mp4/h264/720/Big_Buck_Bunny_720_10s_1MB.mp4',
      username: '@DriveSafeGH',
      description: 'How to fix a flat tire in 5 mins 🚗 #SafeDriving #RoadTips',
      likes: 1243,
      comments: 89,
      shares: 56,
    },
    {
      id: 2,
      videoUrl: 'https://test-videos.co.uk/vids/bigbuckbunny/mp4/h264/720/Big_Buck_Bunny_720_10s_1MB.mp4',
      username: '@AccraTrafficWatch',
      description: 'Flooding on Ring Road Central! Avoid this area ⚠️ #GhTraffic',
      likes: 856,
      comments: 124,
      shares: 231,
    },
    {
      id: 3,
      videoUrl: 'https://test-videos.co.uk/vids/bigbuckbunny/mp4/h264/720/Big_Buck_Bunny_720_10s_1MB.mp4',
      username: '@RoadSafetyCommission',
      description: 'New seat belt laws start next week! Here\'s what you need to know 👮‍♂️',
      likes: 2105,
      comments: 312,
      shares: 189,
    },
  ];

  return (
    <div className="min-h-screen bg-neutral-50">
      {/* TopBar */}
      <div className="absolute top-0 left-0 right-0 z-10">
        <TopBar className="bg-white shadow-md" />
      </div>

      {/* Daily Audio Tips */}
      <div className="mt-16">
        <DailyAudioTips />
      </div>

      {/* Main Content */}
      <div className="mt-4">
        {activeTab === 'videos' && (
          <div className="h-[calc(100vh-8rem)] snap-y snap-mandatory overflow-y-scroll">
            {videos.map((video) => (
              <div key={video.id} className="h-full snap-start">
                <VideoPlayer
                  videoUrl={video.videoUrl}
                  username={video.username}
                  description={video.description}
                  likes={video.likes}
                  comments={video.comments}
                  shares={video.shares}
                />
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-20">
        <div className="flex justify-around py-2">
          <button
            className={`flex flex-col items-center ${
              activeTab === 'videos' ? 'text-blue-500' : 'text-gray-500'
            }`}
            onClick={() => setActiveTab('videos')}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14m-6 0l-4.553 2.276A1 1 0 013 15.382V8.618a1 1 0 011.447-.894L9 10m6 0l-6 4m6-4L9 6m0 8V6"
              />
            </svg>
            <span className="text-xs">Videos</span>
          </button>
          <button
            className={`flex flex-col items-center ${
              activeTab === 'audio' ? 'text-blue-500' : 'text-gray-500'
            }`}
            onClick={() => setActiveTab('audio')}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 19V6l12-2v14l-12 2zm0 0L3 17m6 2V6m0 13l6-2m-6 2l-6-2"
              />
            </svg>
            <span className="text-xs">Audio</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default HomeFeed;