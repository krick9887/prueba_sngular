import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Card } from './Card';

describe('Card component', () => {
  const mockPersonaje = {
    id: 1,
    name: 'Rick Sanchez',
    image: 'https://rickandmortyapi.com/api/character/avatar/1.jpeg',
  };

  const mockOnClick = jest.fn();
  const mockOnToggleFavorite = jest.fn();

  beforeEach(() => {
    mockOnClick.mockClear();
    mockOnToggleFavorite.mockClear();
  });

  it('debe renderizar el nombre y la imagen del personaje', () => {
    render(
      <Card
        personaje={mockPersonaje}
        onClick={mockOnClick}
        onToggleFavorite={mockOnToggleFavorite}
        isFavorite={false}
      />
    );

    expect(screen.getByText('Rick Sanchez')).toBeInTheDocument();
    expect(screen.getByAltText('Rick Sanchez')).toBeInTheDocument();
  });

  it('debe llamar a onClick cuando se hace clic en la tarjeta', () => {
    render(
      <Card
        personaje={mockPersonaje}
        onClick={mockOnClick}
        onToggleFavorite={mockOnToggleFavorite}
        isFavorite={false}
      />
    );

    fireEvent.click(screen.getByRole('article'));
    expect(mockOnClick).toHaveBeenCalledTimes(1);
    expect(mockOnClick).toHaveBeenCalledWith(mockPersonaje);
  });

  it('debe llamar a onToggleFavorite cuando se hace clic en la estrella', () => {
    render(
      <Card
        personaje={mockPersonaje}
        onClick={mockOnClick}
        onToggleFavorite={mockOnToggleFavorite}
        isFavorite={false}
      />
    );

    const star = screen.getByRole('button', { name: 'Toggle favorite' });
    fireEvent.click(star);

    expect(mockOnToggleFavorite).toHaveBeenCalledTimes(1);
    expect(mockOnToggleFavorite).toHaveBeenCalledWith(mockPersonaje.id);
    expect(mockOnClick).not.toHaveBeenCalled();
  });

  it('debe tener la clase "is-favorite" si isFavorite es verdadero', () => {
    render(
      <Card
        personaje={mockPersonaje}
        onClick={mockOnClick}
        onToggleFavorite={mockOnToggleFavorite}
        isFavorite={true}
      />
    );

    const star = screen.getByRole('button', { name: 'Toggle favorite' });
    expect(star).toHaveClass('is-favorite');
  });
});