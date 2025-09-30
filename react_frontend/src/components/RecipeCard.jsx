import React from 'react';
import { Link } from 'react-router-dom';
import { useFavorites } from '../state/FavoritesContext';

/**
 * PUBLIC_INTERFACE
 * RecipeCard displays a preview of a recipe and provides a favorite toggle.
 */
const RecipeCard = ({ recipe }) => {
  const { isFavorite, toggleFavorite } = useFavorites();
  const favorite = isFavorite(recipe.id);

  return (
    <div className="card shadow-hover" style={{ overflow: 'hidden' }}>
      <div style={{
        position: 'relative',
        aspectRatio: '16/10',
        background: 'linear-gradient(135deg, rgba(37,99,235,0.12), rgba(245,158,11,0.1))',
        borderBottom: '1px solid var(--color-border)'
      }}>
        {recipe.image && (
          <img
            src={recipe.image}
            alt={recipe.title}
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
        )}
        <button
          type="button"
          className="btn"
          onClick={() => toggleFavorite(recipe)}
          aria-label={favorite ? 'Remove from favorites' : 'Add to favorites'}
          style={{
            position: 'absolute', top: 10, right: 10, padding: '8px 10px',
            background: favorite ? 'var(--color-secondary)' : 'rgba(255,255,255,0.95)',
            color: favorite ? '#fff' : 'var(--color-text)',
            borderColor: favorite ? 'rgba(245,158,11,0.25)' : 'var(--color-border)'
          }}
        >
          {favorite ? '★' : '☆'}
        </button>
      </div>

      <div style={{ padding: 14, display: 'grid', gap: 8 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
          <span className="badge">{recipe.cuisine}</span>
          {recipe.time && <span className="badge">⏱ {recipe.time} min</span>}
        </div>
        <h3 style={{ margin: 0, fontSize: 18, lineHeight: 1.3 }}>{recipe.title}</h3>
        <p className="text-muted" style={{ margin: 0, fontSize: 14 }}>
          {recipe.description}
        </p>
        <div style={{ display: 'flex', gap: 8, marginTop: 6 }}>
          <Link to={`/recipe/${recipe.id}`} className="btn" style={{ flex: 1, justifyContent: 'center' }}>
            View
          </Link>
          <button
            type="button"
            className="btn ghost"
            onClick={() => toggleFavorite(recipe)}
          >
            {favorite ? 'Remove' : 'Favorite'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default RecipeCard;
