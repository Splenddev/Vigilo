import { Outlet } from 'react-router-dom';
import StatusModal from './components/modal/StatusModal';
import NetworkBanner from './components/modal/NetworkBanner';
import ScrollToTop from './components/common/ScrollToTop';

const App = () => {
  return (
    <div className="">
      <ScrollToTop />
      <NetworkBanner />
      <StatusModal />
      <Outlet />
    </div>
  );
};

export default App;
