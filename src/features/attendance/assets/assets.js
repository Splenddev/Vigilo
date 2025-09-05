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
    className: 'text-red-400 hover:text-red-300 hover:bg-red-500/10',
  },
];

import {  FiDownload, FiXCircle, FiShare2 } from 'react-icons/fi';

export const sessionInfoDropdown = [
  {
    key: 'export',
    label: 'Export',
    icon: FiDownload,
    className: 'hover:bg-gray-100',
  },
  {
    key: 'share',
    label: 'Share Session',
    icon: FiShare2,
    className: 'hover:bg-gray-100',
  },
  {
    key: 'cancel',
    label: 'Cancel Session',
    icon: FiXCircle,
    className: 'text-red-400 hover:text-red-300 hover:bg-red-500/10',
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
