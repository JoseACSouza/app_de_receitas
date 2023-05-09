import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from './helpers/renderWithRouter';
import { fetch } from './helpers/verifyLinks';
import App from '../App';

const mealRoute = '/meals/52977';

describe('Testando os requisitos relacionados ao requisito 5, cobertura de 30%', () => {
  beforeEach(() => {
    jest.spyOn(global, 'fetch').mockImplementation(fetch);
  });

  test('Testa se o título é renderizado com o nome da comida', async () => {
    renderWithRouter(<App />, mealRoute);
    const mealName = await screen.findByTestId('recipe-title');
    expect(mealName).toBeInTheDocument();
  });

  test('Testa se as instruções são renderizadas corretamente', async () => {
    renderWithRouter(<App />, mealRoute);
    const mealInstructions = await screen.findByTestId('instructions');
    expect(mealInstructions).toBeInTheDocument();
  });

  test('Testa se é renderizado o botão de share', async () => {
    renderWithRouter(<App />, mealRoute);
    const shareBtn = await screen.findByTestId('share-btn');
    expect(shareBtn).toBeInTheDocument();
  });

  test('Testa se é renderizado o botão de favoritar', async () => {
    renderWithRouter(<App />, mealRoute);
    const favoriteBtn = await screen.findByTestId('favorite-btn');
    expect(favoriteBtn).toBeInTheDocument();
  });

  test('Testa se é renderizado o botão de favoritar', async () => {
    renderWithRouter(<App />, mealRoute);
    const recipePhoto = await screen.findByTestId('recipe-photo');
    expect(recipePhoto).toBeInTheDocument();
  });
});
