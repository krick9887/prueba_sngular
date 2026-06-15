import { useState } from 'react';
import { Filtrar } from './components/Filtrar';
import { Card } from './components/Card';
import { Modal } from './components/Modal';
import Pagination from './components/Pagination';
import { Header } from './components/header';
import { useFavorites } from './composables/useFavorites';
import { useCharacters } from './composables/useCharacters';
import './App.css';

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPersonaje, setSelectedPersonaje] = useState(null);

  const { favorites, animatingFavorite, handleToggleFavorite } = useFavorites();
  const {
    loading,
    filter,
    setFilter,
    searchQuery,
    showFavorites,
    setShowFavorites,
    displayedPersonajes,
    totalPages,
    currentPage,
    handlePageChange,
  } = useCharacters(favorites);

  const openModal = (personaje) => {
    setSelectedPersonaje(personaje);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedPersonaje(null);
  };

  return (
    <div className="container">
      <Header />
      {showFavorites ? (
        <div key="favorites-view">
          <div className="view-header">
            <h2>Mis Favoritos</h2>
            <button className="btn volver" onClick={() => setShowFavorites(false)}>
              &larr; Volver a la lista
            </button>
          </div>
          <section className="lista-personajes p-4 rounded">
            {loading ? (
              <p>Cargando favoritos...</p>
            ) : displayedPersonajes.length > 0 ? (
              displayedPersonajes.map((personaje) => (
                <Card
                  key={personaje.id}
                  personaje={personaje}
                  onClick={openModal}
                  onToggleFavorite={handleToggleFavorite}
                  isFavorite={favorites.includes(personaje.id)}
                  isAnimating={animatingFavorite === personaje.id}
                />
              ))
            ) : (
              <p>Aún no has añadido favoritos.</p>
            )}
          </section>
        </div>
      ) : (
        <div key="main-view">
          <div className="main-controls d-flex justify-content-between align-items-center">
            <Filtrar filter={filter} setFilter={setFilter} />
            <button
              className="btn btn-favoritos d-flex align-items-center"
              onClick={() => setShowFavorites(true)}
            >
              Mis Favoritos
              <span className="favorite-icon-wrapper">&#9733;</span>
            </button>
          </div>
          <section className="lista-personajes p-4 rounded">
            {loading ? (
              <p>Cargando...</p>
            ) : displayedPersonajes.length > 0 ? (
              displayedPersonajes.map((personaje) => (
                <Card
                  key={personaje.id}
                  personaje={personaje}
                  onClick={openModal}
                  onToggleFavorite={handleToggleFavorite}
                  isFavorite={favorites.includes(personaje.id)}
                  isAnimating={animatingFavorite === personaje.id}
                />
              ))
            ) : (
              <p>No se encontraron personajes con el nombre "{searchQuery}".</p>
            )}
          </section>
          {totalPages > 1 && !loading && (
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          )}
        </div>
      )}

      {isModalOpen && selectedPersonaje && (
        <Modal personaje={selectedPersonaje} onClose={closeModal} />
      )}
    </div>
  );
}

export default App;
