import React, { useState } from 'react';
import { MapPin, Bell, ChevronDown } from 'lucide-react';
import GhanaLogo from './GhanaLogo';

interface TopBarProps {
  title?: string;
  showLocation?: boolean;
  showNotification?: boolean;
  transparent?: boolean;
  className?: string;
}

const TopBar: React.FC<TopBarProps> = ({
  title = 'MTTD Alert On Road',
  showLocation = true,
  showNotification = true,
  transparent = false,
  className = '',
}) => {
  const [language, setLanguage] = useState<'en' | 'twi'>('en'); // State for language

  const toggleLanguage = () => {
    setLanguage((prevLanguage) => (prevLanguage === 'en' ? 'twi' : 'en'));
  };

  return (
    <div
      className={`px-4 py-3 flex items-center justify-between ${
        transparent
          ? 'bg-transparent'
          : 'bg-white shadow-md border-b border-gray-200'
      } fixed top-0 left-0 right-0 z-20 ${className}`}
    >
      <div className="flex items-center">
        <GhanaLogo className="h-8 w-8 mr-2" />
        {title && <h1 className="text-xl font-semibold">{title}</h1>}
      </div>
      <div className="flex items-center space-x-4">
        {showLocation && (
          <button className="flex items-center text-sm font-medium">
            <MapPin className="h-4 w-4 mr-1 text-red-600" />
            <span>Accra</span>
            <ChevronDown className="h-4 w-4 ml-1" />
          </button>
        )}
        {showNotification && (
          <button className="relative">
            <Bell className="h-6 w-6" />
            <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
              3
            </span>
          </button>
        )}
        <button
          className="text-sm font-medium"
          onClick={toggleLanguage} // Toggle language on click
        >
          {language === 'en' ? 'EN' : 'TWI'}
        </button>
      </div>
    </div>
  );
};

export default TopBar;