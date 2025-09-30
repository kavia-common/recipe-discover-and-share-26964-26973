# Recipe Discovery Frontend (Ocean Professional)

This React app provides:
- Browse recipes in a responsive grid
- Search by keywords and ingredients
- Filter by cuisine and select ingredients
- View recipe details (ingredients, steps, time)
- Save favorites for quick access (localStorage)

Style: Ocean Professional (Blue #2563EB and Amber #F59E0B)
- Modern, minimal UI with subtle shadows and rounded corners
- Gradient accents (soft blue to gray)
- Clean layout: header navigation, sidebar filters, grid content

Project structure:
- src/components: Navbar, Layout, SearchBar, SidebarFilters, RecipeCard, RecipeList
- src/pages: HomePage, FavoritesPage, RecipeDetailPage
- src/state: FavoritesContext (global favorites store)
- src/services/api.js: API stubs (mock data) with fetchRecipes(), fetchRecipe(), getFacetData()

API integration:
- Replace functions in src/services/api.js with real fetch() calls to your backend (use REACT_APP_API_URL)
- All components already call these functions and accept AbortSignal for cancellation

Environment variables:
- Create a .env file in the project root (same level as package.json)
  REACT_APP_API_URL=https://your-backend-url

Run:
- npm start
- npm run build

Notes/Assumptions:
- Favorites are stored in localStorage until backend endpoints are provided.
- Recipe IDs are strings.
- Images use Unsplash placeholders in the mock.
- Accessibility: basic ARIA and keyboard-friendly controls included.
