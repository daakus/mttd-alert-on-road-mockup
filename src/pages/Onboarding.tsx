import React from 'react';

interface OnboardingProps {
  onComplete: () => void;
}

const Onboarding: React.FC<OnboardingProps> = ({ onComplete }) => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-green-500 via-yellow-500 to-red-500 text-white relative overflow-hidden">
      {/* Scrollable Content */}
      <div className="h-full overflow-y-auto px-6 py-8">
        {/* Animated Background Elements */}
        <div className="absolute top-0 left-0 w-40 h-40 bg-yellow-400 rounded-full opacity-30 animate-pulse"></div>
        <div className="absolute bottom-0 right-0 w-60 h-60 bg-red-400 rounded-full opacity-20 animate-ping"></div>
        <div className="absolute top-1/2 left-1/2 w-80 h-80 bg-green-400 rounded-full opacity-10 animate-spin-slow"></div>

        {/* Content */}
        <h1 className="text-3xl font-bold mb-4 text-center drop-shadow-lg">
          Welcome to <span className="text-black">MTTD Alert On Road</span>
        </h1>
        <p className="text-center text-sm mb-6 font-medium drop-shadow-md">
          Stay informed and safe on the road with daily tips, live updates, and more.
        </p>

        {/* Police Animation */}
        <div className="w-48 h-48 mx-auto mb-6">
          <img
            src="https://www.picturesanimations.com/p/police/3.gif" // Replace with the actual URL of the animation
            alt="MTTD Police Directing Traffic"
            className="w-full h-full object-contain"
          />
        </div>

        <div className="space-y-4">
          <div className="bg-white text-green-700 p-3 rounded-md shadow-md transform hover:scale-105 transition duration-300">
            <h2 className="text-lg font-semibold">🚦 Daily Tips</h2>
            <p className="text-xs">Get daily road safety tips to keep you safe.</p>
          </div>
          <div className="bg-white text-yellow-700 p-3 rounded-md shadow-md transform hover:scale-105 transition duration-300">
            <h2 className="text-lg font-semibold">📡 Live Updates</h2>
            <p className="text-xs">Stay updated with live traffic and road conditions.</p>
          </div>
          <div className="bg-white text-red-700 p-3 rounded-md shadow-md transform hover:scale-105 transition duration-300">
            <h2 className="text-lg font-semibold">🏆 Interactive Features</h2>
            <p className="text-xs">Engage with challenges and share your experiences.</p>
          </div>
        </div>
        <button
          onClick={onComplete}
          className="mt-8 bg-black text-white px-6 py-3 rounded-full font-bold shadow-lg hover:bg-gray-800 transition duration-300 transform hover:scale-110 w-full"
        >
          Get Started
        </button>
      </div>
    </div>
  );
};

export default Onboarding;