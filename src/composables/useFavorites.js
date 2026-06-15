import { useState, useEffect } from 'react';

export const useFavorites = () => {
  const [favorites, setFavorites] = useState(() => {
    try {
      const item = window.localStorage.getItem('rick-and-morty-favorites');
      return item ? JSON.parse(item) : [];
    } catch (error) {
      console.error(error);
      return [];
    }
  });
  const [animatingFavorite, setAnimatingFavorite] = useState(null);

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
        setAnimatingFavorite(characterId);
        setTimeout(() => setAnimatingFavorite(null), 400);
        return [...prevFavorites, characterId];
      }
    });
  };

  return { favorites, animatingFavorite, handleToggleFavorite };
};