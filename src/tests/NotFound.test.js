import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import NotFound from '../pages/NotFound';

test('Teste se a página contém um heading h2 com o texto Page requested not found',
  () => {
    // acessar os elementos da tela
    renderWithRouter(<NotFound />);
    const headingNotFound = screen.getByText(/Page requested not found/i);
    // fazer os testes
    expect(headingNotFound).toBeInTheDocument();
  });

it('Teste se a página mostra a imagem',
  () => {
    // acessar os elementos da tela
    renderWithRouter(<NotFound />);
    const getImage = screen
      .getByAltText(/Pikachu crying because the page requested was not found/i);

    // fazer os testes
    expect(getImage).toBeInTheDocument();
  });

// interagir com os elementos (se necessario)
