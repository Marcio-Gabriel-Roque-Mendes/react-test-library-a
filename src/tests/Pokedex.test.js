// import React from 'react';
// import { screen } from '@testing-library/react';
// import renderWithRouter from '../renderWithRouter';
// import Pokedex from '../pages/Pokedex';
// import pokemons from '../data';

// test('Teste se a página contém um heading h2 com o texto Encountered pokémons',
//   () => {
//     // acessar os elementos da tela
//     const favorites = {
//       4: false,
//       10: false,
//       23: false,
//       25: true,
//       65: false,
//       78: false,
//       143: false,
//       148: false,
//       151: false,
//     };
//     renderWithRouter(<Pokedex
//       isPokemonFavoriteById={ favorites }
//       pokemons={ pokemons }
//     />);
//     const heading = screen.getByRole('heading', { name: /Encountered pokémons/i });

//     // fazer os testes
//     expect(heading).toBeInTheDocument();
//   });

// // acessar os elementos da tela

// // interagir com os elementos (se necessario)

// // fazer os testes
