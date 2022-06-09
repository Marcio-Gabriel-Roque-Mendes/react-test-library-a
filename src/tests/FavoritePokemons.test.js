import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import FavoritePokemons from '../pages/FavoritePokemons';
import pokemons from '../data';

test('Teste se é exibida na tela a mensagem No favorite pokemon found',
  () => {
    // acessar os elementos da tela
    renderWithRouter(<FavoritePokemons />);
    const msgNaoEncontrado = screen.getByText('pokemon fou', { exact: false });

    // fazer os testes
    expect(msgNaoEncontrado).toBeInTheDocument();
  });

it('Teste se são exibidos todos os cards de pokémons favoritados',
  () => {
    // acessar os elementos da tela
    renderWithRouter(<FavoritePokemons pokemons={ [pokemons[0]] } />);
    const pikachu = screen.getByText(/pikachu/i);
    // // interagir com os elementos (se necessario)
    expect(pikachu).toBeInTheDocument();
  });

// // acessar os elementos da tela

// // fazer os testes
