import React, { useContext } from 'react';
import { AppContext } from '../context/AppProvider';
import SearchBar from '../components/SearchBar';
import Header from '../components/Header';

export default function Drinks() {
  const { recipes } = useContext(AppContext);
  return (
    <div>
      <Header />
      <SearchBar />
      {
        recipes.map((recipe, index) => (
          <div key={ index } data-testid={ `${index}-recipe-card` }>
            <h4 data-testid={ `${index}-card-name` }>{recipe.strMeal}</h4>
            <img
              src={ recipe.strMealThumb }
              alt={ recipe.strMeal }
              data-testid={ `${index}-card-img` }
            />
          </div>
        ))
      }
    </div>
  );
}
