import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './theme.css';
import './index.css';
import Layout from './components/Layout';
import HomePage from './pages/HomePage';
import FavoritesPage from './pages/FavoritesPage';
import RecipeDetailPage from './pages/RecipeDetailPage';

/**
 * PUBLIC_INTERFACE
 * App is the root component that sets up routing and global layout.
 * Routes:
 * - /            -> HomePage (browse/search)
 * - /favorites   -> FavoritesPage
 * - /recipe/:id  -> RecipeDetailPage
 */
function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route index element={<HomePage />} />
          <Route path="/favorites" element={<FavoritesPage />} />
          <Route path="/recipe/:id" element={<RecipeDetailPage />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
