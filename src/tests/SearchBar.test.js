import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './helpers/renderWithRouter';
import App from '../App';
import fetchMock from '../../cypress/mocks/fetch';

const mealsRoute = '/meals';
const drinkRoute = '/drinks';
const searchTopBtn = 'search-top-btn';
const searchExecBtn = 'exec-search-btn';
const cardName = '0-card-name';
const searchInput = 'search-input';
const buttonRadio = 'ingredient-search-radio';

describe('Testando os parâmetros relacionados ao requisito 12, cobertura de 45%', () => {
  beforeEach(() => {
    jest.spyOn(global, 'fetch').mockImplementation(fetchMock);
  });

  test('Testa se o botão ao ser clicado, aparece o input', async () => {
    renderWithRouter(<App />, mealsRoute);
    const searchBtn = await screen.findByTestId(searchTopBtn);
    expect(searchBtn).toBeInTheDocument();
    userEvent.click(searchBtn);
    const inputMeals = await screen.findByTestId(searchInput);
    expect(inputMeals).toBeInTheDocument();
  });

  test('Testa se ao add uma receita pelo ingrediente a receita aparece na tela', async () => {
    renderWithRouter(<App />, mealsRoute);
    await waitFor(() => {
      expect(screen.getByTestId(cardName)).toHaveTextContent('Corba');
    });

    const searchBtn = screen.getByTestId(searchTopBtn);
    userEvent.click(searchBtn);

    const inputMeals = screen.getByTestId(searchInput);
    const radioButton = screen.getByTestId(buttonRadio);
    const selectButton = screen.getByTestId(searchExecBtn);

    userEvent.type(inputMeals, 'Chicken');
    userEvent.click(radioButton);
    userEvent.click(selectButton);

    await waitFor(() => {
      expect(screen.getByTestId(cardName)).toHaveTextContent('Brown Stew Chicken');
    });
  });

  test('Testa se ao add uma receita pelo nome e o resultado for uma receita, redireciona para a página de detalhes da receita', async () => {
    const { history } = renderWithRouter(<App />, mealsRoute);
    await waitFor(() => {
      expect(screen.getByTestId(cardName)).toHaveTextContent('Corba');
    });

    const searchBtn = screen.getByTestId(searchTopBtn);
    userEvent.click(searchBtn);

    const inputMeals = screen.getByTestId(searchInput);
    const radioButton = screen.getByTestId('name-search-radio');
    const selectButton = screen.getByTestId(searchExecBtn);

    userEvent.type(inputMeals, 'Arrabiata');
    userEvent.click(radioButton);
    userEvent.click(selectButton);

    await waitFor(() => {
      expect(history.location.pathname).toBe('/meals/52771');
    });
  });

  test.skip('Testa se ao add uma receita pela primeira letra a receita aparece na tela', async () => {
    renderWithRouter(<App />, mealsRoute);
    await waitFor(() => {
      expect(screen.getByTestId(cardName)).toHaveTextContent('Corba');
    });

    const searchBtn = screen.getByTestId(searchTopBtn);
    userEvent.click(searchBtn);

    const inputMeals = screen.getByTestId(searchInput);
    const radioButton = screen.getByTestId('first-letter-search-radio');
    const selectButton = screen.getByTestId(searchExecBtn);

    userEvent.type(inputMeals, 'A');
    userEvent.click(radioButton);
    userEvent.click(selectButton);

    await waitFor(() => {
      expect(screen.getByTestId(cardName)).toHaveTextContent('Apple Frangipan Tart');
    });
  });

  test('Testa se o botão ao ser clicado, aparece o input', async () => {
    renderWithRouter(<App />, drinkRoute);
    const searchBtn = await screen.findByTestId(searchTopBtn);
    expect(searchBtn).toBeInTheDocument();
    userEvent.click(searchBtn);
    const inputDrink = await screen.findByTestId(searchInput);
    expect(inputDrink).toBeInTheDocument();
  });

  test('Testa se ao add um drink pelo ingrediente o drink aparece na tela', async () => {
    renderWithRouter(<App />, drinkRoute);
    await waitFor(() => {
      expect(screen.getByTestId(cardName)).toHaveTextContent('GG');
    });

    const searchBtn = screen.getByTestId(searchTopBtn);
    userEvent.click(searchBtn);

    const inputDrink = screen.getByTestId(searchInput);
    const radioButton = screen.getByTestId(buttonRadio);
    const selectButton = screen.getByTestId(searchExecBtn);

    userEvent.type(inputDrink, 'Light rum');
    userEvent.click(radioButton);
    userEvent.click(selectButton);

    await waitFor(() => {
      expect(screen.getByTestId(cardName)).toHaveTextContent('151 Florida Bushwacker');
    });
  });

  test('Testa se ao add um drink pelo nome e o resultado for um drink, redireciona para a página de detalhes do drink', async () => {
    const { history } = renderWithRouter(<App />, drinkRoute);
    await waitFor(() => {
      expect(screen.getByTestId(cardName)).toHaveTextContent('GG');
    });

    const searchBtn = screen.getByTestId(searchTopBtn);
    userEvent.click(searchBtn);

    const inputDrink = screen.getByTestId(searchInput);
    const radioButton = screen.getByTestId('name-search-radio');
    const selectButton = screen.getByTestId(searchExecBtn);

    userEvent.type(inputDrink, 'Aquamarine');
    userEvent.click(radioButton);
    userEvent.click(selectButton);

    await waitFor(() => {
      expect(history.location.pathname).toBe('/drinks/178319');
    });
  });

  test.skip('Testa se ao add um drink pela primeira letra o drink aparece na tela', async () => {
    renderWithRouter(<App />, drinkRoute);
    await waitFor(() => {
      expect(screen.getByTestId(cardName)).toHaveTextContent('GG');
    });

    const searchBtn = screen.getByTestId(searchTopBtn);
    userEvent.click(searchBtn);

    const inputDrink = screen.getByTestId(searchInput);
    const radioButton = screen.getByTestId('first-letter-search-radio');
    const selectButton = screen.getByTestId(searchExecBtn);

    userEvent.type(inputDrink, 'A');
    userEvent.click(radioButton);
    userEvent.click(selectButton);

    await waitFor(() => {
      expect(screen.getByTestId(cardName)).toHaveTextContent('A1');
    });
  });
  // test('Testa se o alert aparece com 2 letras', async () => {
  //   const spy = jest.spyOn(window, 'alert');
  //   renderWithRouter(<App />, mealsRoute);

  //   await waitFor(() => {
  //     expect(screen.getByTestId(cardName)).toHaveTextContent('Corba');
  //   });

  //   const searchBtn = screen.getByTestId(searchTopBtn);
  //   userEvent.click(searchBtn);

  //   const inputMeals = screen.getByTestId(searchInput);
  //   const radioButton = screen.getByTestId(buttonRadio);
  //   const selectButton = screen.getByTestId(searchExecBtn);

  //   userEvent.type(inputMeals, 'ar');
  //   userEvent.click(radioButton);
  //   userEvent.click(selectButton);

  //   expect(spy).toHaveBeenCalledWith('Your search must have only 1 (one) character');
  // });
});
