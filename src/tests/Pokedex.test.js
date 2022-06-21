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
        25: true,
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

describe('Teste se é mostrado apenas um pokémon por vez', () => {
  it('Verificando se é mostrado apenas um pokémon por vez',
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
});

describe('Teste se a Pokédex tem os botões de filtro:', () => {
  it('Deve existir um botão de filtragem para cada tipo de pokémon, sem repetição',
    () => {
      const favoritesPokemons = {
        4: false,
        25: true,
      };
      renderWithRouter(<Pokedex
        isPokemonFavoriteById={ favoritesPokemons }
        pokemons={ pokemons }
      />);
      const sete = 7;
      const botoesDeTipo = screen.getAllByTestId('pokemon-type-button');
      expect(botoesDeTipo).toHaveLength(sete);
    });
  it('Ao selecionar um tipo, a Pokédex deve circular apenas pokémons daquele tipo;',
    () => {
      const favoritesPokemons = {
        4: false,
        25: true,
      };
      renderWithRouter(<Pokedex
        isPokemonFavoriteById={ favoritesPokemons }
        pokemons={ pokemons }
      />);

      const pikachu = screen.getByText(/pikachu/i);
      expect(pikachu).toBeDefined();

      const psychicButton = screen.getByRole('button', { name: /psychic/i });
      userEvent.click(psychicButton);

      const alakazam = screen.getByAltText(/alakazam sprite/i);
      expect(alakazam).toBeInTheDocument();

      const proxBotao = screen.getByText(/próximo pokémon/i);
      userEvent.click(proxBotao);

      const mew = screen.getByAltText(/mew sprite/i);
      expect(mew).toBeDefined();
    });
  it('O texto do botão deve corresponder ao nome do tipo, ex. Psychic', () => {
    const favoritesPokemons = {
      4: false,
      25: true,
    };
    renderWithRouter(<Pokedex
      isPokemonFavoriteById={ favoritesPokemons }
      pokemons={ pokemons }
    />);

    const nomeDoTipo = screen.getAllByText(/Electric/i);
    expect(nomeDoTipo).toHaveLength(2);

    const psychicButton = screen.getByRole('button', { name: /psychic/i });
    userEvent.click(psychicButton);

    const tipoEletrico = screen.getAllByText(/Electric/i);
    expect(tipoEletrico).not.toHaveLength(2);
  });
  it('O botão All precisa estar sempre visível', () => {
    const favoritesPokemons = {
      4: false,
      25: true,
    };
    renderWithRouter(<Pokedex
      isPokemonFavoriteById={ favoritesPokemons }
      pokemons={ pokemons }
    />);

    const allButton = screen.getByRole('button', { name: /all/i });
    expect(allButton).toBeVisible();

    const dragonButton = screen.getByRole('button', { name: /dragon/i });
    userEvent.click(dragonButton);

    const botalAll = screen.getByRole('button', { name: /all/i });
    expect(botalAll).toBeVisible();
  });
});

describe('Teste se a Pokédex contém um botão para resetar o filtro', () => {
  it('O texto do botão deve ser All;', () => {
    const favoritesPokemons = {
      4: false,
      25: true,
    };
    renderWithRouter(<Pokedex
      isPokemonFavoriteById={ favoritesPokemons }
      pokemons={ pokemons }
    />);

    const allButton = screen.getByRole('button', { name: /all/i });
    expect(allButton).toHaveTextContent(/All/i);
  });
});
