import PropTypes from 'prop-types';
import { createContext, useMemo, useState } from 'react';

export const AppContext = createContext();

function AppProvider({ children }) {
  const [recipes, setRecipes] = useState([]);
  const [isVisible, setIsVisible] = useState(false);
  const [recipe, setRecipe] = useState([]);
  const [ingredients, setIngredients] = useState([]);

  const values = useMemo(() => ({
    recipes,
    setRecipes,
    isVisible,
    setIsVisible,
    recipe,
    setRecipe,
    ingredients,
    setIngredients,
  }), [recipes, setRecipes, isVisible, recipe, ingredients]);

  return (
    <AppContext.Provider value={ values }>
      {children}
    </AppContext.Provider>
  );
}

AppProvider.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};

export default AppProvider;
