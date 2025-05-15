import React from 'react';

interface GhanaLogoProps {
  className?: string;
}

const GhanaLogo: React.FC<GhanaLogoProps> = ({ className = "h-6 w-6" }) => {
  return (
    <div className={`relative ${className} overflow-hidden`}>
      <div className="absolute inset-0 flex flex-col">
        <div className="flex-1 bg-red-600"></div>
        <div className="flex-1 bg-yellow-400"></div>
        <div className="flex-1 bg-green-600"></div>
      </div>
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-1/3 h-1/3 bg-black"></div>
      </div>
    </div>
  );
};

export default GhanaLogo;