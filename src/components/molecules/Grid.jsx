import { FaIcons } from 'react-icons/fa';

const Grid = ({
  children,
  baseText,
  containerStyle = ' text-sm text-gray-900',
  iconStyle = 'text-gray-400',
  baseIcon: Icon,
}) => {
  return (
    <div className={`flex items-center gap-2.5 ${containerStyle}`}>
      {Icon ? <Icon className={`w-4 h-4 ${iconStyle}`} /> : <FaIcons />}
      <div>
        <div>{baseText}</div>
        {children && (
          <div className="flex items-center text-xs text-gray-500 mt-1 gap-2">
            {children}
          </div>
        )}
      </div>
    </div>
  );
};

export default Grid;
