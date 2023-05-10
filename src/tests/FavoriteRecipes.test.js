import React from 'react';
import { act, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from '../helpers/renderWithRouter';

const favoriteRouter = '/favorite-recipes';
const testId0 = '0-horizontal-image';
const testId1 = '1-horizontal-image';

describe('Testes para a pagina Favorite Recipes', () => {
  beforeEach(() => {
    localStorage.setItem('favoriteRecipes', JSON.stringify([
      {
        id: '178332',
        type: 'drink',
        nationality: '',
        category: 'Cocktail',
        alcoholicOrNot: 'Alcoholic',
        name: 'Smashed Watermelon Margarita',
        image: 'https://www.thecocktaildb.com/images/media/drink/dztcv51598717861.jpg',
      },
      {
        id: '53065',
        type: 'meal',
        nationality: 'Japanese',
        category: 'Seafood',
        alcoholicOrNot: '',
        name: 'Sushi',
        image: 'https://www.themealdb.com/images/media/meals/g046bb1663960946.jpg',
      },
    ]));
  });

  test('Testa se os elementos da pagina são renderizados corretamente', async () => {
    const { history } = renderWithRouter(<App />);
    act(() => {
      history.push(favoriteRouter);
    });

    const title = await screen.findByRole('heading', { name: /favorite recipes/i });
    expect(title).toBeInTheDocument();
    expect(title).toHaveTextContent('Favorite Recipes');

    const allBtn = await screen.findByRole('button', { name: /all/i });
    expect(allBtn).toBeInTheDocument();

    const mealsBtn = await screen.findByRole('button', { name: /meals/i });
    expect(mealsBtn).toBeInTheDocument();

    const drinksBtn = await screen.findByRole('button', { name: /drinks/i });
    expect(drinksBtn).toBeInTheDocument();

    const drinkImg = await screen.findByTestId(testId0);
    expect(drinkImg).toBeInTheDocument();

    const drinkText = await screen.findByTestId('0-horizontal-name');
    expect(drinkText).toBeInTheDocument();

    const drinkSubtext = await screen.findByTestId('0-horizontal-top-text');
    expect(drinkSubtext).toBeInTheDocument();

    const drinkShareBtn = await screen.findByTestId('0-horizontal-share-btn');
    expect(drinkShareBtn).toBeInTheDocument();

    const mealImg = await screen.findByTestId(testId1);
    expect(mealImg).toBeInTheDocument();

    const mealText = await screen.findByTestId('1-horizontal-name');
    expect(mealText).toBeInTheDocument();

    const mealSubtext = await screen.findByTestId('1-horizontal-top-text');
    expect(mealSubtext).toBeInTheDocument();

    const mealShareBtn = await screen.findByTestId('1-horizontal-share-btn');
    expect(mealShareBtn).toBeInTheDocument();
  });

  test('Testa os botões de filtro', async () => {
    const { history } = renderWithRouter(<App />);
    act(() => {
      history.push(favoriteRouter);
    });
    const allBtn = await screen.findByRole('button', { name: /all/i });

    const mealsBtn = await screen.findByRole('button', { name: /meals/i });

    const drinksBtn = await screen.findByRole('button', { name: /drinks/i });

    const drinkImg = await screen.findByTestId(testId0);
    expect(drinkImg).toBeInTheDocument();

    const mealImg = await screen.findByTestId(testId1);
    expect(mealImg).toBeInTheDocument();

    userEvent.click(mealsBtn);

    await waitFor(() => {
      expect(screen.queryByRole('img', { name: /smashed watermelon margarita/i })).not.toBeInTheDocument();

      expect(screen.getByRole('img', { name: /sushi/i })).toBeInTheDocument();
    });

    userEvent.click(allBtn);

    await waitFor(() => {
      expect(screen.getByRole('img', { name: /smashed watermelon margarita/i })).toBeInTheDocument();
      expect(screen.getByRole('img', { name: /sushi/i })).toBeInTheDocument();
    });

    userEvent.click(drinksBtn);

    await waitFor(() => {
      expect(screen.getByRole('img', { name: /smashed watermelon margarita/i })).toBeInTheDocument();
      expect(screen.queryByRole('img', { name: /sushi/i })).not.toBeInTheDocument();
    });

    userEvent.click(allBtn);

    await waitFor(() => {
      expect(screen.getByRole('img', { name: /smashed watermelon margarita/i })).toBeInTheDocument();
      expect(screen.getByRole('img', { name: /sushi/i })).toBeInTheDocument();
    });
  });

  test('Testa se é redirecionado ao apertar na imagem do drink', async () => {
    const { history } = renderWithRouter(<App />);
    act(() => {
      history.push(favoriteRouter);
    });

    const drinkImg = await screen.findByTestId(testId0);

    act(() => {
      userEvent.click(drinkImg);
    });

    await waitFor(() => {
      expect(history.location.pathname).toBe('/drinks/178332');
    });
  });

  test('Testa se é redirecionado ao apertar no texto do drink', async () => {
    const { history } = renderWithRouter(<App />);
    act(() => {
      history.push(favoriteRouter);
    });

    const drinkText = await screen.findByTestId('0-horizontal-name');

    act(() => {
      userEvent.click(drinkText);
    });

    await waitFor(() => {
      expect(history.location.pathname).toBe('/drinks/178332');
    });
  });

  test('Testa você é redirecionado ao apertar na imagem do meal', async () => {
    const { history } = renderWithRouter(<App />);
    act(() => {
      history.push(favoriteRouter);
    });

    const mealImg = await screen.findByTestId(testId1);

    act(() => {
      userEvent.click(mealImg);
    });

    await waitFor(() => {
      expect(history.location.pathname).toBe('/meals/53065');
    });
  });

  test('Testa é redirecionado ao apertar no texto do meal', async () => {
    const { history } = renderWithRouter(<App />);
    act(() => {
      history.push(favoriteRouter);
    });

    const mealText = await screen.findByTestId('1-horizontal-name');

    act(() => {
      userEvent.click(mealText);
    });

    await waitFor(() => {
      expect(history.location.pathname).toBe('/meals/53065');
    });
  });

  test('Testa o botão de favoritar', async () => {
    const { history } = renderWithRouter(<App />);
    act(() => {
      history.push(favoriteRouter);
    });

    const favoriteBtn = await screen.findByTestId('0-horizontal-favorite-btn');

    userEvent.click(favoriteBtn);

    await waitFor(() => {
      expect(screen.queryByRole('img', { name: /smashed watermelon margarita/i })).not.toBeInTheDocument();
      expect(JSON.parse(localStorage.getItem('favoriteRecipes'))).toStrictEqual([{
        id: '53065',
        type: 'meal',
        nationality: 'Japanese',
        category: 'Seafood',
        alcoholicOrNot: '',
        name: 'Sushi',
        image: 'https://www.themealdb.com/images/media/meals/g046bb1663960946.jpg',
      }]);
    });
  });

  test('Testa o comportamento do botão de share do meal', async () => {
    jest.useFakeTimers();
    Object.assign(navigator, {
      clipboard: {
        writeText: jest.fn().mockReturnValueOnce('teste'),
      },
    });
    const { history } = renderWithRouter(<App />);
    act(() => {
      history.push(favoriteRouter);
    });

    const mealShareBtn = await screen.findByTestId('1-horizontal-share-btn');

    userEvent.click(mealShareBtn);

    await waitFor(() => {
      expect(screen.getByText(/link copied!/i)).toBeInTheDocument();
    });

    act(() => {
      jest.advanceTimersByTime(5000);
    });

    await waitFor(() => {
      expect(screen.queryByText(/link copied!/i)).not.toBeInTheDocument();
    });
  });

  test('Testa o comportamento do botão de share do drink', async () => {
    jest.useFakeTimers();
    Object.assign(navigator, {
      clipboard: {
        writeText: jest.fn().mockReturnValueOnce('teste'),
      },
    });
    const { history } = renderWithRouter(<App />);
    act(() => {
      history.push(favoriteRouter);
    });

    const drinkShareBtn = await screen.findByTestId('0-horizontal-share-btn');

    userEvent.click(drinkShareBtn);

    await waitFor(() => {
      expect(screen.getByText(/link copied!/i)).toBeInTheDocument();
    });

    act(() => {
      jest.advanceTimersByTime(5000);
    });

    await waitFor(() => {
      expect(screen.queryByText(/link copied!/i)).not.toBeInTheDocument();
    });
  });
});
