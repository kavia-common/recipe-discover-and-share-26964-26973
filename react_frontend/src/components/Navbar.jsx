import React from 'react';
import { Link, useLocation } from 'react-router-dom';

/**
 * PUBLIC_INTERFACE
 * Navbar shows the brand and main navigation links.
 */
const Navbar = () => {
  const location = useLocation();
  const isActive = (path) => location.pathname === path;

  return (
    <header
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 40,
        background: 'var(--color-surface)',
        borderBottom: '1px solid var(--color-border)',
        boxShadow: 'var(--shadow-sm)',
      }}
    >
      <div className="container" style={{ display: 'flex', alignItems: 'center', gap: 16, padding: '14px 0' }}>
        <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{
            width: 36, height: 36, borderRadius: 10,
            background: 'var(--gradient-soft)', border: '1px solid var(--color-border)',
            display: 'grid', placeItems: 'center'
          }}>
            <span role="img" aria-label="logo">🍳</span>
          </div>
          <div>
            <div style={{ fontWeight: 800, letterSpacing: 0.3, color: 'var(--color-text)' }}>
              Ocean Recipes
            </div>
            <div style={{ fontSize: 12, color: 'var(--color-text-muted)' }}>
              Discover • Cook • Share
            </div>
          </div>
        </Link>

        <nav style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 6 }}>
          <Link
            to="/"
            className="btn ghost"
            style={{
              padding: '8px 12px',
              ...(isActive('/') ? { borderColor: 'var(--color-primary-500)', color: 'var(--color-primary)' } : {})
            }}
          >
            Browse
          </Link>
          <Link
            to="/favorites"
            className="btn ghost"
            style={{
              padding: '8px 12px',
              ...(isActive('/favorites') ? { borderColor: 'var(--color-secondary-600)', color: 'var(--color-secondary-600)' } : {})
            }}
          >
            ★ Favorites
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
