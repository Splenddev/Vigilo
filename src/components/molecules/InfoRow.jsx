import { FaRegQuestionCircle } from 'react-icons/fa';

const InfoRow = ({
  label,
  icon = FaRegQuestionCircle,
  children,
  className = '',
  iconClassName = '',
  align = 'start',
  labelClassName = '',
  text = 't-secondary',
  direction = 'col',
}) => {
  const Icon = icon;
  return (
    <div className={`flex gap-3 text-sm ${className} items-${align}`}>
      <Icon className={`text-xl shrink-0 text-${text} ${iconClassName}`} />
      <div className={`flex flex-${direction}`}>
        <span className={`${labelClassName}`}>{label}</span>
        {children && (
          <div className={`flex items-center text-xs text-t-tertiary ${direction==='col'?'mt-1':'ml-1'} gap-2`}>
            {children}
          </div>
        )}
      </div>
    </div>
  );
};

export default InfoRow;
