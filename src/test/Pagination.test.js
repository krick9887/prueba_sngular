import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Pagination from './Pagination';

describe('Pagination component', () => {
  const mockOnPageChange = jest.fn();

  beforeEach(() => {
    mockOnPageChange.mockClear();
  });

  it('debe renderizar una paginación simple si hay pocas páginas', () => {
    render(<Pagination currentPage={1} totalPages={5} onPageChange={mockOnPageChange} />);

    expect(screen.getByText('1')).toBeInTheDocument();
    expect(screen.getByText('5')).toBeInTheDocument();
    expect(screen.queryByText('...')).not.toBeInTheDocument();
  });

  it('debe renderizar una paginación compleja con puntos suspensivos para muchas páginas', () => {
    render(<Pagination currentPage={1} totalPages={20} onPageChange={mockOnPageChange} />);

    expect(screen.getByText('1')).toBeInTheDocument();
    expect(screen.getByText('...')).toBeInTheDocument();
    expect(screen.getByText('20')).toBeInTheDocument();
  });

  it('debe llamar a onPageChange con el número de página correcto al hacer clic', () => {
    render(<Pagination currentPage={1} totalPages={10} onPageChange={mockOnPageChange} />);
    
    fireEvent.click(screen.getByText('5'));
    expect(mockOnPageChange).toHaveBeenCalledWith(5);
  });

  it('debe llamar a onPageChange al hacer clic en "Siguiente"', () => {
    render(<Pagination currentPage={5} totalPages={10} onPageChange={mockOnPageChange} />);
    
    fireEvent.click(screen.getByText('Siguiente'));
    expect(mockOnPageChange).toHaveBeenCalledWith(6);
  });

  it('debe deshabilitar el botón "Anterior" en la primera página', () => {
    render(<Pagination currentPage={1} totalPages={10} onPageChange={mockOnPageChange} />);
    
    const prevButton = screen.getByText('Anterior');
    expect(prevButton).toBeDisabled();
  });

  it('debe deshabilitar el botón "Siguiente" en la última página', () => {
    render(<Pagination currentPage={10} totalPages={10} onPageChange={mockOnPageChange} />);
    
    const nextButton = screen.getByText('Siguiente');
    expect(nextButton).toBeDisabled();
  });
});