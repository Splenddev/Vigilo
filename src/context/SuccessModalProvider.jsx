import { createContext, useContext } from 'react';
import { useSuccessModal } from '../hooks/useSuccessModal';
import SuccessModal from '../components/modal/SuccessModal';

const SuccessModalContext = createContext(null);

export const SuccessModalProvider = ({ children }) => {
  const modal = useSuccessModal();

  return (
    <SuccessModalContext.Provider value={modal}>
      {children}
      <SuccessModal
        isOpen={modal.isOpen}
        responseData={modal.responseData}
        onClose={modal.closeModal}
      />
    </SuccessModalContext.Provider>
  );
};

export const useGlobalSuccessModal = () => useContext(SuccessModalContext);
