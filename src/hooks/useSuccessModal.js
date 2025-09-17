import { useState, useCallback } from 'react';

export const useSuccessModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [responseData, setResponseData] = useState(null);
  const openSuccessModal = useCallback((response) => {
    setResponseData(response);
    setIsOpen(true);
  }, []);
  const closeModal = useCallback(() => {
    setIsOpen(false);
    setResponseData(null);
  }, []);
  return { isOpen, responseData, openSuccessModal, closeModal };
};
