import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  LuBell,
  LuClock,
  LuTriangleAlert,
  LuCircleCheck,
  LuX,
  LuMailOpen,
  LuTrash,
  LuVideo,
  LuDownload,
  LuExternalLink,
  LuFilter,
  LuPin,
} from 'react-icons/lu';
import { initialNotifications } from '../../utils/data';
import {
  notificationCategories,
  typeConfig,
} from '../../utils/notificationsPanelUtils';
import Button from '../atoms/Button';
import EmptyState from './EmptyState';
import { useNavigate } from 'react-router-dom';

const NotificationPanel = () => {
  const [notifications, setNotifications] = useState(initialNotifications);
  const [showPanel, setShowPanel] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [showFilters, setShowFilters] = useState(false);
  const panelRef = useRef(null);

  const unreadCount = notifications.filter(
    (n) => !n.recipients[0].isRead
  ).length;

  const categories = notificationCategories(notifications).filter(
    (cat) => cat.count > 0 || cat.value === 'all'
  );

  const filteredNotifications =
    selectedCategory === 'all'
      ? notifications
      : notifications.filter((n) => n.category === selectedCategory);

  // Close panel on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (panelRef.current && !panelRef.current.contains(event.target)) {
        setShowPanel(false);
        setShowFilters(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const navigate = useNavigate();

  const handleNotificationClick = (notification) => {
    // Mark as read
    handleMarkAsRead(notification.id);

    // Handle different action types
    const { actionType, actionData } = notification.metadata;

    switch (actionType) {
      case 'navigate':
        console.log('Navigate to:', actionData.route);
        navigate(`/lecturer/${actionData.route}`);
        // router.push(actionData.route);
        break;
      case 'download':
        console.log('Download file:', actionData.fileUrl);
        // window.open(actionData.fileUrl);
        break;
      case 'approve':
        console.log('Show approval modal for:', actionData.entityId);
        break;
      case 'mark_attendance':
        console.log('Open attendance marking for:', actionData.route);
        break;
      case 'join_meeting':
        console.log('Join meeting:', actionData.meetingLink);
        // window.open(actionData.meetingLink);
        break;
      default:
        console.log('No action defined for this notification');
    }
  };

  const handleMarkAsRead = (id) => {
    setNotifications(
      notifications.map((n) =>
        n.id === id
          ? { ...n, recipients: [{ ...n.recipients[0], isRead: true }] }
          : n
      )
    );
  };

  const handleDismiss = (id) => {
    setNotifications(notifications.filter((n) => n.id !== id));
  };

  const handleMarkAllAsRead = () => {
    setNotifications(
      notifications.map((n) => ({
        ...n,
        recipients: [{ ...n.recipients[0], isRead: true }],
      }))
    );
  };

  const handleClearAll = () => {
    setNotifications([]);
  };

  const getPriorityBadge = (priority) => {
    const badges = {
      urgent: <LuPin className="w-3 h-3 text-red-500" />,
      high: <LuTriangleAlert className="w-3 h-3 text-orange-500" />,
      normal: null,
      low: null,
    };
    return badges[priority];
  };

  const getActionIcon = (actionType) => {
    const icons = {
      navigate: LuExternalLink,
      download: LuDownload,
      approve: LuCircleCheck,
      reject: LuX,
      mark_attendance: LuClock,
      join_meeting: LuVideo,
      none: null,
    };
    return icons[actionType];
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
        className="relative text-gray-700 hover:text-gray-600 rounded-full hover:bg-gray-100 p-2"
        icon={LuBell}>
        <AnimatePresence>
          {unreadCount > 0 && (
            <motion.span
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full min-w-5 h-5 flex items-center justify-center px-1">
              {unreadCount > 99 ? '99+' : unreadCount}
            </motion.span>
          )}
        </AnimatePresence>
      </Button>

      {/* Dropdown Panel */}
      <AnimatePresence>
        {showPanel && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="absolute -right-13 top-full mt-2 w-[95vw] max-w-[420px] rounded-2xl z-50 bg-white dark:bg-gray-800 shadow-2xl overflow-hidden border border-gray-200 dark:border-gray-700">
            {/* Header */}
            <header className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50">
              <div className="flex items-center gap-3">
                <h3 className="text-lg font-bold text-gray-800 dark:text-gray-100">
                  Notifications
                </h3>
                {unreadCount > 0 && (
                  <span className="bg-red-100 text-red-800 text-xs font-medium px-2 py-1 rounded-full">
                    {unreadCount} new
                  </span>
                )}
              </div>
              <div className="flex items-center gap-2">
                <Button
                  onClick={() => setShowFilters(!showFilters)}
                  variant="ghost"
                  size="sm"
                  className="!p-2"
                  title="Filter notifications">
                  <LuFilter />
                </Button>
                <Button
                  onClick={() => setShowPanel(false)}
                  variant="ghost"
                  size="sm"
                  className="!p-2">
                  <LuX />
                </Button>
              </div>
            </header>

            {/* Category Filter */}
            <AnimatePresence>
              {showFilters && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50 p-3">
                  <div className="flex flex-wrap gap-2">
                    {categories.map((category) => (
                      <button
                        key={category.value}
                        onClick={() => setSelectedCategory(category.value)}
                        className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                          selectedCategory === category.value
                            ? 'bg-blue-500 text-white'
                            : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                        }`}>
                        {category.label}{' '}
                        {category.count > 0 && `(${category.count})`}
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Notification List */}
            {filteredNotifications.length === 0 && (
              <EmptyState
                icon={LuCircleCheck}
                title="All caught up!"
                message={
                  selectedCategory === 'all'
                    ? 'You have no new notifications'
                    : `No ${selectedCategory} notifications`
                }
              />
            )}

            <div className="max-h-96 overflow-y-auto overflow-x-hidden">
              {filteredNotifications.length > 0 && (
                <ul className="divide-y divide-gray-200 dark:divide-gray-700">
                  {filteredNotifications.map((notification) => {
                    const config =
                      typeConfig[notification.type] || typeConfig.default;
                    const isUnread = !notification.recipients[0].isRead;
                    const ActionIcon = getActionIcon(
                      notification.metadata.actionType
                    );

                    return (
                      <motion.li
                        key={notification.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{
                          opacity: 0,
                          x: 20,
                          transition: { duration: 0.2 },
                        }}
                        className={`group relative transition-colors hover:bg-gray-50 dark:hover:bg-gray-700/50 ${
                          isUnread ? 'bg-blue-50 dark:bg-blue-900/20' : ''
                        }`}>
                        {/* Clickable notification area */}
                        <div
                          className="p-4 cursor-pointer"
                          onClick={() => handleNotificationClick(notification)}>
                          <div className="flex items-start gap-3">
                            {/* Icon */}
                            <div
                              className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center text-white text-sm relative ${config.color}`}>
                              <config.icon />
                              {getPriorityBadge(
                                notification.metadata.priority
                              ) && (
                                <div className="absolute -top-1 -right-1 bg-white rounded-full p-0.5">
                                  {getPriorityBadge(
                                    notification.metadata.priority
                                  )}
                                </div>
                              )}
                            </div>

                            {/* Content */}
                            <div className="flex-1 min-w-0">
                              <div className="flex items-start justify-between gap-2 mb-1">
                                <h4
                                  className={`text-sm font-medium ${
                                    isUnread
                                      ? 'text-gray-900 dark:text-gray-100'
                                      : 'text-gray-700 dark:text-gray-300'
                                  }`}>
                                  {notification.title}
                                </h4>
                                {ActionIcon && (
                                  <ActionIcon className="w-4 h-4 text-gray-400 flex-shrink-0" />
                                )}
                              </div>
                              <p className="text-sm text-gray-600 dark:text-gray-400 mb-2 line-clamp-2">
                                {notification.message}
                              </p>
                              <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2 text-xs text-gray-500">
                                  <span>{notification.time}</span>
                                  {notification.sender?.name && (
                                    <>
                                      <span>•</span>
                                      <span>{notification.sender.name}</span>
                                    </>
                                  )}
                                  {notification.groupId?.code && (
                                    <>
                                      <span>•</span>
                                      <span className="bg-gray-100 dark:bg-gray-700 px-2 py-0.5 rounded">
                                        {notification.groupId.code}
                                      </span>
                                    </>
                                  )}
                                </div>
                                {isUnread && (
                                  <div className="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0"></div>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Action buttons - show on hover */}
                        <div className="absolute top-2 right-2 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                          {isUnread && (
                            <Button
                              onClick={(e) => {
                                e.stopPropagation();
                                handleMarkAsRead(notification.id);
                              }}
                              variant="custom"
                              className="text-blue-600 border border-blue-200 hover:bg-blue-50 bg-white shadow-sm"
                              size="sm"
                              title="Mark as read">
                              <LuMailOpen />
                            </Button>
                          )}
                          <Button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleDismiss(notification.id);
                            }}
                            variant="dangerLight"
                            className="bg-white shadow-sm"
                            size="sm"
                            title="Dismiss notification">
                            <LuTrash />
                          </Button>
                        </div>
                      </motion.li>
                    );
                  })}
                </ul>
              )}
            </div>

            {/* Footer */}
            {filteredNotifications.length > 0 && (
              <footer className="p-3 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50 flex justify-between items-center">
                <Button
                  onClick={handleMarkAllAsRead}
                  variant="secondary"
                  size="sm"
                  className="flex items-center gap-1">
                  <LuMailOpen className="w-4 h-4" />
                  Mark all read
                </Button>
                <Button
                  onClick={handleClearAll}
                  variant="dangerLight"
                  size="sm"
                  className="flex items-center gap-1">
                  <LuTrash className="w-4 h-4" />
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
