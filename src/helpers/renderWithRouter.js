import React from 'react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { render } from '@testing-library/react';
import AppProvider from '../context/AppProvider';

const renderWithRouter = (component, initialRoute = '/') => {
  const history = createMemoryHistory({ initialEntries: [initialRoute] });
  return ({
    ...render(
      <AppProvider>
        <Router history={ history }>{component}</Router>
      </AppProvider>,
    ),
    history,
  });
};
export default renderWithRouter;
