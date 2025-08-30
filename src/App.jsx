import { Outlet } from 'react-router-dom';
import StatusModal from './components/modal/StatusModal';
import NetworkBanner from './components/modal/NetworkBanner';

const App = () => {
  return (
    <div className="">
      <NetworkBanner />
      <StatusModal />
      <Outlet />
    </div>
  );
};

export default App;
