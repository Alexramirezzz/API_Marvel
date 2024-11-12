import React, { useEffect, useState } from 'react';
import axios from 'axios';
import md5 from 'md5';

const publicKey = 'e604758bc36003e7031a38c86779d8ee';
const privateKey = '9f7209abbec0ff895982823871d1a3aa69c98d94';
const ts = new Date().getTime();
const hash = md5(ts + privateKey + publicKey);

const ComicDetail = ({ comicId, onFavoriteToggle, onBackToComics }) => {
  const [comic, setComic] = useState(null);
  const [characters, setCharacters] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Obtener detalles del cómic
    const fetchComicDetail = async () => {
      try {
        const response = await axios.get(
          `https://gateway.marvel.com/v1/public/comics/${comicId}?ts=${ts}&apikey=${publicKey}&hash=${hash}`
        );
        setComic(response.data.data.results[0]);
        const characterItems = response.data.data.results[0].characters.items;

        // Obtener detalles de los personajes
        const characterPromises = characterItems.map(async (character) => {
          const characterId = character.resourceURI.split('/').pop();
          const characterResponse = await axios.get(
            `https://gateway.marvel.com/v1/public/characters/${characterId}?ts=${ts}&apikey=${publicKey}&hash=${hash}`
          );
          return characterResponse.data.data.results[0];
        });

        const characterData = await Promise.all(characterPromises);
        setCharacters(characterData);
      } catch (error) {
        console.error("Error al obtener detalles del cómic o personajes:", error);
        setError("No se pudo cargar el cómic.");
      }
    };

    fetchComicDetail();
  }, [comicId]);

  if (error) return <p className="loading-message">{error}</p>;
  if (!comic) return <p className="loading-message">Cargando detalles del cómic...</p>;

  return (
    <div className="comic-detail">
      <h2>{comic.title}</h2>
      <img src={`${comic.thumbnail.path}.${comic.thumbnail.extension}`} alt={comic.title} />
      <p>{comic.description || "Descripción no disponible."}</p>
      <h3>Personajes</h3>
      <div className="character-list">
        {characters.length > 0 ? (
          characters.map((character) => (
            <div key={character.id} className="character-item">
              <img
                src={`${character.thumbnail.path}.${character.thumbnail.extension}`}
                alt={character.name}
                style={{ width: '100px', height: '100px', borderRadius: '8px' }}
              />
              <p>{character.name}</p>
            </div>
          ))
        ) : (
          <p>No hay personajes disponibles.</p>
        )}
      </div>
      <button onClick={() => onFavoriteToggle(comic)}>Agregar a favoritos</button>
      <button onClick={onBackToComics} className="favorite-button">Volver a Cómics</button>
    </div>
  );
};

export default ComicDetail;