import { hideModal, showError, showSuccess } from '../stores/modalStore';

export const useErrorModal = () => {
  return { showError, hideModal };
};

export const useSuccessModal = () => {
  return { showSuccess, hideModal };
};
