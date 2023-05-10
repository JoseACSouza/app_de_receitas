import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './helpers/renderWithRouter';
import App from '../App';
import fetchMock from '../../cypress/mocks/fetch';

const mealsRoute = '/meals';
const drinkRoute = '/drinks';
const cardName = '0-card-name';
const btnall = 'All-category-filter';
const btnBeef = 'Beef-category-filter';
const btnbreakfast = 'Breakfast-category-filter';
const btnchicken = 'Chicken-category-filter';
const btnDissert = 'Dessert-category-filter';
const btnGoat = 'Goat-category-filter';

describe('Testando os parâmetros relacionados ao requisito 20, cobertura de 45%', () => {
  beforeEach(() => {
    jest.spyOn(global, 'fetch').mockImplementation(fetchMock);
  });

  test('Testa se o botão All está na tela na rota meals', async () => {
    renderWithRouter(<App />, mealsRoute);
    const allBtn = await screen.findByTestId(btnall);
    const beefBtn = await screen.findByTestId('Beef-category-filter');
    const breakfastBtn = await screen.findByTestId('Breakfast-category-filter');
    const chickenBtn = await screen.findByTestId('Chicken-category-filter');
    const dissertBtn = await screen.findByTestId(btnDissert);
    const goatBtn = await screen.findByTestId('Goat-category-filter');

    expect(allBtn).toBeInTheDocument();
    expect(beefBtn).toBeInTheDocument();
    expect(breakfastBtn).toBeInTheDocument();
    expect(chickenBtn).toBeInTheDocument();
    expect(dissertBtn).toBeInTheDocument();
    expect(goatBtn).toBeInTheDocument();
  });

  test('Testa se ao clicar no botão Beef aparece a receita correta', async () => {
    renderWithRouter(<App />, mealsRoute);
    await waitFor(() => {
      expect(screen.getAllByTestId(cardName)).toHaveTextContent('Corba');
    });

    const beefBtn = screen.getByTestId(btnBeef);
    userEvent.click(beefBtn);

    await waitFor(() => {
      expect(screen.getByTestId(cardName)).toHaveTextContent('Beef and Mustard Pie');
    });
  });

  // test('Testa se ao clicar no botão Beef aparece a receita correta', async () => {
  //   renderWithRouter(<App />, mealsRoute);
  //   const image = await screen.findAllByRole('img');
  //   expect(image).toHaveLength(12);
  // });

  test('Testa se ao clicar no botão Breakfast aparece a receita correta', async () => {
    renderWithRouter(<App />, mealsRoute);
    await waitFor(() => {
      expect(screen.getByTestId(cardName)).toHaveTextContent('Corba');
    });

    const breakfastBtn = screen.getByTestId(btnbreakfast);
    userEvent.click(breakfastBtn);

    await waitFor(() => {
      expect(screen.getByTestId(cardName)).toHaveTextContent('Breakfast Potatoes');
    });
  });

  test('Testa se ao clicar no botão Chicken aparece a receita correta', async () => { // não passa no teste
    renderWithRouter(<App />, mealsRoute);
    await waitFor(() => {
      expect(screen.getByTestId(cardName)).toHaveTextContent('Corba');
    });

    const chickenBtn = screen.getByTestId(btnchicken);
    userEvent.click(chickenBtn);

    await waitFor(() => {
      expect(screen.getByTestId(cardName)).toHaveTextContent('Brown Stew Chicken'); // Ayam Percik
    });
  });

  test('Testa se ao clicar no botão Dessert aparece a receita correta', async () => {
    renderWithRouter(<App />, mealsRoute);
    await waitFor(() => {
      expect(screen.getByTestId(cardName)).toHaveTextContent('Corba');
    });

    const dissertBtn = screen.getByTestId(btnDissert);
    userEvent.click(dissertBtn);

    await waitFor(() => {
      expect(screen.getByTestId(cardName)).toHaveTextContent('Apple & Blackberry Crumble'); // Apple & Blackberry Crumble
    });
  });

  test('Testa se ao clicar no botão Goat aparece a receita correta', async () => {
    renderWithRouter(<App />, mealsRoute);
    await waitFor(() => {
      expect(screen.getByTestId(cardName)).toHaveTextContent('Corba');
    });

    const goatBtn = screen.getByTestId(btnGoat);
    userEvent.click(goatBtn);

    await waitFor(() => {
      expect(screen.getByTestId(cardName)).toHaveTextContent('Mbuzi Choma (Roasted Goat)');
    });
  });
  // DRINKS ///////////////////////////////////////////

  test('Testa se o botão All está na tela na rota drinks', async () => {
    renderWithRouter(<App />, drinkRoute);
    const allBtn = await screen.findByTestId(btnall);
    const ordinaryBtn = await screen.findByTestId('Ordinary Drink-category-filter');
    const cocktailBtn = await screen.findByTestId('Cocktail-category-filter');
    const shakeBtn = await screen.findByTestId('Shake-category-filter');
    const otherBtn = await screen.findByTestId('Other/Unknown-category-filter');
    const cocoaBtn = await screen.findByTestId('Cocoa-category-filter');

    expect(allBtn).toBeInTheDocument();
    expect(ordinaryBtn).toBeInTheDocument();
    expect(cocktailBtn).toBeInTheDocument();
    expect(shakeBtn).toBeInTheDocument();
    expect(otherBtn).toBeInTheDocument();
    expect(cocoaBtn).toBeInTheDocument();
  });

  test('Testa se ao clicar no botão Ordinary Drink aparece o drink correto', async () => {
    renderWithRouter(<App />, drinkRoute);
    await waitFor(() => {
      expect(screen.getByTestId(cardName)).toHaveTextContent('GG');
    });

    const ordinaryBtn = screen.getByTestId('Ordinary Drink-category-filter');
    userEvent.click(ordinaryBtn);

    await waitFor(() => {
      expect(screen.getByTestId(cardName)).toHaveTextContent('Mile Long Island Iced Tea');
    });
  });

  test('Testa se ao clicar no botão Cocktail aparece o drink correto', async () => {
    renderWithRouter(<App />, drinkRoute);
    await waitFor(() => {
      expect(screen.getByTestId(cardName)).toHaveTextContent('GG');
    });

    const cocktailBtn = screen.getByTestId('Cocktail-category-filter');
    userEvent.click(cocktailBtn);

    await waitFor(() => {
      expect(screen.getByTestId(cardName)).toHaveTextContent('57 Chevy with a White License Plate'); // diferente na api
    });
  });
  test('Testa se ao clicar no botão Shake aparece o drink correto', async () => {
    renderWithRouter(<App />, drinkRoute);
    await waitFor(() => {
      expect(screen.getByTestId(cardName)).toHaveTextContent('GG');
    });

    const shakeBtn = screen.getByTestId('Shake-category-filter');
    userEvent.click(shakeBtn);

    await waitFor(() => {
      expect(screen.getByTestId(cardName)).toHaveTextContent('151 Florida Bushwacker');
    });
  });

  test('Testa se ao clicar no botão Other/Unknown aparece o drink correto', async () => {
    renderWithRouter(<App />, drinkRoute);
    await waitFor(() => {
      expect(screen.getByTestId(cardName)).toHaveTextContent('GG');
    });

    const unknownBtn = screen.getByTestId('Other/Unknown-category-filter');
    userEvent.click(unknownBtn);

    await waitFor(() => {
      expect(screen.getByTestId(cardName)).toHaveTextContent('A Piece of Ass'); // diferente na api
    });
  });

  test('Testa se ao clicar no botão Cocoa aparece o drink correto', async () => {
    renderWithRouter(<App />, drinkRoute);
    await waitFor(() => {
      expect(screen.getByTestId(cardName)).toHaveTextContent('GG');
    });

    const cocoaBtn = screen.getByTestId('Cocoa-category-filter');
    userEvent.click(cocoaBtn);

    await waitFor(() => {
      expect(screen.getByTestId(cardName)).toHaveTextContent('Castillian Hot Chocolate'); // diferente na api
    });
  });

  test('Testa se ao clicar no botão all aparece o drink correto', async () => {
    renderWithRouter(<App />, drinkRoute);
    await waitFor(() => {
      expect(screen.getByTestId(cardName)).toHaveTextContent('GG');
    });

    const alllBtn = screen.getByTestId(btnall);
    userEvent.click(alllBtn);

    await waitFor(() => {
      expect(screen.getByTestId(cardName)).toHaveTextContent('GG');
    });
  });
});
