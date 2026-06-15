import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Header } from './header';

describe('Header component', () => {
  it('should render the main title and subtitle', () => {
    render(<Header />);

    const mainTitle = screen.getByText('Wubba lubba dub dub!');
    expect(mainTitle).toBeInTheDocument();

    const subtitle = screen.getByText('Base de datos de personajes de Rick y Morty');
    expect(subtitle).toBeInTheDocument();
  });
});