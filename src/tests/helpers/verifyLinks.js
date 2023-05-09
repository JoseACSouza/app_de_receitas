import { meal, drink } from '../mocks/recipeDetails/mealAndDrink';
import { allDrinks } from '../mocks/recipes/allDrinks';
import { allMeal } from '../mocks/recipes/allMeal';

const mealLink = 'https://www.themealdb.com/api/json/v1/1/lookup.php?i=52977';
const drinkLink = 'https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=15997';
const allMealsLink = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
const allDrinksLink = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';

export const fetch = (url) => Promise.resolve({
  status: 200,
  ok: true,
  json: () => {
    switch (url) {
    case mealLink:
      return Promise.resolve(meal);
    case drinkLink:
      return Promise.resolve(drink);
    case allMealsLink:
      return Promise.resolve(allMeal);
    case allDrinksLink:
      return Promise.resolve(allDrinks);
    default:
      break;
    }
  },
});
