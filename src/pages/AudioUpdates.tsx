import React from 'react';
import AudioPlayer from '../components/audio/AudioPlayer';

const AudioUpdates: React.FC = () => {
  const audioUpdates = [
    {
      id: 1,
      audioUrl: 'https://www2.cs.uic.edu/~i101/SoundFiles/CantinaBand3.wav',
      title: 'Live Traffic Update: Accra Central',
      duration: '2:30',
    },
    {
      id: 2,
      audioUrl: 'https://www2.cs.uic.edu/~i101/SoundFiles/ImperialMarch60.wav',
      title: 'Road Closure Alert: Tema Motorway',
      duration: '1:45',
    },
  ];

  const handleDownload = async (audioUrl: string) => {
    try {
      const response = await fetch(audioUrl);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'traffic-update.mp3';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error downloading audio:', error);
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-lg font-semibold mb-3">Audio Traffic Updates</h2>
      <div className="space-y-3">
        {audioUpdates.map((audio) => (
          <AudioPlayer
            key={audio.id}
            audioUrl={audio.audioUrl}
            title={audio.title}
            duration={audio.duration}
            onDownload={() => handleDownload(audio.audioUrl)}
          />
        ))}
      </div>
    </div>
  );
};

export default AudioUpdates;