import React from 'react';
import { Outlet } from 'react-router-dom';

const App = () => {
  return (
    <div className="bg-primary">
      <h1>Test</h1>
      <Outlet />
      <p className="text-center text-white mt-10">
        This is a simple React application using React Router.
      </p>
    </div>
  );
};
export default App;
