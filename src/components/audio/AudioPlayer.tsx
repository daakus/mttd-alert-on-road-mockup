import React, { useEffect, useRef, useState } from 'react';
import WaveSurfer from 'wavesurfer.js';
import { Play, Pause, Download, Share2, AlertCircle } from 'lucide-react';
import Button from '../ui/Button';

interface AudioPlayerProps {
  audioUrl: string;
  title: string;
  duration: string;
  onDownload?: () => void;
}

const AudioPlayer: React.FC<AudioPlayerProps> = ({
  audioUrl,
  title,
  duration,
  onDownload
}) => {
  const waveformRef = useRef<HTMLDivElement>(null);
  const wavesurfer = useRef<WaveSurfer | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState('0:00');
  const [error, setError] = useState<string | null>(null);
  const [loadAttempts, setLoadAttempts] = useState(0);
  const MAX_RETRIES = 3;
  const RETRY_DELAY = 2000;

  const initializeWaveSurfer = async () => {
    if (!waveformRef.current) return;

    try {
      // Destroy existing instance if it exists
      if (wavesurfer.current) {
        wavesurfer.current.destroy();
      }

      wavesurfer.current = WaveSurfer.create({
        container: waveformRef.current,
        waveColor: '#4ADE80',
        progressColor: '#166534',
        cursorColor: '#166534',
        barWidth: 2,
        barGap: 3,
        height: 48,
        normalize: true,
        backend: 'WebAudio',
        fetchParams: {
          // Add credentials if needed for CORS
          credentials: 'same-origin',
          // Add a cache control header to prevent caching issues
          cache: 'no-cache',
        }
      });

      const handleAudioProcess = () => {
        if (wavesurfer.current) {
          const time = Math.floor(wavesurfer.current.getCurrentTime());
          const minutes = Math.floor(time / 60);
          const seconds = time % 60;
          setCurrentTime(`${minutes}:${seconds.toString().padStart(2, '0')}`);
        }
      };

      const handleFinish = () => {
        setIsPlaying(false);
      };

      const handleError = (err: Error) => {
        console.error('WaveSurfer error:', err);
        setError('Error loading audio file');
        
        // Implement retry mechanism
        if (loadAttempts < MAX_RETRIES) {
          setTimeout(() => {
            setLoadAttempts(prev => prev + 1);
            loadAudio();
          }, RETRY_DELAY);
        }
      };

      wavesurfer.current.on('audioprocess', handleAudioProcess);
      wavesurfer.current.on('finish', handleFinish);
      wavesurfer.current.on('error', handleError);

      await loadAudio();

    } catch (error) {
      console.error('Error initializing WaveSurfer:', error);
      setError('Failed to initialize audio player');
    }
  };

  const loadAudio = async () => {
    if (!wavesurfer.current) return;

    try {
      setError(null);
      
      // Create AbortController for timeout
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 second timeout

      // First check if the audio URL is accessible
      const response = await fetch(audioUrl, {
        method: 'HEAD',
        signal: controller.signal
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        throw new Error(`Audio file not accessible: ${response.statusText}`);
      }

      // If the URL is accessible, load it into WaveSurfer
      await wavesurfer.current.load(audioUrl);
      setLoadAttempts(0); // Reset attempts on successful load
    } catch (error) {
      if (error instanceof Error && error.name === 'AbortError') {
        setError('Audio file loading timed out');
      } else {
        setError('Failed to load audio file');
      }
      console.error('Error loading audio:', error);
    }
  };

  useEffect(() => {
    let cleanup = false;

    if (!cleanup) {
      initializeWaveSurfer();
    }

    return () => {
      cleanup = true;
      try {
        if (wavesurfer.current) {
          wavesurfer.current.unAll();
          wavesurfer.current.destroy();
          wavesurfer.current = null;
        }
      } catch (error) {
        console.error('Error cleaning up WaveSurfer:', error);
      }
    };
  }, [audioUrl, loadAttempts]);

  const togglePlayPause = () => {
    if (wavesurfer.current && !error) {
      wavesurfer.current.playPause();
      setIsPlaying(!isPlaying);
    }
  };

  const handleDownload = () => {
    onDownload?.();
  };

  const handleRetry = () => {
    setLoadAttempts(0);
    setError(null);
    initializeWaveSurfer();
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-4">
      <div className="flex items-center justify-between mb-3">
        <div>
          <h3 className="font-medium">{title}</h3>
          <p className="text-sm text-gray-500">
            {currentTime} / {duration}
          </p>
        </div>
        <div className="flex space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={handleDownload}
            leftIcon={<Download className="h-4 w-4" />}
          >
            Save
          </Button>
          <Button
            variant="outline"
            size="sm"
            leftIcon={<Share2 className="h-4 w-4" />}
          >
            Share
          </Button>
        </div>
      </div>

      {error ? (
        <div className="flex items-center justify-between p-4 bg-red-50 rounded-lg mb-3">
          <div className="flex items-center space-x-2">
            <AlertCircle className="h-5 w-5 text-red-500" />
            <span className="text-sm text-red-700">{error}</span>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={handleRetry}
          >
            Retry
          </Button>
        </div>
      ) : null}

      <div className="flex items-center space-x-4">
        <button
          onClick={togglePlayPause}
          className={`h-10 w-10 rounded-full ${error ? 'bg-gray-400 cursor-not-allowed' : 'bg-green-600'} flex items-center justify-center flex-shrink-0`}
          disabled={!!error}
        >
          {isPlaying ? (
            <Pause className="h-5 w-5 text-white" />
          ) : (
            <Play className="h-5 w-5 text-white ml-1" />
          )}
        </button>
        <div ref={waveformRef} className="flex-1" />
      </div>
    </div>
  );
};

export default AudioPlayer;