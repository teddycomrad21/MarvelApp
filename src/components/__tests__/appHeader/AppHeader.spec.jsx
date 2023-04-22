import '@testing-library/jest-dom';
import React from 'react';
import { render, screen } from '@testing-library/react';
import { fireEvent, getByRole } from '@testing-library/dom';
import { MemoryRouter } from 'react-router-dom';
import AppHeader from '../../appHeader/AppHeader';

const renderComponent = () => render(
    <MemoryRouter>
        <AppHeader />
    </MemoryRouter>
);

describe('App Header component', () => {
    it('should render heading', () => {
        renderComponent();

        const headerElement = screen.getByRole('heading', { name: 'Marvel information portal' });

        expect(headerElement).toBeDefined();
    });

    it('should render links and url destinations correctly', () => {
        const { getAllByRole } = renderComponent();
        const linkElements = getAllByRole('link');

        expect(linkElements[0].href).toBe('http://localhost/');
        expect(linkElements[0].textContent).toBe('Marvel information portal');
        expect(linkElements[1].href).toBe('http://localhost/');
        expect(linkElements[1].textContent).toBe('Characters');
        expect(linkElements[2].href).toBe('http://localhost/comics');
        expect(linkElements[2].textContent).toBe('Comics');
      });

      it('should set style attribute on link when clicked', () => {
        const { container } = renderComponent();
        const characterLink = getByRole(container, 'link', { name: 'Characters' });
        const comicsLink = getByRole(container, 'link', { name: 'Comics' });

        expect(characterLink).toHaveAttribute('style', 'color: rgb(159, 0, 19);');
    
        fireEvent.click(comicsLink);
    
        expect(comicsLink).toHaveAttribute('style', 'color: rgb(159, 0, 19);');
      });
  });