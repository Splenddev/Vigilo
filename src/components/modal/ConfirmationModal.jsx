import { motion, AnimatePresence } from 'framer-motion';
import { HiOutlineExclamationCircle } from 'react-icons/hi';
import { useConfirmationModal } from '../../hooks/useConfirmationModal';

const drawerBottom = {
  hidden: { y: '100%' },
  visible: {
    y: 0,
    transition: { type: 'spring', stiffness: 300, damping: 30 },
  },
  exit: { y: '100%', transition: { duration: 0.3 } },
};

const ConfirmationModal = () => {
  const { modalState, closeModal } = useConfirmationModal();
  const {
    isOpen,
    title,
    message,
    confirmText,
    cancelText,
    onConfirm,
    onCancel,
  } = modalState;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
            onClick={closeModal}
          />

          {/* Drawer */}
          <motion.div
            variants={drawerBottom}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="fixed bottom-0 left-0 right-0 bg-bg-primary border-t border-bg-glass-md rounded-t-2xl p-6 z-50">
            <div className="max-w-md mx-auto">
              <div className="text-center mb-6">
                <div className="w-16 h-16 mx-auto rounded-full bg-red-500/20 flex items-center justify-center mb-4">
                  <HiOutlineExclamationCircle className="text-3xl text-red-400" />
                </div>
                <h3 className="text-xl font-bold text-t-primary mb-2">
                  {title}
                </h3>
                <p className="text-slate-400">{message}</p>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => {
                    closeModal();
                    onCancel?.();
                  }}
                  className="flex-1 btn-ghost text-white px-6 py-3 rounded-xl">
                  {cancelText}
                </button>
                <button
                  onClick={() => {
                    closeModal();
                    onConfirm?.();
                  }}
                  className="flex-1 btn-danger px-6 py-3 rounded-xl">
                  {confirmText}
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default ConfirmationModal;
