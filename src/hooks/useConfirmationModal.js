import { useState, useCallback } from 'react';

// 🔑 Global store (singleton)
let listeners = [];
let state = {
  isOpen: false,
  title: '',
  message: '',
  confirmText: 'Confirm',
  cancelText: 'Cancel',
  onConfirm: null,
  onCancel: null,
};

const setState = (newState) => {
  state = { ...state, ...newState };
  listeners.forEach((l) => l(state));
};

// Hook API
export const useConfirmationModal = () => {
  const [modalState, setModalState] = useState(state);

  const update = useCallback((s) => setModalState(s), []);

  // Subscribe once
  if (!listeners.includes(update)) {
    listeners.push(update);
  }

  const openModal = useCallback(
    ({ title, message, confirmText, cancelText, onConfirm, onCancel }) => {
      setState({
        isOpen: true,
        title,
        message,
        confirmText: confirmText || 'Confirm',
        cancelText: cancelText || 'Cancel',
        onConfirm,
        onCancel,
      });
    },
    []
  );

  const closeModal = useCallback(() => {
    setState({ isOpen: false });
  }, []);

  return { modalState, openModal, closeModal };
};
