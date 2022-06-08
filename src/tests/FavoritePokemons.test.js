import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import FavoritePokemons from '../pages/FavoritePokemons';

test('Teste se é exibida na tela a mensagem No favorite pokemon found',
  () => {
    // acessar os elementos da tela
    renderWithRouter(<FavoritePokemons />);
    const msgNaoEncontrado = screen.getByText('pokemon fou', { exact: false });

    // fazer os testes
    expect(msgNaoEncontrado).toBeInTheDocument();
  });

// it('')
// acessar os elementos da tela

// interagir com os elementos (se necessario)

// fazer os testes
