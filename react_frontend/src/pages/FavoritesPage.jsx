import React from 'react';
import { useFavorites } from '../state/FavoritesContext';
import RecipeList from '../components/RecipeList';

/**
 * PUBLIC_INTERFACE
 * FavoritesPage shows the user's saved recipes.
 */
const FavoritesPage = () => {
  const { favorites, clearFavorites } = useFavorites();

  return (
    <div style={{ display: 'grid', gap: 16 }}>
      <div className="card" style={{ padding: 16, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div>
          <div style={{ fontWeight: 800, fontSize: 20 }}>Your Favorites</div>
          <div className="text-muted">{favorites.length} saved {favorites.length === 1 ? 'recipe' : 'recipes'}</div>
        </div>
        <button className="btn ghost" onClick={clearFavorites} disabled={!favorites.length}>
          Clear all
        </button>
      </div>
      <RecipeList recipes={favorites} />
    </div>
  );
};

export default FavoritesPage;
