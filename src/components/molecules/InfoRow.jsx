import { FaRegQuestionCircle } from 'react-icons/fa';

const InfoRow = ({
  label,
  icon = FaRegQuestionCircle,
  children,
  className = '',
  iconClassName = '',
  align = 'start',
}) => {
  const Icon = icon;
  return (
    <div className={`flex gap-2.5 text-sm ${className} items-${align}`}>
      <Icon className={`text-xl shrink-0 text-gray-300 ${iconClassName}`} />
      <div>
        <span>{label}</span>
        {children && (
          <div className="flex items-center text-xs text-gray-500 mt-1 gap-2">
            {children}
          </div>
        )}
      </div>
    </div>
  );
};

export default InfoRow;
