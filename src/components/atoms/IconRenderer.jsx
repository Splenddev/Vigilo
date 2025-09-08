import React from 'react';

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

export default IconRenderer;
