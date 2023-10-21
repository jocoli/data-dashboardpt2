import { useState, useEffect } from 'react'
import './App.css'

const ACCESS_KEY = import.meta.env.VITE_APP_ACCESS_KEY;

function App() {
  
  const [list, setList] = useState([])
  const [hasQuery, setQuery] = useState('')
  const [hasCuisine, setCuisine] = useState('')
  const [excludeCuisine, setExclude] = useState('')

  useEffect(() => {
    const fetchAllRecipeData = async () => {
      let apiUrl = `https://api.spoonacular.com/recipes/complexSearch?apiKey=${ACCESS_KEY}`;

      if (hasQuery){
        apiUrl += `&query=${hasQuery}`;
      }
      if(hasCuisine){
        apiUrl += `&cuisine=${hasCuisine}`;
      }
      if (excludeCuisine){
        apiUrl += `&excludeCuisine=${excludeCuisine}`;
      }
      const response = await fetch(apiUrl);
      const json = await response.json();
      setList(json.results);
    };

    fetchAllRecipeData().catch(console.error);
  }, [hasQuery, hasCuisine, excludeCuisine]);

  const handleQueryChange = (e) => {
    setQuery(e.target.value);
  };

  const handleCuisineChange = (e) => {
    setCuisine(e.target.value);
  };

  const handleExcludeChange = (e) => {
    setExclude(e.target.value);
  };

  return (
    <div>
      <h1>My Recipe List</h1>
      <div className='container'>
        <h3>Number of items:</h3>
        <h5>10</h5>
      </div>
      <div className='container'>
        <h3>Query:</h3>
        <h5>{hasQuery}</h5>
      </div>
      <div className='container'>
        <h3>Cuisine:</h3>
        <h5>{hasCuisine}</h5>
      </div>
      <div>
        <input 
          type="text"
          id='query'
          value={hasQuery}
          placeholder='Input a Query. Ex. pasta'
          onChange={handleQueryChange} 
        />
      </div>
      <div>
        <input 
          type="text"
          id='cuisine'
          value={hasCuisine}
          placeholder='Input a cuisine. Ex. italian'
          onChange={handleCuisineChange}
        />
      </div>
      <div>
        <input 
        type="text"
        id='exclude'
        value={excludeCuisine}
        placeholder='Input a cuisine to exclude. Ex. italian'
        onChange={handleExcludeChange} 
        />
      </div>
        <ul>
          {list.map((recipe)=> (
            <li key={recipe.id}>{recipe.title}</li>
          ))}
        </ul>
    </div>
  )
}

export default App
