import React, { useState } from 'react';

/**
 * PUBLIC_INTERFACE
 * SearchBar provides quick search inputs; emits onSearch with the current query.
 */
const SearchBar = ({ onSearch, initial = {} }) => {
  const [q, setQ] = useState(initial.q || '');
  const [ingredients, setIngredients] = useState(initial.ingredients || '');

  const submit = (e) => {
    e.preventDefault();
    onSearch({ q, ingredients });
  };

  return (
    <form onSubmit={submit} className="card" style={{ padding: 14, display: 'grid', gap: 10 }}>
      <div style={{ display: 'grid', gap: 10, gridTemplateColumns: '2fr 2fr auto' }}>
        <input
          className="input"
          placeholder="Search recipes (e.g., pasta, curry)..."
          value={q}
          onChange={(e) => setQ(e.target.value)}
        />
        <input
          className="input"
          placeholder="Ingredients (comma separated)"
          value={ingredients}
          onChange={(e) => setIngredients(e.target.value)}
        />
        <button type="submit" className="btn">Search</button>
      </div>
      <div className="text-muted" style={{ fontSize: 12 }}>
        Tip: Use ingredients to find recipes that match what you have (e.g., "tomato, basil, garlic").
      </div>
    </form>
  );
};

export default SearchBar;
