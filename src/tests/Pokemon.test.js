import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App.js';

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
    test('O peso médio do pokémon deve ser exibido', () => {
      renderWithRouter(<App />);
      const textoPeso = screen.getByText(/Average weight/i);
      expect(textoPeso).toHaveTextContent(/Average weight: 6.0 kg/i);
    });
    test('A imagem do pokémon deve ser exibida. Ela deve conter um atributo src e um alt',
      () => {
        renderWithRouter(<App />);
        const urlImage = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/25.png';
        const imagePokemons = screen.getByRole('img', { name: /pikachu sprite/i });
        expect(imagePokemons).toHaveAttribute('src', urlImage);
        expect(imagePokemons).toHaveAttribute('alt', expect
          .stringContaining('Pikachu sprite'));
      });
  });

test('Teste se o card do pokémon contém um link para exibir detalhes deste pokémon',
  () => {
    renderWithRouter(<App />);
    const linkDetalhes = screen.getByRole('link', { name: /more details/i });
    expect(linkDetalhes).toHaveAttribute('href', expect.stringContaining('/pokemons/25'));
    // Referencia: https://github.com/testing-library/jest-dom#tohaveattribute
  });

test('Teste se o clique no link -More details- redireciona para a pagina de detalhes',
  () => {
    renderWithRouter(<App />);
    const linkMoreDetalhes = screen.getByRole('link', { name: /more details/i });
    userEvent.click(linkMoreDetalhes);

    const titleSummary = screen.getByRole('heading', { name: /summary/i });
    expect(titleSummary).toBeInTheDocument();
  });

test('Teste também se a URL exibida no navegador muda para /pokemon/<id>',
  () => {
    const { history } = renderWithRouter(<App />);

    const buttonTypePoison = screen.getByRole('button', { name: /poison/i });
    userEvent.click(buttonTypePoison);

    const pokemonEkans = screen.getByText(/ekans/i);
    expect(pokemonEkans).toBeDefined();

    const moreDetailsLink = screen.getByRole('link', { name: /more details/i });

    userEvent.click(moreDetailsLink);
    expect(history.location.pathname).toBe('/pokemons/23');
  });

describe('Teste se existe um ícone de estrela nos pokémons favoritados:', () => {
  test('o src deve ter /star-icon.svg, e alt <pokemon> is marked as favorite;', () => {
    const { history } = renderWithRouter(<App />);

    history.push('/pokemons/25');

    const checkboxDoFavorito = screen.getByRole('checkbox', {
      name: /pokémon favoritado\?/i,
    });
    userEvent.click(checkboxDoFavorito);

    const starIcon = screen.getByRole('img', { name: /pikachu is marked as favorite/i });
    expect(starIcon).toHaveAttribute('src', expect.stringContaining('/star-icon.svg'));

    const starFavorite = screen.getByRole('img', {
      name: /pikachu is marked as favorite/i });
    expect(starFavorite).toHaveAttribute('alt', expect
      .stringContaining('Pikachu is marked as favorite'));
  });
});