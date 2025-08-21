import React from 'react';

const Title = ({
  contents,
  children,
  level = 'xl', // "xl" | "lg" | "md"
  align = 'center', // "left" | "center" | "right"
  className = '',
}) => {
  // Map level to Tailwind config class
  const sizeClasses = {
    xl: 'text-heading-xl font-heading',
    lg: 'text-heading-lg font-heading',
    md: 'text-heading-md font-heading',
  };

  const alignClasses = {
    left: 'text-left',
    center: 'text-center',
    right: 'text-right',
  };

  return (
    <h1
      className={`${sizeClasses[level]} ${alignClasses[align]} mt-10 ${className}`}>
      {contents}
      {children && <div className="mt-5">{children}</div>}
    </h1>
  );
};

export default Title;
