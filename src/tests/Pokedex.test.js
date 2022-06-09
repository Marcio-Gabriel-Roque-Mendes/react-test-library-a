import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import Pokedex from '../pages/Pokedex';

test('Teste se a página contém um heading h2 com o texto Encountered pokémons',
  async () => {
    // acessar os elementos da tela
    renderWithRouter(<Pokedex />);
    const heading = await screen.getByRole('heading', { name: /Encountered pokémons/i });

    // fazer os testes
    expect(heading).toBeInTheDocument();
  });

// acessar os elementos da tela

// interagir com os elementos (se necessario)

// fazer os testes
