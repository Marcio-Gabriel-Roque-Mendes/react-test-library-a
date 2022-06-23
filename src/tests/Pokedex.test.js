import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import Pokedex from '../pages/Pokedex';
import pokemons from '../data';

describe('Teste o componente <Pokedex.js />', () => {
  it('Teste se a página contém um heading h2 com o texto Encountered pokémons',
    () => {
      const favorites = {
        4: false,
        25: true,
      };
      renderWithRouter(<Pokedex
        isPokemonFavoriteById={ favorites }
        pokemons={ pokemons }
      />);
      const heading = screen.getByRole('heading', { name: /Encountered pokémons/i });
      expect(heading).toBeInTheDocument();
    });

  it('O botão deve conter o texto Próximo pokémon',
    () => {
      const favoritesPokemons = {
        4: false,
        25: true,
      };
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
    renderWithRouter(<Pokedex
      isPokemonFavoriteById={ favoritesPokemons }
      pokemons={ pokemons }
    />);
    // const currentPokemon = screen.getByText(/pikachu/i);
    // expect(currentPokemon).toBeInTheDocument();
    const button = screen.getByRole('button', { name: /Próximo/i });
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
      // const firstPokemon = screen.getByText(/pikachu/i);
      // expect(firstPokemon).toBeInTheDocument();
      const button = screen.getByRole('button', { name: /Próximo/i });
      userEvent.click(button);
      const lastPokemon = await screen.findByText(/Charmander/i);
      expect(lastPokemon).toBeInTheDocument();
      userEvent.click(button);
      const firstPokemonAgain = await screen.findByText(/pikachu/i);
      expect(firstPokemonAgain).toBeInTheDocument();
    });

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
      // const pikachu = screen.getByText(/pikachu/i);
      // expect(pikachu).toBeInTheDocument();
      const buttonNext = screen.getByRole('button', { name: /próximo/i });
      userEvent.click(buttonNext);
      const charmander = await screen.findByText(/Charmander/i);
      const pikachuNull = screen.queryByRole(/pikachu/i);
      expect(pikachuNull).toBeNull();
      expect(charmander).toBeInTheDocument();
    });

  it('verificar se todos os tipos de botão estão visiveis', () => {
    const favoritesPokemons = {
      4: false,
      25: true,
    };
    renderWithRouter(<Pokedex
      isPokemonFavoriteById={ favoritesPokemons }
      pokemons={ pokemons }
    />);
    const electricButton = screen.getByRole('button', { name: /electric/i });
    expect(electricButton).toBeVisible();
    const fireButton = screen.getByRole('button', { name: /fire/i });
    expect(fireButton).toBeVisible();
    const bugButton = screen.getByRole('button', { name: /bug/i });
    expect(bugButton).toBeVisible();
    const poisonButton = screen.getByRole('button', { name: /poison/i });
    expect(poisonButton).toBeVisible();
    const psychicButton = screen.getByRole('button', { name: /psychic/i });
    expect(psychicButton).toBeVisible();
    const normalButton = screen.getByRole('button', { name: /normal/i });
    expect(normalButton).toBeVisible();
    const dragonButton = screen.getByRole('button', { name: /dragon/i });
    expect(dragonButton).toBeVisible();
  });

  it('Verifica se ao selcionar ao o botão proximo pokemon fica desativado',
    () => {
      const favoritesPokemons = {
        4: false,
        25: true,
      };
      renderWithRouter(<Pokedex
        isPokemonFavoriteById={ favoritesPokemons }
        pokemons={ pokemons }
      />);
      const buttonTypeElectric = screen.getByRole('button', { name: /electric/i });
      userEvent.click(buttonTypeElectric);
      const btnProximoPokemon = screen.getByRole('button', { name: /próximo pokémon/i });
      expect(btnProximoPokemon).toBeDisabled();
      const buttonAll = screen.getByRole('button', { name: /all/i });
      userEvent.click(buttonAll);
      const btnNextPokemon = screen.getByRole('button', { name: /próximo pokémon/i });
      expect(btnNextPokemon).toBeEnabled();
    });

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
      const botoesDeTipo = screen.getAllByTestId('pokemon-type-button');
      expect(botoesDeTipo).toHaveLength(+'7');// evitando usar numero magico, e transformando uma string em number ao adicioanr o +
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

  it('A Pokedéx deverá mostrar os pokémons (sem filtros) quando o botão All for clicado;',
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
      expect(pikachu).toBeInTheDocument();
      const botaoAll = screen.getByRole('button', { name: /all/i });
      userEvent.click(botaoAll);
      const botaoProxPok = screen.getByRole('button', { name: /próximo pokémon/i });
      userEvent.click(botaoProxPok);
      const charmander = screen.getByText(/charmander/i);
      expect(charmander).toBeInTheDocument();
    });
});
