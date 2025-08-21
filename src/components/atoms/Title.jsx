import React from 'react';

const Title = ({
  contents,
  children,
  level = 'xl', // "xl" | "lg" | "md"
  align = 'center', // "left" | "center" | "right"
  className = '',
}) => {
  // Map level to Tailwind text tokens (defined in @theme)
  const sizeClasses = {
    xl: 'text-heading-xl',
    lg: 'text-heading-lg',
    md: 'text-heading-md',
  };

  const alignClasses = {
    left: 'text-left',
    center: 'text-center',
    right: 'text-right',
  };

  return (
    <h1
      className={`
        ${sizeClasses[level]} 
        ${alignClasses[align]} 
        ${className}
      `}>
      {contents}
      {children && <div className="mt-5">{children}</div>}
    </h1>
  );
};

export default Title;
