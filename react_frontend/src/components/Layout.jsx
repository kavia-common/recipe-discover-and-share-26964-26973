import React from 'react';
import Navbar from './Navbar';

/**
 * PUBLIC_INTERFACE
 * Layout wraps all pages with the top navigation and a content container.
 */
const Layout = ({ children }) => {
  return (
    <div>
      <Navbar />
      <main className="container" style={{ paddingTop: 24, paddingBottom: 40 }}>
        {children}
      </main>
    </div>
  );
};

export default Layout;
