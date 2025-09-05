import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  LuBell,
  LuClock,
  LuTriangleAlert,
  LuClockAlert,
  LuCircleCheck,
  LuUserPlus,
  LuX,
  LuMailOpen,
  LuTrash,
} from 'react-icons/lu';
import Button from '../atoms/Button';
import EmptyState from './EmptyState';

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
    session_starting: { icon: <LuClock />, color: 'bg-blue-500' },
    invite: { icon: <LuUserPlus />, color: 'bg-purple-500' },
    warning: { icon: <LuTriangleAlert />, color: 'bg-red-500' },
    reminder: {
      icon: <LuClockAlert />,
      color: 'bg-yellow-500 text-yellow-900',
    },
    update: { icon: <LuCircleCheck />, color: 'bg-green-500' },
    default: { icon: <LuBell />, color: 'bg-gray-500' },
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

  return (
    <div
      className="relative"
      ref={panelRef}>
      {/* Bell Button */}
      <Button
        variant="transparent"
        size="sm"
        onClick={() => setShowPanel(!showPanel)}
        className="relative text-t-primary hover:text-gray-600 rounded-full hover:bg-gray-100"
        icon={LuBell}>
        <AnimatePresence>
          {unreadCount > 0 && (
            <motion.span
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              className="absolute -top-1 right-0 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
              {unreadCount}
            </motion.span>
          )}
        </AnimatePresence>
      </Button>

      {/* Dropdown Panel */}
      <AnimatePresence>
        {showPanel && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute -right-13 top-full mt-2 w-[95vw] max-w-96 rounded-2xl z-50 bg-white dark:bg-gray-800 shadow-2xl overflow-hidden border border-gray-200 dark:border-gray-700">
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
                <LuX />
              </Button>
            </header>

            {/* Notification List */}
            {notifications.length === 0 && (
              <EmptyState
                icon={LuCircleCheck}
                variant="info"
                title="All caught up!"
                message="You have no new notifications"
              />
            )}
            <div className="max-h-96 overflow-y-auto overflow-x-hidden">
              {notifications.length > 0 && (
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
                          <div className="flex items-center gap-2 flex-col">
                            {n.unread && (
                              <Button
                                onClick={() => handleMarkAsRead(n.id)}
                                variant="custom"
                                className="text-primary-cyan border border-primary-cyan hover:bg-cyan-100 hover:scale-104"
                                size="sm"
                                title="Mark as read">
                                <LuMailOpen />
                              </Button>
                            )}
                            <Button
                              onClick={() => handleDismiss(n.id)}
                              variant="danger"
                              size="sm"
                              title="Dismiss notification">
                              <LuTrash />
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

export default NotificationPanel;
