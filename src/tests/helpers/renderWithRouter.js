import React from 'react';
import { render } from '@testing-library/react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import AppProvider from '../../context/AppProvider';

export default function renderWithRouter(component, initialRoute = '/') {
  const history = createMemoryHistory({ initialEntries: [initialRoute] });
  return {
    ...render(
      <AppProvider>
        <Router history={ history }>
          { component }
        </Router>
      </AppProvider>,
    ),
  };
}
