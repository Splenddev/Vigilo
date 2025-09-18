import {
  LuBell,
  LuClock,
  LuTriangleAlert,
  LuClockAlert,
  LuCircleCheck,
  LuUserPlus,
  LuX,
  LuMailOpen,
  LuBookOpen,
  LuCalendarDays,
  LuFileText,
  LuGraduationCap,
  LuCircleAlert,
  LuSettings,
  LuMegaphone,
} from 'react-icons/lu';

export const typeConfig = {
  // Academic notifications
  assignment_created: {
    icon: LuBookOpen,
    color: 'bg-blue-500',
    label: 'Assignment',
  },
  assignment_due: {
    icon: LuClockAlert,
    color: 'bg-orange-500',
    label: 'Due Soon',
  },
  assignment_graded: {
    icon: LuCircleCheck,
    color: 'bg-green-500',
    label: 'Graded',
  },
  attendance_marked: {
    icon: LuCircleCheck,
    color: 'bg-green-500',
    label: 'Attendance',
  },
  attendance_reminder: {
    icon: LuClock,
    color: 'bg-yellow-500 text-yellow-900',
    label: 'Reminder',
  },
  exam_scheduled: {
    icon: LuCalendarDays,
    color: 'bg-purple-500',
    label: 'Exam',
  },
  grade_published: {
    icon: LuGraduationCap,
    color: 'bg-green-500',
    label: 'Grade',
  },
  course_update: { icon: LuFileText, color: 'bg-blue-500', label: 'Update' },
  lecture_cancelled: {
    icon: LuCircleAlert,
    color: 'bg-red-500',
    label: 'Cancelled',
  },
  lecture_rescheduled: {
    icon: LuCalendarDays,
    color: 'bg-orange-500',
    label: 'Rescheduled',
  },

  // Administrative notifications
  enrollment_approved: {
    icon: LuCircleCheck,
    color: 'bg-green-500',
    label: 'Approved',
  },
  enrollment_rejected: { icon: LuX, color: 'bg-red-500', label: 'Rejected' },
  payment_due: {
    icon: LuClockAlert,
    color: 'bg-red-500',
    label: 'Payment Due',
  },
  payment_received: {
    icon: LuCircleCheck,
    color: 'bg-green-500',
    label: 'Payment',
  },

  // System notifications
  system_maintenance: {
    icon: LuSettings,
    color: 'bg-gray-500',
    label: 'Maintenance',
  },
  feature_update: {
    icon: LuMegaphone,
    color: 'bg-blue-500',
    label: 'Update',
  },
  security_alert: {
    icon: LuTriangleAlert,
    color: 'bg-red-500',
    label: 'Security',
  },

  // Social notifications
  group_invitation: {
    icon: LuUserPlus,
    color: 'bg-purple-500',
    label: 'Invitation',
  },
  message_received: {
    icon: LuMailOpen,
    color: 'bg-blue-500',
    label: 'Message',
  },
  mention: { icon: LuBell, color: 'bg-orange-500', label: 'Mention' },

  // Emergency notifications
  urgent_announcement: {
    icon: LuMegaphone,
    color: 'bg-red-500',
    label: 'Urgent',
  },
  emergency_alert: {
    icon: LuTriangleAlert,
    color: 'bg-red-600',
    label: 'Emergency',
  },

  // Default
  default: { icon: LuBell, color: 'bg-gray-500', label: 'Notification' },
};

export const notificationCategories = ({ notifications = [] }) => {
  return [
    { value: 'all', label: 'All', count: notifications.length },
    {
      value: 'academic',
      label: 'Academic',
      count: notifications.filter((n) => n.category === 'academic').length,
    },
    {
      value: 'administrative',
      label: 'Admin',
      count: notifications.filter((n) => n.category === 'administrative')
        .length,
    },
    {
      value: 'system',
      label: 'System',
      count: notifications.filter((n) => n.category === 'system').length,
    },
    {
      value: 'social',
      label: 'Social',
      count: notifications.filter((n) => n.category === 'social').length,
    },
    {
      value: 'emergency',
      label: 'Emergency',
      count: notifications.filter((n) => n.category === 'emergency').length,
    },
  ];
};
