import React from "react";
import { FiX, FiAlertTriangle, FiInfo } from "react-icons/fi";
import Button from "../atoms/Button";

const ErrorModal = ({ isOpen, errorData, onClose, actions = [] }) => {
  if (!isOpen || !errorData) return null;

  const parseErrorData = (data) => {
    const message = data?.response?.data?.error || "Something went wrong.";
    const details = Array.isArray(data?.details) ? data.details : [];
    const code = data?.code || null;

    return { title: "Error Occurred", message, details, code };
  };

  const parsed = parseErrorData(errorData);

  // Map variant → classes
  const variantClasses = {
    primary: "bg-blue-600 hover:bg-blue-700 text-white",
    secondary:
      "bg-gray-200 hover:bg-gray-300 text-gray-800 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-gray-200",
    danger: "bg-red-600 hover:bg-red-700 text-white",
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="bg-bg-primary rounded-lg shadow-xl max-w-lg w-full max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-bg-glass-lg bg-red-100/30 dark:bg-red-900/20">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-red-200 rounded-full flex items-center justify-center shrink-0">
              <FiAlertTriangle className="text-red-600 dark:text-red-400 w-6 h-6" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-red-700 dark:text-red-400">
                {parsed.title}
              </h2>
              <p className="text-sm text-t-secondary">{parsed.message}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <FiX className="w-6 h-6" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
          {parsed.code && (
            <div className="mb-4 text-sm text-gray-500 dark:text-gray-400">
              <span className="font-medium">Error Code:</span> {parsed.code}
            </div>
          )}

          {parsed.details.length > 0 && (
            <div className="mb-6">
              <h3 className="text-lg font-medium text-t-primary mb-3">
                Details
              </h3>
              <ul className="list-disc pl-5 space-y-1 text-sm text-t-secondary">
                {parsed.details.map((detail, index) => (
                  <li key={index}>{detail}</li>
                ))}
              </ul>
            </div>
          )}

          <div className="mt-6 p-4 bg-red-100 rounded-lg dark:bg-red-900/30">
            <div className="flex items-start gap-3">
              <FiInfo className="w-5 h-5 text-red-600 dark:text-red-400 mt-0.5" />
              <div className="text-sm">
                <p className="font-medium text-red-900 dark:text-red-200">
                  Next Steps
                </p>
                <p className="text-red-700 dark:text-red-300 mt-1">
                  Please review the error details and try again. If the issue
                  persists, contact support or check your input data.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-end gap-3 p-6 border-t border-bg-glass-lg">
          {/* Dynamic Action Buttons */}
          {actions.map((action, idx) => (
            <Button
            key={idx}
              onClick={action.onClick}
              className={`rounded-lg transition-colors font-medium `} 
              variant={action.variant}
              // size='sm'
            >
              {action.label}
            </Button>
          ))}

          {/* Default Close */}
          <Button
            onClick={onClose}
            className={`rounded-lg transition-colors font-medium`} 
            size='sm'
            variant='danger'          >
            Close
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ErrorModal;
