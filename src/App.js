import React, { useState } from 'react';
import ComicList from './components/ComicList';
import ComicDetail from './components/ComicDetail';
import FavoriteComics from './components/FavoriteComics';
import './index.css';

function App() {
  const [selectedComicId, setSelectedComicId] = useState(null);
  const [showFavorites, setShowFavorites] = useState(false);
  //const [favoriteComics, setFavoriteComics] = useState([]);

  // Agregar cómic a favoritos y redirigir a la vista de favoritos
  const addToFavorites = (comic) => {
    const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    if (!favorites.some(fav => fav.id === comic.id)) {
      favorites.push(comic);
      localStorage.setItem('favorites', JSON.stringify(favorites));
    }
    setShowFavorites(true); // Cambia a la vista de favoritos
  };

  // Cambia a la vista de lista de cómics
  const showComicList = () => {
    setShowFavorites(false);
    setSelectedComicId(null);
  };

  // Cambia a la vista de favoritos
  const showFavoriteComics = () => {
    setShowFavorites(true);
    setSelectedComicId(null); // Desselecciona cualquier cómic en detalle
  };

  // Maneja la eliminación de todos los favoritos
  const handleClearFavorites = () => {
    setShowFavorites(false); // Opcional: Regresa a la lista principal si no hay favoritos
    setSelectedComicId(null); // Desselecciona cualquier cómic en detalle
  };

  

  return (
    <div className="App">
      <h1 className='app-title'>Marvel Comics</h1>
      
      {/* Mostrar el botón adecuado según la vista */}
      {showFavorites ? (
        <button onClick={showComicList} className="favorite-button">Volver a Cómics</button>
      ) : (
        <button onClick={showFavoriteComics} className="favorite-button">Ver Favoritos</button>
      )}
      
      {showFavorites ? (
        <FavoriteComics 
          onComicSelect={setSelectedComicId} // Pasar función para ver detalles del cómic
        />
      ) : selectedComicId ? (
        <ComicDetail 
          comicId={selectedComicId} 
          onFavoriteToggle={addToFavorites} 
          onBackToComics={showComicList}
        />
      ) : (
        <ComicList onComicSelect={setSelectedComicId} />
      )}
    </div>
  );
}

export default App;
