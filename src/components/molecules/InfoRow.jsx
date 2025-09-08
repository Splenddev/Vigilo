import { FaRegQuestionCircle } from 'react-icons/fa';
import React from 'react';

// Utility: safely render an icon component, function, or element
const IconRenderer = ({ icon: Icon, className = '' }) => {
  if (!Icon) return null;

  if (typeof Icon === 'function') {
    const element = Icon({ className });
    return React.isValidElement(element) ? (
      element
    ) : (
      <Icon className={className} />
    );
  }

  if (React.isValidElement(Icon)) {
    return React.cloneElement(Icon);
  }

  return null;
};

const InfoRow = ({
  label,
  subLabel = '',
  icon = FaRegQuestionCircle,
  children,
  className = '',
  iconClassName = '',
  align = 'start', // start | center | end
  labelClassName = '',
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
