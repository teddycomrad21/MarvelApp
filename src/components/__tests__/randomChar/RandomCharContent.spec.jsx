import '@testing-library/jest-dom';
import React from 'react';
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import RandomCharContent from '../../randomChar/RandomCharContent';

const mockCharacter = {
    "id": 1011100,
    "name": "Layla Miller",
    "description": "",
    "thumbnail": "http://i.annihil.us/u/prod/marvel/i/mg/3/00/52740e37c104f.jpg",
    "homepage": "http://marvel.com/characters/2872/layla_miller?utm_campaign=apiRef&utm_source=1408e9cec58e0e3697de40fa4fa88ace",
    "wiki": "http://marvel.com/universe/Miller%2C_Layla?utm_campaign=apiRef&utm_source=1408e9cec58e0e3697de40fa4fa88ace",
    "comics": [{
        "resourceURI": "http://gateway.marvel.com/v1/public/comics/21211",
        "name": "The Mighty Avengers (2007) #13"
    }, {
        "resourceURI": "http://gateway.marvel.com/v1/public/comics/15958",
        "name": "X-Factor (2005) #21"
    }]
};

const renderComponent = () => render(
    <MemoryRouter>
        <RandomCharContent data={mockCharacter} />
    </MemoryRouter>
);

describe('RandomCharContent component', () => {
    it('should render <p> tag with Character name', () => {
        const { getByText } = renderComponent();
        const paragraphElement = getByText('Layla Miller');
        
        expect(paragraphElement).toBeInTheDocument();
        expect(paragraphElement.tagName).toBe('P');
      });
});