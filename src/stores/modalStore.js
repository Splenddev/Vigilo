const listeners = new Set();

let modal = { type: null, message: '' };

export const getModal = () => modal;

export const subscribe = (callback) => {
  listeners.add(callback);
  return () => listeners.delete(callback);
};

const notify = () => {
  for (const cb of listeners) cb(modal);
};

export const showError = (message, status) => {
  modal = { type: 'error', message, status };
  console.log(message);
  console.log(status);
  notify();
};

export const showSuccess = (message) => {
  modal = { type: 'success', message };
  notify();
};

export const hideModal = () => {
  modal = { type: null, message: '' };
  notify();
};
