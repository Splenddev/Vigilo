import React from 'react';
import { FaIcons } from 'react-icons/fa';

const Grid = ({ children, baseText, className, baseIcon: Icon }) => {
  return (
    <div className="flex items-center text-sm text-gray-900">
      {Icon ? <Icon className="w-4 h-4 text-gray-400 mr-2" /> : <FaIcons />}
      <div>
        <div>{baseText}</div>
        <div className="flex items-center text-xs text-gray-500 mt-1 gap-2">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Grid;
