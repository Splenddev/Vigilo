import { Outlet } from 'react-router-dom';
import StatusModal from './components/modal/StatusModal';
import NetworkBanner from './components/modal/NetworkBanner';
import ScrollToTop from './components/common/ScrollToTop';
import ThemeToggler from './components/common/ThemeToggler';
import ConfirmationModal from './components/modal/ConfirmationModal';
import SuccessModal from './components/modal/SuccessModal';
import { useSuccessModal } from './hooks/useSuccessModal';

const App = () => {
  const { isOpen, responseData, closeModal } = useSuccessModal();

  return (
    <div>
      <div className="fixed bottom-3 right-3 z-100">
        <ThemeToggler />
      </div>

      <ScrollToTop />
      <NetworkBanner />
      <StatusModal />
      <SuccessModal
        isOpen={isOpen}
        responseData={responseData}
        onClose={closeModal}
      />
      <ConfirmationModal />
      <Outlet />
    </div>
  );
};

export default App;
