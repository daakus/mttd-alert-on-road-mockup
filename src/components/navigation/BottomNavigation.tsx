import { useNavigate, useLocation } from 'react-router-dom';
import { Home, Map, Trophy, Tv, PlusCircle, User, Film } from 'lucide-react'; // Import the Film icon

const BottomNavigation: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
 
  const isActive = (path: string) => location.pathname === path;

  const navItems = [
    { icon: Home, label: 'Home', path: '/' },
    { icon: Map, label: 'Maps', path: '/maps' },
    { icon: Trophy, label: 'Challenges', path: '/challenges' },
    { icon: null, label: 'Create', path: '/report' },
    { icon: Tv, label: 'Live', path: '/live' },
    { icon: Film, label: 'Media', path: '/media' }, // Updated Media tab with Film icon
    { icon: User, label: 'Profile', path: '/profile' }, // Profile remains the last position
  ];

  return (
    <div className="bg-white border-t border-gray-200 fixed bottom-0 left-0 right-0 z-50">
      <div className="flex justify-around items-center h-16">
        {navItems.map((item, index) => (
          <button
            key={index}
            className={`flex flex-col items-center justify-center ${
              isActive(item.path) ? 'text-green-600' : 'text-gray-500'
            } ${item.label === 'Create' ? 'relative -top-4' : ''}`}
            onClick={() => navigate(item.path)}
          >
            {item.label === 'Create' ? (
              <div className="bg-red-600 rounded-full p-3 shadow-lg">
                <PlusCircle className="h-6 w-6 text-white" />
              </div>
            ) : (
              <>
                {item.icon && <item.icon className="h-6 w-6" />}
                <span className="text-xs mt-1">{item.label}</span>
              </>
            )}
          </button>
        ))}
      </div>
    </div>
  );
};

export default BottomNavigation;