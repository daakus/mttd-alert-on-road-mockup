import React from 'react';
import { Siren as Fire, TrendingUp as Trending, Video, Award } from 'lucide-react';
import TopBar from '../components/ui/TopBar';
import Button from '../components/ui/Button';

const ChallengesPage: React.FC = () => {
  // Mock trending hashtags
  const trendingHashtags = [
    { id: 1, tag: '#DontDeyDey', count: '12.5K posts' },
    { id: 2, tag: '#FixOurRoadsGH', count: '8.7K posts' },
    { id: 3, tag: '#DriveRightGH', count: '5.2K posts' },
    { id: 4, tag: '#NoMorePotholes', count: '3.1K posts' }
  ];

  // Mock challenge videos
  const challengeVideos = [
    { id: 1, thumbnail: 'https://images.pexels.com/photos/1563356/pexels-photo-1563356.jpeg', username: '@KwameRoads', likes: '1.2K' },
    { id: 2, thumbnail: 'https://images.pexels.com/photos/1715191/pexels-photo-1715191.jpeg', username: '@AccraDriver', likes: '3.4K' },
    { id: 3, thumbnail: 'https://images.pexels.com/photos/2119206/pexels-photo-2119206.jpeg', username: '@SafetyFirst', likes: '890' },
    { id: 4, thumbnail: 'https://images.pexels.com/photos/1770754/pexels-photo-1770754.jpeg', username: '@GHRoadHero', likes: '2.1K' },
    { id: 5, thumbnail: 'https://images.pexels.com/photos/2365572/pexels-photo-2365572.jpeg', username: '@KumasiQueen', likes: '1.5K' },
    { id: 6, thumbnail: 'https://images.pexels.com/photos/3052361/pexels-photo-3052361.jpeg', username: '@RoadChampGH', likes: '670' },
  ];

  return (
    <div className="pb-16">
      <TopBar title="Challenges" />
      
      <div className="p-4">
        {/* Trending Hashtags */}
        <div className="mb-6">
          <div className="flex items-center mb-3">
            <Trending className="h-5 w-5 text-red-600 mr-2" />
            <h2 className="text-lg font-semibold">Trending Hashtags</h2>
          </div>
          
          <div className="flex overflow-x-auto space-x-3 py-2 -mx-4 px-4">
            {trendingHashtags.map(hashtag => (
              <div key={hashtag.id} className="flex-shrink-0 bg-white rounded-full border border-gray-200 px-4 py-2 flex items-center">
                <span className="font-medium text-green-600">{hashtag.tag}</span>
                <span className="text-xs text-gray-500 ml-2">{hashtag.count}</span>
              </div>
            ))}
          </div>
        </div>
        
        {/* Featured Challenge */}
        <div className="mb-6 bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-xl p-4">
          <div className="flex items-start justify-between">
            <div>
              <div className="flex items-center">
                <Fire className="h-5 w-5 text-red-600 mr-2" />
                <h2 className="text-lg font-bold text-white">Featured Challenge</h2>
              </div>
              <h3 className="text-2xl font-extrabold mt-2 text-white">#DontDeyDey</h3>
              <p className="text-white text-opacity-90 mt-1">Show dangerous roads in your area!</p>
              <p className="text-sm text-black font-medium mt-4">Sponsored by Japan Motors – Win a free tire!</p>
            </div>
            
            <Button 
              variant="primary" 
              leftIcon={<Video className="h-4 w-4" />}
            >
              Join
            </Button>
          </div>
        </div>
        
        {/* Challenge Videos Grid */}
        <div className="mb-4">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center">
              <Award className="h-5 w-5 text-green-600 mr-2" />
              <h2 className="text-lg font-semibold">Challenge Videos</h2>
            </div>
            <button className="text-sm text-green-600 font-medium">See All</button>
          </div>
          
          <div className="grid grid-cols-2 gap-3">
            {challengeVideos.map(video => (
              <div key={video.id} className="relative rounded-lg overflow-hidden aspect-square bg-gray-200">
                <img 
                  src={video.thumbnail} 
                  alt="Challenge video thumbnail"
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 p-2">
                  <p className="text-white text-sm">{video.username}</p>
                  <div className="flex items-center mt-1">
                    <Fire className="h-3 w-3 text-red-500 mr-1" />
                    <span className="text-white text-xs">{video.likes}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Create Challenge Button */}
        <div className="fixed bottom-20 right-4 z-40">
          <button className="bg-red-600 h-14 w-14 rounded-full flex items-center justify-center shadow-lg">
            <Video className="h-6 w-6 text-white" />
          </button>
          <span className="block text-center mt-1 text-xs font-medium">Create</span>
        </div>
      </div>
    </div>
  );
};

export default ChallengesPage;