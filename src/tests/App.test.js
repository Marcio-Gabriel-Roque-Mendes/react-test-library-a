import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('Testes do component App', () => {
  test('Teste se o topo da aplicação contém um conjunto fixo de links de navegação',
    () => {
      renderWithRouter(<App />);
      const linkUm = screen.getByRole('link', { name: /home/i });
      const linkDois = screen.getByRole('link', { name: /about/i });
      const linkTres = screen.getByRole('link', { name: /Favorite Pokémons/i });

      expect(linkUm).toBeInTheDocument();
      expect(linkDois).toBeInTheDocument();
      expect(linkTres).toBeInTheDocument();
    });

  it('Teste se a aplicação é redirecionada para a URL / ao clicar no link Home',
    async () => {
      const { history } = renderWithRouter(<App />);
      const home = screen.getByRole('link', { name: /home/i });

      userEvent.click(home);
      const titleHome = await screen.findByRole('heading', { name: /Encountered/i,
        level: 2 });

      expect(titleHome).toBeInTheDocument();
      const url = history.location.pathname;
      expect(url).toBe('/');
    });

  it('Teste se a aplicação é redirecionada para a URL /about, ao clicar no link About',
    async () => {
      const { history } = renderWithRouter(<App />);
      const about = screen.getByRole('link', { name: /about/i });

      userEvent.click(about);
      const titleAbout = await screen.findByRole('heading', { name: /About Pokédex/i,
        level: 2 });

      expect(titleAbout).toBeInTheDocument();
      const currentURL = history.location.pathname;
      expect(currentURL).toBe('/about');
    });

  it('Teste se aplicação é redirecionada á URL /favorites, ao clicar Favorite Pokémons',
    async () => {
      const { history } = renderWithRouter(<App />);
      const favorites = screen.getByRole('link', { name: /Favorite Pokémons/i });

      userEvent.click(favorites);
      const titleFavorites = await screen.findByRole('heading',
        { name: /Favorite pokémons/i, level: 2 });

      expect(titleFavorites).toBeInTheDocument();
      const urlAtual = history.location.pathname;
      expect(urlAtual).toBe('/favorites');
    });

  test('Teste se é redirecionada para a página Not Found ao entrar numa URL desconhecida',
    () => {
      const { history } = renderWithRouter(<App />);

      history.push('/pagina/com-url-desconhecida');

      const titleNotFound = screen.getByRole('heading',
        { name: /Page requested not found/i });
      expect(titleNotFound).toBeInTheDocument();
    });
});