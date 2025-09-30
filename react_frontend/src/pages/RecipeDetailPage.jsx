import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { fetchRecipe } from '../services/api';
import { useFavorites } from '../state/FavoritesContext';

/**
 * PUBLIC_INTERFACE
 * RecipeDetailPage renders a single recipe's details from the API mock.
 */
const RecipeDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isFavorite, toggleFavorite } = useFavorites();
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const ctrl = new AbortController();
    setLoading(true);
    fetchRecipe(id, { signal: ctrl.signal })
      .then((data) => setRecipe(data))
      .finally(() => setLoading(false));
    return () => ctrl.abort();
  }, [id]);

  if (loading) {
    return <div className="card" style={{ padding: 24 }}>Loading recipe...</div>;
  }

  if (!recipe) {
    return (
      <div className="card" style={{ padding: 24 }}>
        <div style={{ fontWeight: 700, marginBottom: 8 }}>Recipe not found</div>
        <button className="btn" onClick={() => navigate(-1)}>Go back</button>
      </div>
    );
  }

  const favorite = isFavorite(recipe.id);

  return (
    <article className="card" style={{ overflow: 'hidden' }}>
      <div style={{
        position: 'relative',
        width: '100%',
        minHeight: 260,
        background: 'linear-gradient(135deg, rgba(37,99,235,0.12), rgba(245,158,11,0.1))',
        borderBottom: '1px solid var(--color-border)'
      }}>
        {recipe.image && (
          <img src={recipe.image} alt={recipe.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        )}
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.35), rgba(0,0,0,0.0))' }} />
        <div className="container" style={{ position: 'absolute', bottom: 16, left: 0, right: 0, color: 'white' }}>
          <div className="badge" style={{ background: 'rgba(255,255,255,0.2)', borderColor: 'rgba(255,255,255,0.4)', color: 'white' }}>
            {recipe.cuisine}
          </div>
          <h1 style={{ margin: '8px 0 0' }}>{recipe.title}</h1>
        </div>
        <div className="container" style={{ position: 'absolute', top: 16, left: 0, right: 0, display: 'flex', justifyContent: 'space-between' }}>
          <Link to="/" className="btn" style={{ background: 'rgba(255,255,255,0.9)', color: 'var(--color-text)' }}>← Back</Link>
          <button
            className="btn"
            onClick={() => toggleFavorite(recipe)}
            style={{ background: favorite ? 'var(--color-secondary)' : 'rgba(255,255,255,0.95)', color: favorite ? '#fff' : 'var(--color-text)' }}
          >
            {favorite ? '★ Saved' : '☆ Favorite'}
          </button>
        </div>
      </div>

      <div className="container" style={{ padding: 16, display: 'grid', gap: 18 }}>
        <section className="card" style={{ padding: 16 }}>
          <h3 style={{ marginTop: 0 }}>About</h3>
          <p className="text-muted" style={{ marginTop: 8 }}>{recipe.description}</p>
          <div style={{ display: 'flex', gap: 8, marginTop: 8 }}>
            {recipe.time && <span className="badge">⏱ {recipe.time} min</span>}
          </div>
        </section>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: 16 }}>
          <section className="card" style={{ padding: 16 }}>
            <h3 style={{ marginTop: 0 }}>Ingredients</h3>
            <ul style={{ margin: 0, paddingLeft: 18 }}>
              {recipe.ingredients?.map((i) => <li key={i} style={{ marginBottom: 6 }}>{i}</li>)}
            </ul>
          </section>

          <section className="card" style={{ padding: 16 }}>
            <h3 style={{ marginTop: 0 }}>Steps</h3>
            <ol style={{ margin: 0, paddingLeft: 18 }}>
              {recipe.steps?.map((s, idx) => <li key={idx} style={{ marginBottom: 8 }}>{s}</li>)}
            </ol>
          </section>
        </div>
      </div>
    </article>
  );
};

export default RecipeDetailPage;
