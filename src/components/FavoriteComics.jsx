// src/components/FavoriteComics.jsx
import React, { useEffect, useState } from 'react';

const FavoriteComics = () => {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const savedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
    setFavorites(savedFavorites);
  }, []); // Cargar favoritos al montar el componente

  const removeFromFavorites = (comicId) => {
    const updatedFavorites = favorites.filter((comic) => comic.id !== comicId);
    setFavorites(updatedFavorites);
    localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
  };

  return (
    <div className="favorite-comics">
      {favorites.length > 0 ? (
        favorites.map((comic) => (
          <div key={comic.id} className="favorite-item">
            <img src={`${comic.thumbnail.path}.${comic.thumbnail.extension}`} alt={comic.title} />
            <h3>{comic.title}</h3>
            <button onClick={() => removeFromFavorites(comic.id)}>Eliminar de favoritos</button>
          </div>
        ))
      ) : (
        <p>No tienes cómics favoritos guardados.</p>
      )}
    </div>
  );
};

export default FavoriteComics;
