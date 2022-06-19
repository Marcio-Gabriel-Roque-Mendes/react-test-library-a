import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import Pokedex from '../pages/Pokedex';
import pokemons from '../data';

describe('Testando o componente Pokedex.js', () => {
  test('Teste se a página contém um heading h2 com o texto Encountered pokémons',
    () => {
    // acessar os elementos da tela
      const favorites = {
        4: false,
        10: false,
        23: false,
        25: true,
        65: false,
        78: false,
        143: false,
        148: false,
        151: false,
      };
      renderWithRouter(<Pokedex
        isPokemonFavoriteById={ favorites }
        pokemons={ pokemons }
      />);
      const heading = screen.getByRole('heading', { name: /Encountered pokémons/i });

      // fazer os testes
      expect(heading).toBeInTheDocument();
    });

  // acessar os elementos da tela

  // interagir com os elementos (se necessario)

// fazer os testes
});

describe('Teste se aparece o próximo pokémon quando o botão Próximo pokémon é clicado',
  () => {
    it('O botão deve conter o texto Próximo pokémon',
      () => {
        const favoritesPokemons = {
          4: false,
          10: false,
          23: false,
          25: true,
          65: false,
          78: false,
          143: false,
          148: false,
          151: false,
        };
          // acessar os elementos da tela
        renderWithRouter(<Pokedex
          isPokemonFavoriteById={ favoritesPokemons }
          pokemons={ pokemons }
        />);

        const button = screen.getByRole('button', { name: /Próximo pokémon/i });
        expect(button).toBeInTheDocument();
      });

    it('Os próximos pokémons da lista devem ser mostrados', async () => {
      const favoritesPokemons = {
        4: false,
        10: false,
        23: false,
        25: true,
        65: false,
        78: false,
        143: false,
        148: false,
        151: false,

      };
      // acessar os elementos da tela
      renderWithRouter(<Pokedex
        isPokemonFavoriteById={ favoritesPokemons }
        pokemons={ pokemons }
      />);

      const currentPokemon = screen.getByText(/pikachu/i);
      expect(currentPokemon).toBeInTheDocument();

      const button = screen.getByRole('button', { name: /Próximo/i });

      // interagir com os elementos (se necessario)
      userEvent.click(button);
      const nextPokemon = await screen.findByText(/Charmander/i);

      expect(nextPokemon).toBeInTheDocument();
    });

    it('O 1º pokémon da lista deve ser mostrado ao clicar no botão, se estiver no ultimo',
      async () => {
        const favoritesPokemons = {
          4: false,
          25: true,
        };
        renderWithRouter(<Pokedex
          isPokemonFavoriteById={ favoritesPokemons }
          pokemons={ [
            pokemons[0],
            pokemons[1],
          ] }
        />);

        const firstPokemon = screen.getByText(/pikachu/i);
        expect(firstPokemon).toBeInTheDocument();

        const button = screen.getByRole('button', { name: /Próximo/i });

        userEvent.click(button);

        const lastPokemon = await screen.findByText(/Charmander/i);
        expect(lastPokemon).toBeInTheDocument();

        userEvent.click(button);

        const firstPokemonAgain = await screen.findByText(/pikachu/i);
        expect(firstPokemonAgain).toBeInTheDocument();
      });
  });

it.only('Teste se é mostrado apenas um pokémon por vez',
  async () => {
    const favoritesPokemons = {
      4: false,
      25: true,
    };

    renderWithRouter(<Pokedex
      isPokemonFavoriteById={ favoritesPokemons }
      pokemons={ pokemons }
    />);

    const pikachu = screen.getByText(/pikachu/i);
    expect(pikachu).toBeInTheDocument();

    const buttonNext = screen.getByRole('button', { name: /próximo/i });

    userEvent.click(buttonNext);

    const charmander = await screen.findByText(/Charmander/i);
    const pikachuNull = screen.queryByRole(/pikachu/i);

    expect(pikachuNull).toBeNull();
    expect(charmander).toBeInTheDocument();
  });
