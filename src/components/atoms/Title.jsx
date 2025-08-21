import React from 'react';

const Title = ({ contents, children }) => {
  return (
    <h1>
      <span className="text-3xl font-bold  text-center mt-10">{contents}</span>
      {children && <div className="mt-5">{children}</div>}
    </h1>
  );
};

export default Title;
