import React, { useState, useRef, useEffect } from 'react';
import { Heart, MessageCircle, Share, Download, User2 } from 'lucide-react';
import { useAppContext } from '../../context/AppContext';

interface VideoPlayerProps {
  videoUrl: string;
  username: string;
  description: string;
  likes: number;
  comments: number;
  shares: number;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({
  videoUrl,
  username,
  description,
  likes,
  comments,
  shares
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [liked, setLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(likes);
  const videoRef = useRef<HTMLVideoElement>(null);
  const { language } = useAppContext();

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleLike = () => {
    setLiked(!liked);
    setLikesCount(prev => liked ? prev - 1 : prev + 1);
  };

  useEffect(() => {
    const options = {
      root: null,
      rootMargin: '0px',
      threshold: 0.7,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && videoRef.current) {
          videoRef.current.play();
          setIsPlaying(true);
        } else if (videoRef.current) {
          videoRef.current.pause();
          setIsPlaying(false);
        }
      });
    }, options);

    if (videoRef.current) {
      observer.observe(videoRef.current);
    }

    return () => {
      if (videoRef.current) {
        observer.unobserve(videoRef.current);
      }
    };
  }, []);

  return (
    <div className="relative h-full w-full bg-black">
      <video
        ref={videoRef}
        className="h-full w-full object-cover"
        src={videoUrl}
        loop
        muted
        playsInline
        onClick={togglePlay}
      />
      
      {/* Video Controls */}
      <div className="absolute inset-0 flex flex-col justify-between p-4 pointer-events-none">
        {/* Top area - can be used for header */}
        <div className="z-10"></div>
        
        {/* Bottom area - video info */}
        <div className="z-10">
          <h2 className="text-white font-bold text-lg">{username}</h2>
          <p className="text-white text-sm mb-4">{description}</p>
          
          {/* Sponsorship banner */}
          <div className="bg-yellow-500 bg-opacity-80 p-2 rounded-lg mt-2">
            <p className="text-black text-sm font-medium">
              Sponsored by GOIL: Tap to find the nearest fuel station!
            </p>
          </div>
        </div>
      </div>
      
      {/* Right side buttons */}
      <div className="absolute right-4 bottom-24 flex flex-col space-y-6 items-center">
        <button onClick={handleLike} className="pointer-events-auto">
          <Heart className={`h-8 w-8 ${liked ? 'text-red-500 fill-red-500' : 'text-white'}`} />
          <span className="text-white text-xs">{likesCount}</span>
        </button>
        
        <button className="pointer-events-auto">
          <MessageCircle className="h-8 w-8 text-white" />
          <span className="text-white text-xs">{comments}</span>
        </button>
        
        <button className="pointer-events-auto">
          <Share className="h-8 w-8 text-white" />
          <span className="text-white text-xs">{shares}</span>
        </button>
        
        <button className="pointer-events-auto bg-blue-500 p-2 rounded-full">
          <Download className="h-6 w-6 text-white" />
          <span className="text-white text-xs">Map</span>
        </button>
        
        <button className="pointer-events-auto">
          <div className="bg-green-600 h-10 w-10 rounded-full flex items-center justify-center border-2 border-white">
            <User2 className="h-6 w-6 text-white" />
          </div>
        </button>
      </div>
      
      {/* Play/Pause Indicator */}
      {!isPlaying && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="h-16 w-16 bg-black bg-opacity-50 rounded-full flex items-center justify-center">
            <div className="border-l-[20px] border-l-white border-t-[15px] border-t-transparent border-b-[15px] border-b-transparent ml-1"></div>
          </div>
        </div>
      )}
    </div>
  );
};

export default VideoPlayer;