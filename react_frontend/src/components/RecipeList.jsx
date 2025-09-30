import React from 'react';
import RecipeCard from './RecipeCard';

/**
 * PUBLIC_INTERFACE
 * RecipeList renders a grid of RecipeCard components.
 */
const RecipeList = ({ recipes }) => {
  if (!recipes?.length) {
    return (
      <div className="card" style={{ padding: 24, textAlign: 'center' }}>
        <div style={{ fontSize: 22, marginBottom: 8 }}>No recipes found</div>
        <div className="text-muted">Try adjusting your search or filters.</div>
      </div>
    );
  }
  return (
    <div className="grid grid-3">
      {recipes.map(r => <RecipeCard key={r.id} recipe={r} />)}
    </div>
  );
};

export default RecipeList;
