import React from 'react';
import { screen } from '@testing-library/react';
// import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
// import Pokemon from '../components/Pokemon';
// import pokemons from '../data';
import App from '../App';

describe('Teste se é renderizado um card com as informações de determinado pokémon',
  () => {
    test('O nome correto do pokémon deve ser mostrado na tela', () => {
      renderWithRouter(<App />);
      const nomesPokemons = screen.getAllByTestId('pokemon-name');
      const nomePrimeiroPok = nomesPokemons[0];
      expect(nomePrimeiroPok).toHaveTextContent('Pikachu');
    });

    test('O tipo correto do pokémon deve ser mostrado na tela', () => {
      renderWithRouter(<App />);
      const tiposPokemons = screen.getAllByTestId('pokemon-type');
      const tipoPrimeiroPok = tiposPokemons[0];
      expect(tipoPrimeiroPok).toHaveTextContent('Electric');
    });
    test.only('O peso médio do pokémon deve ser exibido', () => {
      renderWithRouter(<App />);
      const textoPeso = screen.getByText(/Average weight/i);
      expect(textoPeso).toHaveTextContent(/Average weight: 6.0 kg/i);
    });
    //     test('A imagem do pokémon deve ser exibida. Ela deve conter um atributo src e um alt', () => {});
  });

// // acessar os elementos da tela

// // interagir com os elementos (se necessario)

// // fazer os testes
