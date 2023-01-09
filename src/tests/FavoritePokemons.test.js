import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import FavoritePokemons from '../pages/FavoritePokemons';
import pokemons from '../data';

test('Teste se é exibida na tela a mensagem No favorite pokemon found',
  () => {
    renderWithRouter(<FavoritePokemons />);
    const msgNaoEncontrado = screen.getByText('pokemon found', { exact: false });

    expect(msgNaoEncontrado).toBeInTheDocument();
  });

it('Teste se são exibidos todos os cards de pokémons favoritados',
  () => {
    renderWithRouter(<FavoritePokemons pokemons={ [pokemons[0]] } />);
    const pikachu = screen.getByText(/pikachu/i);

    expect(pikachu).toBeInTheDocument();
  });