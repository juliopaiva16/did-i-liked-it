import React from 'react';
import './Layout.css';

const Layout = ({ children }) => (
  <div className="centered-layout">
    {children}
  </div>
);

export default Layout;
