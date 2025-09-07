import { LuEye, LuDownload, LuTrash2 } from 'react-icons/lu';
import { FiEdit3 } from 'react-icons/fi';

export const sessionListDropdown = [
  {
    key: 'view',
    icon: LuEye,
    label: 'view details',
  },
  {
    key: 'edit',
    icon: FiEdit3,
    label: 'edit session',
  },
  {
    key: 'export',
    icon: LuDownload,
    label: 'export data',
  },
  {
    key: 'delete',
    icon: LuTrash2,
    label: 'delete',
    variant: 'danger',
  },
];

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
