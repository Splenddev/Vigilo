import { FaRegQuestionCircle } from 'react-icons/fa';

const InfoRow = ({
  label,
  icon = FaRegQuestionCircle,
  children,
  className = '',
  iconClassName = '',
}) => {
  const Icon = icon;
  return (
    <div
      className={`flex items-start gap-2.5 text-sm text-gray-900 ${className}`}>
      <Icon className={`text-xl text-gray-400 ${iconClassName}`} />
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
