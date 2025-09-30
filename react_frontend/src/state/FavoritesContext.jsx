import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';

const FavoritesContext = createContext();

/**
 * PUBLIC_INTERFACE
 * useFavorites provides helpers to interact with the favorites store.
 */
export const useFavorites = () => useContext(FavoritesContext);

/**
 * PUBLIC_INTERFACE
 * FavoritesProvider wraps the app and manages favorites state with localStorage persistence.
 */
export const FavoritesProvider = ({ children }) => {
  const [favorites, setFavorites] = useState(() => {
    try {
      const raw = localStorage.getItem('favorites');
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('favorites', JSON.stringify(favorites));
    } catch {
      // ignore storage errors
    }
  }, [favorites]);

  const isFavorite = (id) => favorites.some((f) => f.id === id);

  const toggleFavorite = (recipe) => {
    setFavorites((prev) => {
      if (prev.some((r) => r.id === recipe.id)) {
        return prev.filter((r) => r.id !== recipe.id);
      }
      return [...prev, recipe];
    });
  };

  const clearFavorites = () => setFavorites([]);

  const value = useMemo(() => ({
    favorites, isFavorite, toggleFavorite, clearFavorites
  }), [favorites]);

  return (
    <FavoritesContext.Provider value={value}>
      {children}
    </FavoritesContext.Provider>
  );
};
