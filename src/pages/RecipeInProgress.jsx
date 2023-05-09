import React, { useContext, useState } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import { AppContext } from '../context/AppProvider';
import shareIcon from '../images/shareIcon.svg';
import favoriteIcon from '../images/whiteHeartIcon.svg';
import favoriteIconBlack from '../images/blackHeartIcon.svg';

export default function RecipeInProgress() {
  const { recipe, setRecipe, ingredients, setIngredients } = useContext(AppContext);
  const [isFavorite, setIsFavorite] = useState(false);
  const [copied, setCopied] = useState(false);

  const location = useLocation();
  const history = useHistory();
  const recipeID = location.pathname.split('/')[2];
  const pathname = location.pathname.split('/')[1];

  const favorites = JSON.parse(localStorage.getItem('favoriteRecipes')) || [];

  const fetchByID = async () => {
    if (pathname === 'meals') {
      const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${recipeID}`;

      const response = await fetch(url);
      const data = await response.json();
      setRecipe(data.meals);

      const getIngredients = Object.keys(data.meals[0]).filter((item) => (
        item.includes('strIngredient')
              && data.meals[0][item] !== null && data.meals[0][item] !== ''
      ));
      setIngredients(getIngredients);
      return;
    }
    if (pathname === 'drinks') {
      const request = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${recipeID}`);
      const data = await request.json();
      setRecipe(data.drinks);

      const getIngredients = Object.keys(data.drinks[0]).filter((item) => (
        item.includes('strIngredient')
              && data.drinks[0][item] !== null && data.drinks[0][item] !== ''
      ));
      setIngredients(getIngredients);
    }
  };

  const favoriteRecipe = () => {
    if (pathname === 'meals') {
      const favorite = {
        id: recipe[0].idMeal,
        type: 'meal',
        nationality: recipe[0].strArea || '',
        category: recipe[0].strCategory,
        alcoholicOrNot: '',
        name: recipe[0].strMeal,
        image: recipe[0].strMealThumb,
      };
      favorites.push(favorite);
      localStorage.setItem('favoriteRecipes', JSON.stringify(favorites));
      setIsFavorite(!isFavorite);
    }
    if (pathname === 'drinks') {
      const favorite = {
        id: recipe[0].idDrink,
        type: 'drink',
        nationality: recipe[0].strArea || '',
        category: recipe[0].strCategory,
        alcoholicOrNot: recipe[0].strAlcoholic,
        name: recipe[0].strDrink,
        image: recipe[0].strDrinkThumb,
      };
      favorites.push(favorite);
      localStorage.setItem('favoriteRecipes', JSON.stringify(favorites));
      setIsFavorite(!isFavorite);
    }
  };

  const copyURL = () => {
    setCopied(true);
    const { href } = window.location;
    navigator.clipboard.writeText(href);
  };

  useState(() => {
    fetchByID();
  }, []);

  return (
    <div>
      {recipe.map((item, index) => (
        <div key={ index }>
          <button data-testid="share-btn" onClick={ copyURL }>
            <img src={ shareIcon } alt="" />
          </button>
          {copied && <p>Link copied!</p>}
          <button
            data-testid="favorite-btn"
            onClick={ favoriteRecipe }
            src={ favorites.some((favorite) => favorite.id === (recipe[0].idMeal
              || recipe[0].idDrink))
              ? favoriteIconBlack : favoriteIcon }
          >
            <img
              src={ favorites.some((favorite) => favorite.id === (recipe[0].idMeal
                || recipe[0].idDrink))
                ? favoriteIconBlack : favoriteIcon }
              alt=""
            />
          </button>
          <img
            src={ item.strMealThumb || item.stDrinkThumb }
            alt=""
            data-testid="recipe-photo"
          />
          <h4 data-testid="recipe-title">{item.strMeal || item.strDrink }</h4>
          <p data-testid="recipe-category">{item.strCategory}</p>
          <p data-testid="instructions">{item.strInstructions}</p>
          {ingredients.map((ingredient, i) => (
            <label
              key={ i }
              data-testid={ `${i}-ingredient-step` }
            >
              <input
                type="checkbox"
                onChange={ ({ target }) => {
                  if (target.checked) {
                    target.parentNode
                      .style.textDecoration = 'line-through solid rgb(0, 0, 0)';
                    console.log(target);
                  } else {
                    target.parentNode.style.textDecoration = 'none';
                  }
                } }
              />

              {item[ingredient]}
              {' '}
              -
              {' '}
              {item[`strMeasure${i + 1}`]}

            </label>
          ))}
          {item.strYoutube && (
            <iframe
              data-testid="video"
              width="320"
              height="240"
              src={ item.strYoutube.replace('watch?v=', 'embed/') }
              title="YouTube video player"
              allowFullScreen
            />
          )}
          <button
            data-testid="finish-recipe-btn"
            onClick={ () => history.push('/done-recipes') }
          >
            Finish Recipe
          </button>
        </div>
      ))}
    </div>
  );
}
