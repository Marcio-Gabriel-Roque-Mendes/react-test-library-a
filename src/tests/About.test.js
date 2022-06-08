import React from 'react';
import { screen } from '@testing-library/react';
// import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import { About } from '../pages';

test('Teste se a página contém as informações sobre a Pokédex',
  () => {
    // acessar os elementos da tela
    renderWithRouter(<About />);
    const infosPokedex = screen.getByText('This application simulates', { exact: false });

    // interagir com os elementos (se necessario)

    // fazer os testes
    expect(infosPokedex).toBeInTheDocument();
  });

it('Teste se a página contém um heading h2 com o texto About Pokédex',
  () => {
    // acessar os elementos da tela
    renderWithRouter(<About />);
    const heading = screen.getByRole('heading', { name: /About Pokédex/i, level: 2 });

    // interagir com os elementos (se necessario)

    // fazer os testes
    expect(heading).toBeDefined();
  });

test('Teste se a página contém dois parágrafos com texto sobre a Pokédex;',
  () => {
    // acessar os elementos da tela
    renderWithRouter(<About />);
    const parag1 = screen.getByText(/this application simulates a pokédex,/i);
    const parag2 = screen.getByText(/one can filter pokémons by type/i);

    // interagir com os elementos (se necessario)

    // fazer os testes
    expect(parag1).toBeDefined(); // Não é uma boa pratica usar ele, ja que temos o toBeInTheDocument
    expect(parag2).toBeInTheDocument();
  });

it('Teste se a página contém a seguinte imagem de uma Pokédex',
  () => {
  // acessar os elementos da tela
    renderWithRouter(<About />);
    const imgPokedex = screen.getByRole('img', { name: /pokédex/i });

    // interagir com os elementos (se necessario)

    // fazer os testes
    expect(imgPokedex).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  });

// acessar os elementos da tela

// interagir com os elementos (se necessario)

// fazer os testes
