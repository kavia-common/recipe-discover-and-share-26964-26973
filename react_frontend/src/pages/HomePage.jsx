import React, { useEffect, useMemo, useState } from 'react';
import SearchBar from '../components/SearchBar';
import SidebarFilters from '../components/SidebarFilters';
import RecipeList from '../components/RecipeList';
import { fetchRecipes, getFacetData } from '../services/api';

/**
 * PUBLIC_INTERFACE
 * HomePage allows browsing and searching recipes with filters.
 */
const HomePage = () => {
  const [facets, setFacets] = useState({ cuisines: new Set(), ingredients: new Set() });
  const [selectedCuisine, setSelectedCuisine] = useState('');
  const [selectedIngredients, setSelectedIngredients] = useState([]);
  const [query, setQuery] = useState({ q: '', ingredients: '' });
  const [loading, setLoading] = useState(false);
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    let mounted = true;
    getFacetData().then((data) => {
      if (mounted) setFacets(data);
    });
    return () => { mounted = false; };
  }, []);

  const effectiveQuery = useMemo(() => {
    const ingredientsFromTags = selectedIngredients.join(', ');
    const combinedIngredients = [ingredientsFromTags, query.ingredients].filter(Boolean).join(', ');
    return { ...query, ingredients: combinedIngredients, cuisine: selectedCuisine || undefined };
  }, [query, selectedIngredients, selectedCuisine]);

  useEffect(() => {
    const ctrl = new AbortController();
    setLoading(true);
    fetchRecipes(effectiveQuery, { signal: ctrl.signal })
      .then(({ items }) => setRecipes(items))
      .catch(() => {})
      .finally(() => setLoading(false));
    return () => ctrl.abort();
  }, [effectiveQuery]);

  const clearFilters = () => {
    setSelectedCuisine('');
    setSelectedIngredients([]);
    setQuery({ q: '', ingredients: '' });
  };

  return (
    <div className="layout" style={{ alignItems: 'start' }}>
      <SidebarFilters
        cuisines={facets.cuisines}
        ingredients={facets.ingredients}
        selectedCuisine={selectedCuisine}
        setSelectedCuisine={setSelectedCuisine}
        selectedIngredients={selectedIngredients}
        setSelectedIngredients={setSelectedIngredients}
        onClear={clearFilters}
      />
      <section style={{ display: 'grid', gap: 16 }}>
        <div className="card" style={{ padding: 18, background: 'var(--gradient-soft)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap' }}>
            <div style={{
              width: 42, height: 42, borderRadius: 12, display: 'grid', placeItems: 'center',
              border: '1px solid var(--color-border)', background: '#fff'
            }}>
              <span style={{ fontSize: 22 }}>🌊</span>
            </div>
            <div>
              <div style={{ fontWeight: 800, fontSize: 22 }}>Discover your next favorite recipe</div>
              <div className="text-muted">Browse by cuisine, search by ingredients, and save favorites.</div>
            </div>
          </div>
        </div>

        <SearchBar onSearch={setQuery} initial={query} />

        {loading ? (
          <div className="card" style={{ padding: 24, textAlign: 'center' }}>
            Loading recipes...
          </div>
        ) : (
          <RecipeList recipes={recipes} />
        )}
      </section>
    </div>
  );
};

export default HomePage;
