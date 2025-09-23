// src/context/ErrorModalContext.jsx
import React, { createContext, useContext, useState, useCallback } from "react";
import ErrorModal from "../components/modal/ErrorModal";

const ErrorModalContext = createContext();

export const ErrorModalProvider = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [errorData, setErrorData] = useState(null);
  const [actions, setActions] = useState([]);

  const showError = useCallback((data, modalActions = []) => {
    setErrorData(data);
    setActions(modalActions);
    setIsOpen(true);
  }, []);

  const hideError = useCallback(() => {
    setIsOpen(false);
    setErrorData(null);
    setActions([]);
  }, []);

  return (
    <ErrorModalContext.Provider value={{ showError, hideError }}>
      {children}
      <ErrorModal
        isOpen={isOpen}
        errorData={errorData}
        onClose={hideError}
        actions={actions}
      />
    </ErrorModalContext.Provider>
  );
};

export const useErrorModal = () => useContext(ErrorModalContext);
