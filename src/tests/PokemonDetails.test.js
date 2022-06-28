import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

const urlPikachuDetails = '/pokemons/25';

describe('Teste se a informações detalhadas do pokémon selecionado são mostradas na tela',
  () => {
    it('A página deve conter um texto <name> Details, onde <name> é o nome do pokémon',
      () => {
        // acessar os elementos da tela

        // interagir com os elementos (se necessario)

        // fazer os testes

        const { history } = renderWithRouter(<App />);
        history.push(urlPikachuDetails);

        const titleDetails = screen.getByText(/pikachu details/i);
        expect(titleDetails).toBeInTheDocument();
      });
    it('Não deve existir o link de navegação para os detalhes do pokémon selecionado',
      () => {
        const { history } = renderWithRouter(<App />);
        history.push(urlPikachuDetails);

        const linkDetailsPokemon = screen.queryByRole('link', { name: /more datails/i });
        expect(linkDetailsPokemon).toBeNull();/* se nao passar no strike, trocar por
        not.toBeInTheDocument() e verificar se nao tem nenhum it.only */
      });
    it('A seção de detalhes deve conter um heading h2 com o texto Summary',
      () => {
        const { history } = renderWithRouter(<App />);
        history.push(urlPikachuDetails);

        const summaryTitle = screen.getByRole('heading', { name: /summary/i });
        expect(summaryTitle).toBeInTheDocument();
      });
    it('A seção detalhes deve ter um parágrafo com resumo do pokémon sendo visualizado',
      () => {
        const { history } = renderWithRouter(<App />);
        history.push(urlPikachuDetails);

        const summaryContents = screen.getByText(/This intelligent Pokémon/i);
        expect(summaryContents).toBeInTheDocument();
      });
  });

describe('Teste se existe na página uma seção contendo mapas',
  () => {
    it('Teste se os mapas contem as localizações do pokémon', () => {
      const { history } = renderWithRouter(<App />);
      history.push(urlPikachuDetails);

      const h2Locat = screen.getByRole('heading', { name: /game locations of pikachu/i });
      expect(h2Locat).toBeInTheDocument();

      const location1 = screen.getByText(/kanto viridian forest/i);
      expect(location1).toBeInTheDocument();

      const location2 = screen.getByText(/kanto power plant/i);
      expect(location2).toBeInTheDocument();

      // const imagePokemons = screen.getByRole('img', { name: /pikachu sprite/i });
    });
    it('A imagem da localização deve ter um atributo src com a URL da localização',
      () => {
        const { history } = renderWithRouter(<App />);
        history.push(urlPikachuDetails);

        const imageLocation = screen.getAllByRole('img', { name: /Pikachu location/i });
        // console.log(imageLocation[0].src);

        const linkGif1 = 'https://pwo-wiki.info/images/4/47/Viridian_Forest.gif';
        expect(imageLocation[0]).toHaveAttribute('src', linkGif1);
        expect(imageLocation[0]).toHaveAttribute('alt', 'Pikachu location');
        expect(imageLocation[0]).toBeInTheDocument();

        expect(imageLocation[1]).toHaveAttribute('src', imageLocation[1].src);
        expect(imageLocation[1]).toHaveAttribute('alt', imageLocation[1].alt);
        expect(imageLocation[1]).toBeInTheDocument();
      });
  });

describe('Teste se o usuário consegue favoritar um pokémon na página de detalhes', () => {
  it('A página deve exibir um checkbox que permite favoritar o pokémon;', () => {
    const { history } = renderWithRouter(<App />);
    history.push(urlPikachuDetails);

    const checkbox = screen.getByRole('checkbox', { name: /pokémon favoritado\?/i });
    expect(checkbox).toBeInTheDocument();
  });
  it('Cliques no checkbox devem adicionar e remover o pokémon da lista de favoritos',
    () => {
      const { history } = renderWithRouter(<App />);
      history.push(urlPikachuDetails);

      const checkbox = screen.getByRole('checkbox', { name: /pokémon favoritado\?/i });

      userEvent.click(checkbox);
      expect(checkbox).toBeChecked();
      // referencia: https://github.com/testing-library/jest-dom#tobechecked

      userEvent.click(checkbox);
      expect(checkbox).not.toBeChecked();
    });

  it('O label do checkbox deve conter o texto Pokémon favoritado?', () => {
    const { history } = renderWithRouter(<App />);
    history.push(urlPikachuDetails);

    const labelCheckox = screen.getByLabelText(/pokémon favoritado\?/i);
    expect(labelCheckox).toBeInTheDocument();
  });
});
