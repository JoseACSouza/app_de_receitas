import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import AppProvider from '../context/AppProvider';
import Profile from '../pages/Profile';

test('testa página profile renderiza Done Recipes', () => {
  render(
    <AppProvider>
      <BrowserRouter>
        <Profile />
      </BrowserRouter>
    </AppProvider>,
  );

  const btnDoneRecipes = screen.getByTestId('profile-done-btn');
  expect(btnDoneRecipes).toBeInTheDocument();
  userEvent.click(btnDoneRecipes);
  expect(window.location.pathname).toBe('/done-recipes');
});

test('testa página profile renderiza Favorite Recipes', () => {
  render(
    <AppProvider>
      <BrowserRouter>
        <Profile />
      </BrowserRouter>
    </AppProvider>,
  );

  const btnFavoriteRecipes = screen.getByTestId('profile-favorite-btn');
  expect(btnFavoriteRecipes).toBeInTheDocument();
  userEvent.click(btnFavoriteRecipes);
  expect(window.location.pathname).toBe('/favorite-recipes');
});

test('testa página profile renderiza logout', () => {
  render(
    <AppProvider>
      <BrowserRouter>
        <Profile />
      </BrowserRouter>
    </AppProvider>,
  );

  const logoutBtn = screen.getByTestId('profile-logout-btn');
  expect(logoutBtn).toBeInTheDocument();
  userEvent.click(logoutBtn);
  expect(window.location.pathname).toBe('/');
});

test('testa se existem 3 botões na tela', () => {
  render(
    <AppProvider>
      <BrowserRouter>
        <Profile />
      </BrowserRouter>
    </AppProvider>,
  );

  const buttons = screen.getAllByRole('button');
  expect(buttons).toHaveLength(3);
});

test('local storage é limpo após o click', () => {
  render(
    <AppProvider>
      <BrowserRouter>
        <Profile />
      </BrowserRouter>
    </AppProvider>,
  );
  localStorage.setItem('user', JSON.stringify({ email: 'user@example.com' }));

  const profileLogoutBtn = screen.getByTestId('profile-logout-btn');
  userEvent.click(profileLogoutBtn);

  expect(localStorage.getItem('user')).toBeNull();
});
