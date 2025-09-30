/**
 * PUBLIC_INTERFACE
 * fetchRecipes retrieves recipes from the backend. This mock simulates API data.
 * Params:
 *  - query: { q?: string, ingredients?: string, cuisine?: string }
 *  - signal?: AbortSignal
 * Returns: Promise<{ items: Recipe[], total: number }>
 *
 * Replace BASE_URL and endpoints when backend is ready.
 */
const BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:4000';

const MOCK_RECIPES = [
  {
    id: '1',
    title: 'Lemon Garlic Pasta',
    cuisine: 'Italian',
    time: 20,
    description: 'Bright and zesty pasta with a hint of garlic and parmesan.',
    ingredients: ['pasta', 'lemon', 'garlic', 'parmesan', 'olive oil'],
    steps: ['Boil pasta', 'Sauté garlic', 'Toss with lemon and oil', 'Finish with parmesan'],
    image: 'https://images.unsplash.com/photo-1521389508051-d7ffb5dc8bbf?q=80&w=1200&auto=format&fit=crop',
  },
  {
    id: '2',
    title: 'Chicken Tikka Masala',
    cuisine: 'Indian',
    time: 45,
    description: 'Creamy, spiced tomato sauce with tender chicken pieces.',
    ingredients: ['chicken', 'tomato', 'cream', 'garam masala', 'ginger', 'garlic'],
    steps: ['Marinate chicken', 'Sear and simmer', 'Add cream', 'Serve with rice'],
    image: 'https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=1200&auto=format&fit=crop',
  },
  {
    id: '3',
    title: 'Sushi Bowl',
    cuisine: 'Japanese',
    time: 25,
    description: 'Deconstructed sushi with rice, avocado, and salmon.',
    ingredients: ['rice', 'salmon', 'avocado', 'cucumber', 'soy sauce'],
    steps: ['Cook rice', 'Prep toppings', 'Assemble bowl', 'Drizzle sauce'],
    image: 'https://images.unsplash.com/photo-1562158070-634d0b86be0b?q=80&w=1200&auto=format&fit=crop',
  },
  {
    id: '4',
    title: 'Veggie Stir-fry',
    cuisine: 'Chinese',
    time: 15,
    description: 'Crisp vegetables tossed in a savory sauce.',
    ingredients: ['broccoli', 'bell pepper', 'soy sauce', 'garlic', 'ginger'],
    steps: ['Chop veggies', 'Stir-fry aromatics', 'Add veggies', 'Finish with sauce'],
    image: 'https://images.unsplash.com/photo-1543826173-70651703c5c1?q=80&w=1200&auto=format&fit=crop',
  },
  {
    id: '5',
    title: 'Churros with Chocolate',
    cuisine: 'Spanish',
    time: 30,
    description: 'Crispy churros dusted with sugar served with warm chocolate.',
    ingredients: ['flour', 'sugar', 'cinnamon', 'chocolate', 'butter', 'eggs'],
    steps: ['Make dough', 'Pipe and fry', 'Coat in sugar', 'Serve with chocolate'],
    image: 'https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?q=80&w=1200&auto=format&fit=crop',
  },
];

/**
 * Simple filter function to mimic backend-side filtering.
 */
function filterRecipes(items, { q, ingredients, cuisine }) {
  let result = items;
  if (q) {
    const s = q.toLowerCase();
    result = result.filter(r =>
      r.title.toLowerCase().includes(s) ||
      r.description.toLowerCase().includes(s) ||
      r.ingredients.some(i => i.toLowerCase().includes(s))
    );
  }
  if (ingredients) {
    const needles = ingredients.split(',').map(x => x.trim().toLowerCase()).filter(Boolean);
    if (needles.length) {
      result = result.filter(r => needles.every(n => r.ingredients.map(i => i.toLowerCase()).includes(n)));
    }
  }
  if (cuisine) {
    result = result.filter(r => r.cuisine.toLowerCase() === cuisine.toLowerCase());
  }
  return result;
}

export async function fetchRecipes(query = {}, { signal } = {}) {
  // Placeholder: Replace with real fetch when backend is available
  // Example:
  // const url = new URL(`${BASE_URL}/recipes`);
  // Object.entries(query).forEach(([k, v]) => v && url.searchParams.set(k, v));
  // const res = await fetch(url.toString(), { signal });
  // if (!res.ok) throw new Error('Failed to fetch recipes');
  // return res.json();

  // Mock:
  await new Promise(r => setTimeout(r, 260));
  const items = filterRecipes(MOCK_RECIPES, query);
  return { items, total: items.length };
}

/**
 * PUBLIC_INTERFACE
 * fetchRecipe retrieves a single recipe by ID. Mock for now.
 * Returns: Promise<Recipe | null>
 */
export async function fetchRecipe(id, { signal } = {}) {
  await new Promise(r => setTimeout(r, 180));
  return MOCK_RECIPES.find(r => r.id === id) || null;
}

/**
 * PUBLIC_INTERFACE
 * getFacetData returns cuisine and ingredient sets for filter UIs.
 * Returns: Promise<{ cuisines: Set<string>, ingredients: Set<string> }>
 */
export async function getFacetData() {
  await new Promise(r => setTimeout(r, 80));
  const cuisines = new Set(MOCK_RECIPES.map(r => r.cuisine));
  const ingredients = new Set(MOCK_RECIPES.flatMap(r => r.ingredients));
  return { cuisines, ingredients };
}

export { BASE_URL };
