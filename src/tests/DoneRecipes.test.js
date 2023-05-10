import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import AppProvider from '../context/AppProvider';
import DoneRecipes from '../pages/DoneRecipes';

describe('verifica a pagina done-recipes', () => {
  const horizontal = '0-horizontal-name';
  const image1 = 'https://www.thecocktaildb.com/images/media/drink/zvsre31572902738.jpg';
  const soup = 'soup vegetarian';
  const share = '0-horizontal-share-btn';
  const link = 'Link copied!';
  const twoRecipes = [{
    id: 5574,
    type: 'meal',
    nationality: 'jewish',
    category: 'soup',
    alcoholicOrNot: '',
    name: soup,
    image: image1,
    doneDate: '21/02/23',
    tags: ['vegetarian', 'soup', 'strong', 'fire', 'snow'],
  },
  {
    id: 8823,
    type: 'drink',
    nationality: 'russian',
    category: 'soup',
    alcoholicOrNot: '',
    name: 'vodka',
    image: 'https://www.thecocktaildb.com/images/media/drink/zvsre31572902738.jpg',
    doneDate: '21/02/23',
    tags: [],
  }];

  test('testa página doneRecipes renderiza os filtros e se a rota é done-recipes', () => {
    render(
      <AppProvider>
        <BrowserRouter>
          <DoneRecipes />
        </BrowserRouter>
      </AppProvider>,
    );
    const btnAll = screen.getByTestId('filter-by-all-btn');
    expect(btnAll).toBeInTheDocument();
    const btnMeals = screen.getByTestId('filter-by-meal-btn');
    expect(btnMeals).toBeInTheDocument();
    const btnDrinks = screen.getByTestId('filter-by-drink-btn');
    expect(btnDrinks).toBeInTheDocument();
    expect(window.location.pathname).toBe('/done-recipes');
  });
  test('renderiza meal resgatado do localStorage', () => {
    const mealRecipe = [{
      id: 5574,
      type: 'meal',
      nationality: 'jewish',
      category: 'soup',
      alcoholicOrNot: '',
      name: 'soup',
      image: image1,
      doneDate: '21/02/23',
      tags: ['vegetarian', 'soup', 'strong', 'fire', 'snow'],
    }];
    localStorage.setItem('doneRecipes', JSON.stringify(mealRecipe));
    render(
      <AppProvider>
        <BrowserRouter>
          <DoneRecipes />
        </BrowserRouter>
      </AppProvider>,
    );
    expect(screen.getByTestId(horizontal)).toBeInTheDocument();
    expect(screen.getByTestId('0-horizontal-image')).toBeInTheDocument();
    expect(screen.getByTestId('0-horizontal-top-text')).toBeInTheDocument();
    expect(screen.getByTestId('0-horizontal-done-date')).toBeInTheDocument();
    expect(screen.getByTestId(share)).toBeInTheDocument();
    expect(screen.getByTestId('0-vegetarian-horizontal-tag')).toBeInTheDocument();
  });
  test('renderiza drink resgatado do localStorage', () => {
    const drinkRecipe = [{
      id: 8823,
      type: 'drink',
      nationality: 'russian',
      category: 'soup',
      alcoholicOrNot: '',
      name: 'vodka',
      image: image1,
      doneDate: '21/02/23',
      tags: [],
    }];
    localStorage.setItem('doneRecipes', JSON.stringify(drinkRecipe));
    render(
      <AppProvider>
        <BrowserRouter>
          <DoneRecipes />
        </BrowserRouter>
      </AppProvider>,
    );
    expect(screen.getByTestId(horizontal)).toBeInTheDocument();
    expect(screen.getByTestId('0-horizontal-image')).toBeInTheDocument();
    expect(screen.getByTestId('0-horizontal-top-text')).toBeInTheDocument();
    expect(screen.getByTestId('0-horizontal-done-date')).toBeInTheDocument();
    expect(screen.getByTestId(share)).toBeInTheDocument();
  });
  test('verifica o funcionamento dos filtros', () => {
    localStorage.setItem('doneRecipes', JSON.stringify(twoRecipes));
    render(
      <AppProvider>
        <BrowserRouter>
          <DoneRecipes />
        </BrowserRouter>
      </AppProvider>,
    );
    expect(screen.getByTestId(horizontal)).toBeInTheDocument();
    expect(screen.getByTestId(horizontal)).toHaveTextContent('soup vegetarian');
    const all = screen.getByTestId('filter-by-all-btn');
    const meal = screen.getByTestId('filter-by-meal-btn');
    const drink = screen.getByTestId('filter-by-drink-btn');
    userEvent.click(drink);
    expect(screen.queryByTestId(horizontal)).not.toHaveTextContent(soup);
    userEvent.click(all);
    expect(screen.getByTestId(horizontal)).toHaveTextContent(soup);
    userEvent.click(meal);
    expect(screen.queryByText('vodka')).not.toBeInTheDocument();
  });
  test('Verifica se ao clicar no botão de compartilhar é renderizada uma confirmação da cópia na página', () => {
    localStorage.setItem('doneRecipes', JSON.stringify(drinkRecipe));
    render(
      <AppProvider>
        <BrowserRouter>
          <DoneRecipes />
        </BrowserRouter>
      </AppProvider>,
    );
    expect(screen.getByTestId(horizontal)).toBeInTheDocument();
    const mockedClipboard = jest.fn();
    navigator.clipboard = {
      writeText: mockedClipboard,
    };
    const shareBtn = screen.getByTestId(share);
    expect(screen.queryByText(link)).not.toBeInTheDocument();
    userEvent.click(shareBtn);
    expect(mockedClipboard).toHaveBeenCalledTimes(1);
    expect(screen.getByText('Link copied!')).toBeInTheDocument();
  });
  test('Verifica se ao clicar no botão de compartilhar é renderizada uma confirmação da cópia na página', () => {
    localStorage.setItem('doneRecipes', JSON.stringify(drinkRecipe));
    render(
      <AppProvider>
        <BrowserRouter>
          <DoneRecipes />
        </BrowserRouter>
      </AppProvider>,
    );
    expect(screen.getByTestId(horizontal)).toBeInTheDocument();
    const mockedClipboard = jest.fn();
    navigator.clipboard = {
      writeText: mockedClipboard,
    };
    const shareBtn = screen.getByTestId(share);
    expect(shareBtn).toBeInTheDocument();
    expect(screen.queryByText(link)).not.toBeInTheDocument();
    userEvent.click(shareBtn);
    expect(mockedClipboard).toHaveBeenCalledTimes(1);
    expect(screen.getByText(link)).toBeInTheDocument();
  });
  test('trata o retorno inválido do localStorage', () => {
    const invalidRecipe = 'invalidRecipe';
    localStorage.setItem('doneRecipes', invalidRecipe);
    render(
      <AppProvider>
        <BrowserRouter>
          <DoneRecipes />
        </BrowserRouter>
      </AppProvider>,
    );
    expect(screen.queryByTestId(horizontal)).toBeNull();
    expect(screen.queryByTestId('0-horizontal-image')).toBeNull();
    expect(screen.queryByTestId('0-horizontal-top-text')).toBeNull();
    expect(screen.queryByTestId('0-horizontal-done-date')).toBeNull();
    expect(screen.queryByTestId(share)).toBeNull();
  });
  test('compartilha o link ao clicar no botão de compartilhamento', () => {
    const mockedClipboard = jest.fn();
    const recipeId = 8823;
    const recipeType = 'drink';
    const recipe = {
      id: recipeId,
      type: recipeType,
      nationality: 'russian',
      category: 'soup',
      alcoholicOrNot: '',
      name: 'vodka',
      image: image1,
      doneDate: '21/02/23',
      tags: [],
    };
    localStorage.setItem('doneRecipes', JSON.stringify([recipe]));
    render(
      <AppProvider>
        <BrowserRouter>
          <DoneRecipes />
        </BrowserRouter>
      </AppProvider>,
    );
    navigator.clipboard = {
      writeText: mockedClipboard,
    };
    const shareBtn = screen.getByTestId(share);
    userEvent.click(shareBtn);
    expect(mockedClipboard).toHaveBeenCalledTimes(1);
    expect(mockedClipboard).toHaveBeenCalledWith(`http://localhost:3000/${recipeType}s/${recipeId}`);
  });
});
