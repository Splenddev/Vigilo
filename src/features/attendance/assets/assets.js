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
