import React, { useState } from 'react';
import { LuPencil, LuCheck, LuX } from 'react-icons/lu';
import InfoRow from './InfoRow';

const EditableInfoRow = ({ label, icon: Icon, textColor, value, onChange }) => {
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(value || '');

  const handleSave = () => {
    onChange(draft.trim());
    setEditing(false);
  };

  const handleCancel = () => {
    setDraft(value || '');
    setEditing(false);
  };

  return (
    <InfoRow
      icon={Icon}
      label={label}
      textColor={textColor}>
      {!editing ? (
        <div className='flex items-center gap-2'>
          <p className='text-sm font-medium text-t-secondary'>{value || '—'}</p>
          <button
            type='button'
            onClick={() => setEditing(true)}
            className='text-xs text-blue-500 hover:underline flex items-center gap-1'>
            <LuPencil className='w-3 h-3' />
            Edit
          </button>
        </div>
      ) : (
        <div className='flex items-center gap-2'>
          <input
            type='text'
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            className='px-2 py-1 border rounded-md text-sm w-40 bg-bg-base'
            autoFocus
          />
          <button
            type='button'
            onClick={handleSave}
            className='p-1 text-green-500 hover:text-green-600'>
            <LuCheck className='w-4 h-4' />
          </button>
          <button
            type='button'
            onClick={handleCancel}
            className='p-1 text-red-500 hover:text-red-600'>
            <LuX className='w-4 h-4' />
          </button>
        </div>
      )}
    </InfoRow>
  );
};

export default EditableInfoRow;
