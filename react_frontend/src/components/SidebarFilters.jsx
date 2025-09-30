import React, { useMemo } from 'react';

/**
 * PUBLIC_INTERFACE
 * SidebarFilters displays filtering controls for cuisine and ingredients.
 */
const SidebarFilters = ({ cuisines, ingredients, selectedCuisine, setSelectedCuisine, selectedIngredients, setSelectedIngredients, onClear }) => {
  const sortedCuisines = useMemo(() => ['All', ...[...cuisines].sort()], [cuisines]);
  const sortedIngredients = useMemo(() => [...ingredients].sort(), [ingredients]);

  const toggleIngredient = (ing) => {
    if (selectedIngredients.includes(ing)) {
      setSelectedIngredients(selectedIngredients.filter(i => i !== ing));
    } else {
      setSelectedIngredients([...selectedIngredients, ing]);
    }
  };

  return (
    <aside className="card" style={{ padding: 16, height: 'fit-content' }}>
      <div style={{ marginBottom: 12 }}>
        <h3 style={{ margin: 0, fontSize: 16 }}>Filters</h3>
        <p className="text-muted" style={{ margin: 0, fontSize: 13 }}>Refine your search</p>
      </div>
      <div className="hr" style={{ margin: '10px 0 16px' }} />

      <div style={{ marginBottom: 16 }}>
        <label style={{ fontWeight: 600, fontSize: 13, display: 'block', marginBottom: 8 }}>Cuisine</label>
        <select
          className="select"
          value={selectedCuisine || 'All'}
          onChange={(e) => setSelectedCuisine(e.target.value === 'All' ? '' : e.target.value)}
        >
          {sortedCuisines.map(c => (<option key={c} value={c}>{c}</option>))}
        </select>
      </div>

      <div>
        <label style={{ fontWeight: 600, fontSize: 13, display: 'block', marginBottom: 8 }}>Ingredients</label>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
          {sortedIngredients.map(ing => {
            const active = selectedIngredients.includes(ing);
            return (
              <button
                key={ing}
                type="button"
                className="badge"
                onClick={() => toggleIngredient(ing)}
                style={{
                  borderColor: active ? 'var(--color-secondary)' : undefined,
                  background: active ? 'var(--color-secondary-50)' : undefined,
                  color: active ? 'var(--color-secondary-600)' : undefined
                }}
              >
                {active ? '✓' : '+'} {ing}
              </button>
            );
          })}
        </div>
      </div>

      <button
        type="button"
        className="btn ghost"
        onClick={onClear}
        style={{ marginTop: 16, width: '100%' }}
      >
        Clear filters
      </button>
    </aside>
  );
};

export default SidebarFilters;
