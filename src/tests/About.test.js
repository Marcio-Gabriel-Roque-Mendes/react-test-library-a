import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import { About } from '../pages';

test('Teste se a página contém as informações sobre a Pokédex',
  () => {
    // acessar os elementos da tela
    renderWithRouter(<About />);
    const infosPokedex = screen.getByText('This application simulates', { exact: false });

    // fazer os testes
    expect(infosPokedex).toBeInTheDocument();
  });

it('Teste se a página contém um heading h2 com o texto About Pokédex',
  () => {
    renderWithRouter(<About />);
    const heading = screen.getByRole('heading', { name: /About Pokédex/i, level: 2 });

    expect(heading).toBeDefined();
  });

test('Teste se a página contém dois parágrafos com texto sobre a Pokédex;',
  () => {
    renderWithRouter(<About />);
    const parag1 = screen.getByText(/this application simulates a pokédex,/i);
    const parag2 = screen.getByText(/one can filter pokémons by type/i);


    expect(parag1).toBeInTheDocument()
    expect(parag2).toBeInTheDocument();
  });

it('Teste se a página contém a seguinte imagem de uma Pokédex',
  () => {
    renderWithRouter(<About />);
    const imgPokedex = screen.getByRole('img', { name: /pokédex/i });

    expect(imgPokedex).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  });