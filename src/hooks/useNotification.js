import { useNotificationStore } from '../stores/notificationStore';

export function useNotifications() {
  const {
    notifications,
    loading = {
      fetching: false,
      deleting: false,
      deletingAll: false,
      markingRead: false,
      markingAllRead: false,
    },
    error,
    fetchNotifications,
    deleteNotification,
    deleteAllNotifications,
    markAsRead,
    markAllAsRead,
  } = useNotificationStore();

  return {
    notifications,
    error,
    loading,
    fetchNotifications,
    deleteNotification,
    deleteAllNotifications,
    markAsRead,
    markAllAsRead,
  };
}
