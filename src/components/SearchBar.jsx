import React, { useState, useContext, useEffect } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import { AppContext } from '../context/AppProvider';

export default function SearchBar() {
  const [filter, setFilter] = useState('');
  const [inputFilter, setInputFilter] = useState('');
  const { recipes, setRecipes, isVisible } = useContext(AppContext);

  const history = useHistory();
  const location = useLocation();

  const fetchMeals = async () => {
    let url = '';

    if (filter === 'ingredient') {
      url = `https://www.themealdb.com/api/json/v1/1/filter.php?i=${inputFilter}`;
    }
    if (filter === 'name') {
      url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${inputFilter}`;
    }
    if (filter === 'firstLetter') {
      url = `https://www.themealdb.com/api/json/v1/1/search.php?f=${inputFilter}`;
    }

    if (filter === 'firstLetter' && inputFilter.length > 1) {
      global.alert('Your search must have only 1 (one) character');
      return;
    }

    const response = await fetch(url);
    const data = await response.json();

    if (data.meals !== null) {
      const maxArrayLength = 12;
      const updatedRecipe = data.meals.slice(0, maxArrayLength);

      setRecipes(updatedRecipe);
      return;
    }

    global.alert('Sorry, we haven\'t found any recipes for these filters.');
  };

  const fetchDrinks = async () => {
    let url = '';

    if (filter === 'ingredient') {
      url = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${inputFilter}`;
    }
    if (filter === 'name') {
      url = `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${inputFilter}`;
    }
    if (filter === 'firstLetter') {
      url = `https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${inputFilter}`;
    }

    if (filter === 'firstLetter' && inputFilter.length > 1) {
      global.alert('Your search must have only 1 (one) character');
      return;
    }

    const response = await fetch(url);
    const data = await response.json();

    if (data.drinks !== null) {
      const maxArrayLength = 12;
      const updatedRecipe = data.drinks.slice(0, maxArrayLength);

      setRecipes(updatedRecipe);
      return;
    }

    global.alert('Sorry, we haven\'t found any recipes for these filters.');
  };

  const fetchByFilter = async () => {
    if (location.pathname === '/meals') {
      fetchMeals();
    }
    if (location.pathname === '/drinks') {
      fetchDrinks();
    }
  };

  useEffect(() => {
    if (recipes === null) return;

    if (recipes.length === 1) {
      const { idMeal, idDrink } = recipes[0];
      if (idMeal) {
        history.push(`/meals/${idMeal}`);
      } else {
        history.push(`/drinks/${idDrink}`);
      }
    }
  }, [recipes, history]);

  return (
    <div>
      {isVisible
        && <input
          type="text"
          value={ inputFilter }
          data-testid="search-input"
          onChange={ ({ target }) => setInputFilter(target.value) }
        /> }
      <label>
        Ingredient
        <input
          type="radio"
          name="filter"
          value="ingredient"
          data-testid="ingredient-search-radio"
          onChange={ ({ target }) => setFilter(target.value) }
        />
      </label>
      <label>
        Name
        <input
          type="radio"
          name="filter"
          value="name"
          data-testid="name-search-radio"
          onChange={ ({ target }) => setFilter(target.value) }
        />
      </label>
      <label>
        First letter
        <input
          type="radio"
          name="filter"
          value="firstLetter"
          data-testid="first-letter-search-radio"
          onChange={ ({ target }) => setFilter(target.value) }
        />
      </label>
      <button
        data-testid="exec-search-btn"
        onClick={ fetchByFilter }
        name="search-btn"
      >
        Search
      </button>
    </div>
  );
}
