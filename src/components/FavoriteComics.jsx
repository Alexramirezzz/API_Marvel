// src/components/FavoriteComics.jsx
import React, { useEffect, useState } from 'react';

const FavoriteComics = ({ onComicSelect, onClearFavorites }) => {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const savedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
    setFavorites(savedFavorites);
  }, []);

  const removeFromFavorites = (comicId) => {
    const updatedFavorites = favorites.filter((comic) => comic.id !== comicId);
    setFavorites(updatedFavorites);
    localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
  };

  const clearFavorites = () => {
    setFavorites([]);
    onClearFavorites(); // Llama a la función para limpiar favoritos y actualizar vista
  };

  return (
    <div className="favorite-comics">
      <h2 className='app-title'>Tus Comics Favoritos</h2>
      {favorites.length > 0 ? (
        favorites.map((comic) => (
          <div 
            key={comic.id} 
            className="favorite-item" 
            onClick={() => onComicSelect(comic.id)} // Seleccionar cómic para ver detalles
            style={{ cursor: 'pointer' }} // Añade un puntero para indicar que es clickeable
          >
            <img src={`${comic.thumbnail.path}.${comic.thumbnail.extension}`} alt={comic.title} />
            <h3>{comic.title}</h3>
            <button onClick={(e) => { e.stopPropagation(); removeFromFavorites(comic.id); }}>
              Eliminar de favoritos
            </button>
          </div>
        ))
      ) : (
        <p>No tienes cómics favoritos guardados.</p>
      )}
    </div>
  );
};

export default FavoriteComics;
