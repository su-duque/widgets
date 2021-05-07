// No se importa React, porque Solo se necesita cuando se está escribiendo JSX
// import React from 'react';

const Route = ({ path, children }) => {
  return window.location.pathname === path
    ? children // True
    : null; // False
};

export default Route;
