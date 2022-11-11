import React, {useState, useEffect} from 'react';
import './App.css';
import Recipes from './components/Recipes';

const App = () => {
  const APP_ID = process.env.REACT_APP_API_ID;
  const APP_KEYS = process.env.REACT_APP_API_KEY;

  const [recipes, setRecipes] = useState([]);
  const [search, setSearch] = useState([]);
  const [query, setQuery] = useState('chicken');
  const [isLoading, setLoading] = useState(false);

  useEffect(()=> {
    runRecipe();
  }, [query])


  const runRecipe = async () => {
    try {
      setLoading(true)
      const respons = await fetch(`https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEYS}`);
      const data = await respons.json();
      setRecipes(data.hits);
      setSearch('');
      setLoading(false)
    } catch(error) {
      setLoading(false);
      alert('error')
    }
  }

  const runupdateSearch = (e) => {
    setSearch(e.target.value)
  }

  const runSearch = (e) => {
    e.preventDefault();
    if(search === '') {
      alert('The Field has not empty!!!');
      return
    } 
    setQuery(search)
  }

  return (
    <div className="App">
      <form onSubmit={runSearch} className="form_search">
        <input text="text" placeholder="Search..."
          value={search}
          onChange={runupdateSearch}
        />
        <button type="submit">Search</button>
      </form>

      <div className="row">
      
        { 
          isLoading ? 
            (<h1>Please a few minutes</h1>)
          : 
          (
            recipes.map((recipe, index) => (
              <Recipes 
                key={index}
                title={recipe.recipe.label}
                ingredients={recipe.recipe.ingredients}
                calories={recipe.recipe.calories}
                image={recipe.recipe.image}
              />
            )) 
          )        
        }
      </div>
    </div>
  );
}

export default App;
