import React, { useEffect, useState, useContext } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import { AppContext } from '../context/AppProvider';
import styles from './RecipeDetails.module.css';
import shareIcon from '../images/shareIcon.svg';
import favoriteIcon from '../images/whiteHeartIcon.svg';
import favoriteIconBlack from '../images/blackHeartIcon.svg';

export default function RecipeDetails() {
  const location = useLocation();
  const history = useHistory();

  const favorites = JSON.parse(localStorage.getItem('favoriteRecipes')) || [];

  const { recipe, setRecipe, ingredients, setIngredients } = useContext(AppContext);
  const [recommendations, setRecommendations] = useState([]);
  const [isFavorite, setIsFavorite] = useState(false);
  const [copied, setCopied] = useState(false);

  const recipeID = location.pathname.split('/')[2];
  const pathname = location.pathname.split('/')[1];

  const fetchRecommendations = async () => {
    if (pathname === 'meals') {
      const response = await fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=');
      const data = await response.json();

      if (data.drinks !== null) {
        const maxArrayLength = 6;
        const updatedRecommendation = data.drinks.slice(0, maxArrayLength);
        setRecommendations(updatedRecommendation);
      }
    }

    if (pathname === 'drinks') {
      const response = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=');
      const data = await response.json();

      if (data.meals !== null) {
        const maxArrayLength = 6;
        const updatedRecommendation = data.meals.slice(0, maxArrayLength);
        setRecommendations(updatedRecommendation);
      }
    }
  };

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
      fetchRecommendations();
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
      fetchRecommendations();
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

  const verifyIsFavorite = () => {
    if (favorites.some((favorite) => favorite.id === recipeID)) {
      setIsFavorite(true);
    }
  };

  useEffect(() => {
    fetchByID();
    verifyIsFavorite();
  }, []);

  return (
    <div>
      { pathname === 'meals'
        ? recipe.map((item, index) => (
          <div key={ index }>
            <button data-testid="share-btn" onClick={ copyURL }>
              <img src={ shareIcon } alt="" />
            </button>
            {copied && <p>Link copied!</p>}
            <button
              data-testid="favorite-btn"
              onClick={ favoriteRecipe }
              src={ isFavorite ? favoriteIconBlack : favoriteIcon }
            >
              <img
                src={ isFavorite ? favoriteIconBlack : favoriteIcon }
                alt=""
              />
            </button>
            <img src={ item.strMealThumb } alt="" data-testid="recipe-photo" />
            <h4 data-testid="recipe-title">{item.strMeal}</h4>
            <p data-testid="recipe-category">{item.strCategory}</p>
            <p data-testid="instructions">{item.strInstructions}</p>
            {ingredients.map((ingredient, i) => (
              <p key={ i } data-testid={ `${i}-ingredient-name-and-measure` }>
                {item[ingredient]}
                {' '}
                -
                {' '}
                {item[`strMeasure${i + 1}`]}
              </p>
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
            <div className={ styles.recommendation }>
              {recommendations.map((recommendation, i) => (
                <div key={ i } data-testid={ `${i}-recommendation-card` }>
                  <img
                    src={ recommendation.strDrinkThumb }
                    alt=""
                  />
                  <p data-testid={ `${i}-recommendation-title` }>
                    { recommendation.strDrink }
                  </p>
                </div>
              ))}
            </div>
            <button
              data-testid="start-recipe-btn"
              className={ styles.startRecipeBtn }
              onClick={ () => history.push(`/meals/${recipeID}/in-progress`) }
            >
              Start Recipe
            </button>
          </div>
        )) : recipe.map((item, index) => (
          <div key={ index }>
            <button data-testid="share-btn" onClick={ copyURL }>
              <img src={ shareIcon } alt="" />
            </button>
            {copied && <p>Link copied!</p>}
            <button
              data-testid="favorite-btn"
              onClick={ favoriteRecipe }
              src={ isFavorite ? favoriteIconBlack : favoriteIcon }
            >
              <img
                src={ isFavorite ? favoriteIconBlack : favoriteIcon }
                alt=""
              />
            </button>
            <img src={ item.strDrinkThumb } alt="" data-testid="recipe-photo" />
            <h4 data-testid="recipe-title">{item.strDrink}</h4>
            <span data-testid="recipe-category">
              {item.strCategory}
              {' '}
              -
              {' '}
              {item.strAlcoholic}
            </span>
            <p data-testid="instructions">{item.strInstructions}</p>
            {ingredients.map((ingredient, i) => (
              <p key={ i } data-testid={ `${i}-ingredient-name-and-measure` }>
                {item[ingredient]}
                {' '}
                -
                {' '}
                {item[`strMeasure${i + 1}`]}
              </p>
            ))}
            <div className={ styles.recommendation }>
              {recommendations.map((recommendation, i) => (
                <div
                  key={ i }
                  data-testid={ `${i}-recommendation-card` }
                >
                  <img
                    src={ recommendation.strMealThumb }
                    alt=""
                  />
                  <p data-testid={ `${i}-recommendation-title` }>
                    { recommendation.strMeal }
                  </p>
                </div>
              ))}
            </div>
            <button
              data-testid="start-recipe-btn"
              className={ styles.startRecipeBtn }
              onClick={ () => history.push(`/drinks/${recipeID}/in-progress`) }
            >
              Start Recipe
            </button>
          </div>
        ))}
    </div>
  );
}
