import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// --- HELPER COMPONENTS ---

// Icon component for SVG icons
const Icon = ({ path, className = 'w-6 h-6' }) => (
  <svg
    className={className}
    fill="currentColor"
    viewBox="0 0 20 20"
    xmlns="http://www.w3.org/2000/svg">
    <path
      fillRule="evenodd"
      d={path}
      clipRule="evenodd"></path>
  </svg>
);

// --- ICONS ---

const BellIcon = () => (
  <Icon path="M10 2a6 6 0 00-6 6v3.586l-1.707 1.707A1 1 0 003 15h14a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 003-3h-6a3 3 0 003 3z" />
);
const CheckCircleIcon = () => (
  <Icon path="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" />
);
const XIcon = () => (
  <Icon path="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" />
);
const UserPlusIcon = () => (
  <Icon path="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" />
);
const AlertTriangleIcon = () => (
  <Icon path="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.22 3.006-1.742 3.006H4.42c-1.522 0-2.492-1.672-1.742-3.006l5.58-9.92zM10 13a1 1 0 110-2 1 1 0 010 2zm-1-4a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1z" />
);
const ClockIcon = () => (
  <Icon path="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.414-1.414L11 10.586V6z" />
);
const TrashIcon = () => (
  <Icon path="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" />
);
const EnvelopeOpenIcon = () => (
  <Icon path="M18 8.42a2 2 0 00-2-2H4a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2v-8zM10 13L4.93 9.42A2 2 0 014 8V6.42l6 4.42 6-4.42V8a2 2 0 01-.93.58L10 13z" />
);

// Button component with variants
const Button = ({
  onClick,
  children,
  variant = 'primary',
  size = 'md',
  className = '',
}) => {
  const baseClasses =
    'inline-flex items-center justify-center font-semibold rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 transition-all duration-200';
  const sizeClasses = {
    sm: 'px-3 py-1.5 text-xs',
    md: 'px-4 py-2 text-sm',
    lg: 'px-6 py-3 text-base',
  };
  const variantClasses = {
    primary: 'bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500',
    secondary:
      'bg-gray-200 text-gray-800 hover:bg-gray-300 focus:ring-gray-400',
    danger: 'bg-red-500 text-white hover:bg-red-600 focus:ring-red-500',
    ghost:
      'bg-transparent text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700',
  };

  return (
    <button
      onClick={onClick}
      className={`${baseClasses} ${sizeClasses[size]} ${variantClasses[variant]} ${className}`}>
      {children}
    </button>
  );
};

// --- MOCK DATA ---
const initialNotifications = [
  {
    id: 1,
    type: 'invite',
    message: 'Alex Johnson invited you to the "Q4 Marketing Strategy" project.',
    time: '2 minutes ago',
    unread: true,
  },
  {
    id: 2,
    type: 'session_starting',
    message: 'Your "Daily Standup" meeting is starting in 5 minutes.',
    time: '10 minutes ago',
    unread: true,
  },
  {
    id: 3,
    type: 'warning',
    message: 'API key for the "Staging Environment" will expire in 3 days.',
    time: '1 hour ago',
    unread: false,
  },
  {
    id: 4,
    type: 'reminder',
    message: 'Reminder: Submit your weekly progress report by EOD.',
    time: '3 hours ago',
    unread: false,
  },
  {
    id: 5,
    type: 'update',
    message: 'Your profile information was successfully updated.',
    time: '1 day ago',
    unread: true,
  },
];

// --- MAIN NOTIFICATION PANEL COMPONENT ---

