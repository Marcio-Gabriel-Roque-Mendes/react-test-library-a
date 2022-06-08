import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('Testes do component App', () => {
  test('Teste se o topo da aplicação contém um conjunto fixo de links de navegação',
    () => {
    // acessar os elementos da tela
      renderWithRouter(<App />);
      const linkUm = screen.getByRole('link', { name: /home/i });
      const linkDois = screen.getByRole('link', { name: /about/i });
      const linkTres = screen.getByRole('link', { name: /Favorite Pokémons/i });

      // interagir com os elementos (se necessario)

      // fazer os testes
      expect(linkUm).toBeInTheDocument();
      expect(linkDois).toBeInTheDocument();
      expect(linkTres).toBeInTheDocument();
    });

  it('Teste se a aplicação é redirecionada para a URL / ao clicar no link Home',
    async () => {
      // acessar os elementos da tela
      const { history } = renderWithRouter(<App />);
      const home = screen.getByRole('link', { name: /home/i });

      // interagir com os elementos (se necessario)
      userEvent.click(home);
      const titleHome = await screen.findByRole('heading', { name: /Encountered/i,
        level: 2 });

      // fazer os testes
      expect(titleHome).toBeInTheDocument();
      const url = history.location.pathname;
      expect(url).toBe('/');
    });

  it('Teste se a aplicação é redirecionada para a URL /about, ao clicar no link About',
    async () => {
      // acessar os elementos da tela
      const { history } = renderWithRouter(<App />);
      const about = screen.getByRole('link', { name: /about/i });

      // interagir com os elementos (se necessario)
      userEvent.click(about);
      const titleAbout = await screen.findByRole('heading', { name: /About Pokédex/i,
        level: 2 });

      // fazer os testes
      expect(titleAbout).toBeInTheDocument();
      const currentURL = history.location.pathname;
      expect(currentURL).toBe('/about');
    });

  it('Teste se aplicação é redirecionada á URL /favorites, ao clicar Favorite Pokémons',
    async () => {
      // acessar os elementos da tela
      const { history } = renderWithRouter(<App />);
      const favorites = screen.getByRole('link', { name: /Favorite Pokémons/i });

      // interagir com os elementos (se necessario)
      userEvent.click(favorites);
      const titleFavorites = await screen.findByRole('heading',
        { name: /Favorite pokémons/i, level: 2 });

      // fazer os testes
      expect(titleFavorites).toBeInTheDocument();
      const urlAtual = history.location.pathname;
      expect(urlAtual).toBe('/favorites');
    });

  test('Teste se é redirecionada para a página Not Found ao entrar numa URL desconhecida',
    () => {
      // acessar os elementos da tela
      const { history } = renderWithRouter(<App />);

      // interagir com os elementos (se necessario)
      history.push('/pagina/com-url-desconhecida');

      // fazer os testes
      const titleNotFound = screen.getByRole('heading',
        { name: /Page requested not found/i });
      expect(titleNotFound).toBeInTheDocument();
    });
});

// acessar os elementos da tela

// interagir com os elementos (se necessario)

// fazer os testes
