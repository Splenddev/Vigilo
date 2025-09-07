import { LuEye, LuDownload, LuDoorClosed, LuPause } from 'react-icons/lu';
import { FiEdit3 } from 'react-icons/fi';

import { FiPlayCircle, FiCheckCircle } from 'react-icons/fi';

import { LuPlay } from 'react-icons/lu';

export const getSessionListDropdown = (status) => {
  const base = [{ key: 'view', icon: LuEye, label: 'View details' }];

  switch (status) {
    case 'scheduled':
      return [
        ...base,
        { key: 'edit', icon: FiEdit3, label: 'Edit session' },
        {
          key: 'start',
          icon: FiPlayCircle,
          label: 'Start session',
          variant: 'success',
        },
      ];

    case 'ongoing':
      return [
        ...base,
        {
          key: 'end',
          icon: LuDoorClosed,
          label: 'End session',
          variant: 'danger',
        },
        {
          key: 'pause',
          label: 'Pause session',
          variant: 'warning',
          icon: LuPause,
        },
      ];

    case 'paused':
      return [
        ...base,
        {
          key: 'resume',
          icon: LuPlay,
          label: 'Resume session',
          variant: 'success',
        },
        {
          key: 'end',
          icon: LuDoorClosed,
          label: 'End session',
          variant: 'danger',
        },
        {
          key: 'export',
          icon: LuDownload,
          label: 'Export data',
        },
      ];

    case 'completed':
      return [
        ...base,
        { key: 'export', icon: LuDownload, label: 'Export data' },
      ];

    default:
      return base;
  }
};

import { FiDownload, FiXCircle, FiShare2 } from 'react-icons/fi';

export const sessionInfoDropdown = [
  {
    key: 'export',
    label: 'Export',
    icon: FiDownload,
  },
  {
    key: 'share',
    label: 'Share Session',
    icon: FiShare2,
  },
  {
    key: 'cancel',
    label: 'Cancel Session',
    icon: FiXCircle,
    variant: 'danger',
  },
];

export const studentsFilters = ({ dpts, lvls }) => {
  return [
    {
      key: 'departments',
      label: 'Departments',
      type: 'multi',
      options: dpts,
    },
    {
      key: 'levels',
      label: 'Levels',
      type: 'multi',
      options: lvls,
    },
    {
      key: 'statuses',
      label: 'Status',
      type: 'multi',
      options: ['active', 'inactive'],
    },
    {
      key: 'attendanceRange',
      label: 'Attendance Range',
      type: 'range',
      min: 0,
      max: 100,
      default: [0, 100],
    },
    {
      key: 'absentRate',
      label: 'Absent Rate',
      type: 'range',
      min: 0,
      max: 100,
      default: [0, 100],
    },
  ];
};

export const badges = {
  present: 'success',
  absent: 'error',
  late: 'warning',
};
