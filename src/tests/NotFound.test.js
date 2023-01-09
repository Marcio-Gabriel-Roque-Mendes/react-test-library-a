import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import NotFound from '../pages/NotFound';

test('Teste se a página contém um heading h2 com o texto Page requested not found',
  () => {
    renderWithRouter(<NotFound />);
    const headingNotFound = screen.getByText(/Page requested not found/i);

    expect(headingNotFound).toBeInTheDocument();
  });

it('Teste se a página mostra a imagem',
  () => {
    renderWithRouter(<NotFound />);
    const getImage = screen
      .getByAltText(/Pikachu crying because the page requested was not found/i);

    expect(getImage).toHaveAttribute('src', 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });

