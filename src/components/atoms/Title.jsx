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
    xl: 'text-3xl',
    lg: 'text-2xl',
    md: 'text-xl',
    sm: 'text-lg',
    xm: 'text-md',
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
        ${alignClasses[align]} text-t-secondary 
        ${className}
      `}>
      {contents}
      {children && <div className="mt-5">{children}</div>}
    </h1>
  );
};

export default Title;
