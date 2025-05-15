
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import BottomNavigation from './components/navigation/BottomNavigation';
import HomeFeed from './pages/HomeFeed';
import MapsTab from './pages/MapsTab';
import ChallengesPage from './pages/ChallengesPage';
import LiveStreamScreen from './pages/LiveStreamScreen';
import ReportHazard from './pages/ReportHazard';
import ProfilePage from './pages/ProfilePage';
import OfflineMapDownload from './pages/OfflineMapDownload';
import MediaPage from './pages/MediaPage';

function App() {
  return (
    <AppProvider>
      <Router>
        <div className="min-h-screen bg-neutral-50 flex flex-col">
          <div className="flex-1 overflow-hidden">
            <Routes>
              <Route path="/" element={<HomeFeed />} />
              <Route path="/maps" element={<MapsTab />} />
              <Route path="/challenges" element={<ChallengesPage />} />
              <Route path="/live" element={<LiveStreamScreen />} />
              <Route path="/report" element={<ReportHazard />} />
              <Route path="/profile" element={<ProfilePage />} />
              <Route path="/offline-maps" element={<OfflineMapDownload />} />
              <Route path="/media" element={<MediaPage />} />
            </Routes>
          </div>
          <BottomNavigation />
        </div>
      </Router>
    </AppProvider>
  );
}

export default App;