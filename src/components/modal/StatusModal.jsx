// src/components/ui/StatusModal.jsx
import React, { useEffect, useState } from 'react';
import { getModal, subscribe, hideModal } from '../../stores/modalStore';
import {  LuCircleCheck, LuCircleX } from 'react-icons/lu';

const StatusModal = () => {
  const [modal, setModal] = useState(getModal());

  useEffect(() => {
    const unsubscribe = subscribe(setModal);
    return unsubscribe;
  }, []);

  if (!modal.type) return null;

  const isError = modal.type === 'error';

  return (
    <div className="fixed inset-0 z-70 flex items-center justify-center bg-black/40 backdrop-blur-sm animate-fade-in-up">
      <div className="p-6 card-hover max-w-sm w-full text-center animate-fade-in-up shadow-2xl relative">
        {/* Icon */}
        <div className="flex justify-center mb-4">
          {isError ? (
            <LuCircleX className="w-12 h-12 text-red-500 animate-pulse-glow" />
          ) : (
            <LuCircleCheck className="w-12 h-12 text-green-500 animate-pulse-glow" />
          )}
        </div>

        {/* Title */}
        <h2
          className={`text-heading-md mb-2 ${
            isError ? 'text-red-500' : 'text-green-400'
          }`}>
          {isError ? 'Something went wrong' : 'Success!'}
        </h2>

        {/* Message */}
        <p className="text-body-sm text-color-text-secondary mb-6">
          {modal.message}
        </p>

        {/* Close button */}
        <button
          onClick={hideModal}
          className={`btn-primary px-5 py-2 rounded-xl font-semibold tracking-wide ${
            isError ? 'bg-red-500 hover:bg-red-600' : ''
          }`}>
          Close
        </button>
      </div>
    </div>
  );
};

export default StatusModal;
