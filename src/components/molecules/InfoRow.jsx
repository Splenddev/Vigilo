import { FaRegQuestionCircle } from 'react-icons/fa';
import IconRenderer from '../atoms/IconRenderer';

const InfoRow = ({
  label,
  subLabel = '',
  icon = FaRegQuestionCircle,
  children,
  className = '',
  iconClassName = '',
  align = 'start',
  labelClassName = 'text-gray-400',
  iconSize = 'text-xl',
  textColor = 'text-t-secondary',
  direction = 'col',
  iconPosition = 'left',
}) => {
  // Map align to Tailwind class
  const alignClass =
    {
      start: 'items-start',
      center: 'items-center',
      end: 'items-end',
    }[align] || 'items-start';

  // Map direction to Tailwind class
  const directionClass = direction === 'row' ? 'flex-row' : 'flex-col';

  return (
    <div className={`flex gap-3 text-sm ${className} ${alignClass}`}>
      {iconPosition === 'left' && (
        <IconRenderer
          icon={icon}
          className={`${iconSize} shrink-0 ${textColor} ${iconClassName}`}
        />
      )}

      <div className={`flex ${directionClass}`}>
        <span className={`${labelClassName}`}>{label}</span>
        {children && (
          <div
            className={`flex items-center text-xs text-t-tertiary ${
              direction === 'col' ? 'mt-1' : 'ml-1'
            } gap-2`}>
            {children}
          </div>
        )}
        <p
          className={`text-sm text-t-secondary ${
            direction === 'col' ? 'mt-1' : 'ml-1'
          } ${subLabel ? '' : 'hidden'}`}>
          {subLabel}
        </p>
      </div>

      {iconPosition === 'right' && (
        <IconRenderer
          icon={icon}
          className={`${iconSize} shrink-0 ${textColor} ${iconClassName}`}
        />
      )}
    </div>
  );
};

export default InfoRow;
