import { useState, useEffect } from 'react';
import { Filtrar } from './components/Filtrar';
import { Card } from './components/Card';
import { Modal } from './components/Modal';
import estrella from './assets/estrella.png';
import Pagination from './components/Pagination';
import { Header } from './components/header';
import { fetchCharacters, fetchFavoriteCharacters } from './utils/api';

function App() {
  const [personajes, setPersonajes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [favorites, setFavorites] = useState(() => {
    try {
      const item = window.localStorage.getItem('rick-and-morty-favorites');
      return item ? JSON.parse(item) : [];
    } catch (error) {
      console.error(error);
      return [];
    }
  });
  const [showFavorites, setShowFavorites] = useState(false);
  const [favoriteDetails, setFavoriteDetails] = useState([]);
  const [selectedPersonaje, setSelectedPersonaje] = useState(null);
  const charactersPerPage = 20;

  useEffect(() => {
    const timerId = setTimeout(() => {
      setSearchQuery(filter);
    }, 500);

    return () => {
      clearTimeout(timerId);
    };
  }, [filter]);

  useEffect(() => {
    setShowFavorites(false);
    setCurrentPage(1);
  }, [searchQuery]);

  useEffect(() => {
    if (!showFavorites) {
      setFavoriteDetails([]);
      return;
    }

    const loadFavorites = async () => {
      setLoading(true);
      const details = await fetchFavoriteCharacters(favorites);
      setFavoriteDetails(details);
      setLoading(false);
    };

    loadFavorites();
  }, [showFavorites, favorites]);

  useEffect(() => {
    const getPersonajes = async () => {
      if (showFavorites) {
        setPersonajes([]);
        return;
      }
      setLoading(true);
      const data = await fetchCharacters(currentPage, searchQuery);
      setPersonajes(data.results);
      setTotalPages(data.info.pages);
      setLoading(false);
    };

    getPersonajes();
  }, [currentPage, searchQuery, showFavorites]);

  useEffect(() => {
    try {
      window.localStorage.setItem('rick-and-morty-favorites', JSON.stringify(favorites));
    } catch (error) {
      console.error(error);
    }
  }, [favorites]);

  const handleToggleFavorite = (characterId) => {
    setFavorites((prevFavorites) => {
      if (prevFavorites.includes(characterId)) {
        return prevFavorites.filter((id) => id !== characterId);
      } else {
        return [...prevFavorites, characterId];
      }
    });
  };

  const displayedPersonajes = showFavorites ? favoriteDetails : personajes;
  
  const openModal = (personaje) => {
    setSelectedPersonaje(personaje);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedPersonaje(null);
  };

  const handlePageChange = (page) => {
    setShowFavorites(false);
    setCurrentPage(page);
  };

  return (
    <div className="container">
      <Header />
      {showFavorites ? (
        <>
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
                />
              ))
            ) : (
              <p>Aún no has añadido favoritos.</p>
            )}
          </section>
        </>
      ) : (
        <>
          <div className="main-controls d-flex justify-content-between align-items-center">
            <Filtrar filter={filter} setFilter={setFilter} />
            <button
              className="btn btn-favoritos"
              onClick={() => setShowFavorites(true)}
            >
              Mis Favoritos
              <img src={estrella} alt="Favorito" width="20" height="20" className='ml-3 estrella'/>
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
        </>
      )}

      {isModalOpen && selectedPersonaje && (
        <Modal personaje={selectedPersonaje} onClose={closeModal} />
      )}
    </div>
  );
}

export default App;
