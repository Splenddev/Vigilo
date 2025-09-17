import { Outlet } from 'react-router-dom';
import StatusModal from './components/modal/StatusModal';
import NetworkBanner from './components/modal/NetworkBanner';
import ScrollToTop from './components/common/ScrollToTop';
import ThemeToggler from './components/common/ThemeToggler';
import ConfirmationModal from './components/modal/ConfirmationModal';
import { SuccessModalProvider } from './context/SuccessModalProvider';

const App = () => {
  return (
    <div>
      <div className="fixed bottom-3 right-3 z-100">
        <ThemeToggler />
      </div>

      <ScrollToTop />
      <NetworkBanner />
      <StatusModal />
      <ConfirmationModal />
      <SuccessModalProvider>
        <Outlet />
      </SuccessModalProvider>
    </div>
  );
};

export default App;