const NotificationPanel = () => {
  const [notifications, setNotifications] = useState(initialNotifications);
  const [showPanel, setShowPanel] = useState(false);
  const panelRef = useRef(null);

  const unreadCount = notifications.filter((n) => n.unread).length;

  const typeConfig = {
    session_starting: { icon: <ClockIcon />, color: 'bg-blue-500' },
    invite: { icon: <UserPlusIcon />, color: 'bg-purple-500' },
    warning: { icon: <AlertTriangleIcon />, color: 'bg-red-500' },
    reminder: { icon: <ClockIcon />, color: 'bg-yellow-500 text-yellow-900' },
    update: { icon: <CheckCircleIcon />, color: 'bg-green-500' },
    default: { icon: <BellIcon />, color: 'bg-gray-500' },
  };

  // Close panel on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (panelRef.current && !panelRef.current.contains(event.target)) {
        setShowPanel(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleMarkAsRead = (id) => {
    setNotifications(
      notifications.map((n) => (n.id === id ? { ...n, unread: false } : n))
    );
  };

  const handleDismiss = (id) => {
    setNotifications(notifications.filter((n) => n.id !== id));
  };

  const handleMarkAllAsRead = () => {
    setNotifications(notifications.map((n) => ({ ...n, unread: false })));
  };

  const handleClearAll = () => {
    setNotifications([]);
  };

  // Main App component to render the NotificationPanel
  const App = () => (
    <div className="relative font-sans antialiased text-gray-900 bg-gray-50 dark:bg-gray-900 dark:text-white">
      <header className="flex items-center justify-end p-4 bg-white dark:bg-gray-800 shadow-md">
        <NotificationPanel />
      </header>
      <main className="p-8 h-screen flex items-center justify-center text-center">
        <div>
          <h1 className="text-4xl font-bold mb-4">
            Notification Panel Component
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Click the bell icon in the top-right corner to see the redesigned
            panel.
          </p>
        </div>
      </main>
    </div>
  );

  return (
    <div
      className="relative"
      ref={panelRef}>
      {/* Bell Button */}
      <button
        onClick={() => setShowPanel(!showPanel)}
        className="relative p-2 text-gray-600 bg-gray-100 rounded-full hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 dark:text-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600">
        <BellIcon />
        <AnimatePresence>
          {unreadCount > 0 && (
            <motion.span
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
              {unreadCount}
            </motion.span>
          )}
        </AnimatePresence>
      </button>

      {/* Dropdown Panel */}
      <AnimatePresence>
        {showPanel && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute right-0 top-full mt-2 w-96 rounded-2xl z-50 bg-white dark:bg-gray-800 shadow-2xl overflow-hidden border border-gray-200 dark:border-gray-700">
            {/* Header */}
            <header className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
              <h3 className="text-lg font-bold text-gray-800 dark:text-gray-100">
                Notifications
              </h3>
              <Button
                onClick={() => setShowPanel(false)}
                variant="ghost"
                size="sm"
                className="!p-1">
                <XIcon />
              </Button>
            </header>

            {/* Notification List */}
            <div className="max-h-96 overflow-y-auto">
              {notifications.length === 0 ? (
                <div className="text-center py-12 px-4">
                  <div className="mx-auto w-16 h-16 text-green-500 bg-green-100 dark:bg-green-800 dark:text-green-300 rounded-full flex items-center justify-center">
                    <CheckCircleIcon />
                  </div>
                  <h4 className="mt-4 text-lg font-semibold text-gray-800 dark:text-gray-200">
                    All caught up!
                  </h4>
                  <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                    You have no new notifications.
                  </p>
                </div>
              ) : (
                <ul className="divide-y divide-gray-200 dark:divide-gray-700">
                  {notifications.map((n) => {
                    const config = typeConfig[n.type] || typeConfig.default;
                    return (
                      <motion.li
                        key={n.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{
                          opacity: 0,
                          x: 20,
                          transition: { duration: 0.2 },
                        }}
                        className={`group relative p-4 transition-colors hover:bg-gray-50 dark:hover:bg-gray-700/50 ${
                          n.unread ? 'bg-blue-50 dark:bg-blue-900/20' : ''
                        }`}>
                        <div className="flex items-start gap-4">
                          <div
                            className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center text-white text-lg ${config.color}`}>
                            {config.icon}
                          </div>
                          <div className="flex-1">
                            <p className="text-sm text-gray-700 dark:text-gray-300">
                              {n.message}
                            </p>
                            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                              {n.time}
                            </p>
                          </div>
                          {n.unread && (
                            <div className="absolute top-1/2 -translate-y-1/2 right-4 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                              <Button
                                onClick={() => handleMarkAsRead(n.id)}
                                variant="ghost"
                                size="sm"
                                className="!p-1"
                                title="Mark as read">
                                <EnvelopeOpenIcon />
                              </Button>
                            </div>
                          )}
                          <div className="absolute top-1/2 -translate-y-1/2 right-4 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                            <Button
                              onClick={() => handleDismiss(n.id)}
                              variant="ghost"
                              size="sm"
                              className="!p-1 text-red-500"
                              title="Dismiss notification">
                              <TrashIcon />
                            </Button>
                          </div>
                        </div>
                      </motion.li>
                    );
                  })}
                </ul>
              )}
            </div>

            {/* Footer */}
            {notifications.length > 0 && (
              <footer className="p-2 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50 flex justify-between items-center">
                <Button
                  onClick={handleMarkAllAsRead}
                  variant="secondary"
                  size="sm">
                  Mark all as read
                </Button>
                <Button
                  onClick={handleClearAll}
                  variant="danger"
                  size="sm">
                  Clear all
                </Button>
              </footer>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default NotificationPanel
