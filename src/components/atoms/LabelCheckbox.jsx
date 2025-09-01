import React from 'react';
import { LuCheck } from 'react-icons/lu';

const LabelCheckbox = ({ name = '', onChange, checked, children, ...rest }) => {
  return (
    <label className="flex items-center cursor-pointer select-none relative">
      {/* Hidden native checkbox */}
      <input
        type="checkbox"
        name={name}
        checked={checked}
        onChange={onChange}
        className="v-hidden"
        {...rest}
      />

      {/* Custom checkbox */}
      <span
        className={`w-5 h-5 border-2 border-primary-pink rounded-2xl flex items-center ${
          checked && 'bg-primary-pink border-none'
        } justify-center
                 transition-colors`}>
        {checked && <LuCheck className="w-3 h-3 text-t-primary" />}
      </span>

      {/* Label text with links */}
      {children && (
        <span className="ml-2 text-sm text-gray-300">{children}</span>
      )}
    </label>
  );
};

export default LabelCheckbox;
