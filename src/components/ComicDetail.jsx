// src/components/ComicDetail.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import md5 from 'md5';

const publicKey = 'e604758bc36003e7031a38c86779d8ee';
const privateKey = '9f7209abbec0ff895982823871d1a3aa69c98d94';
const ts = new Date().getTime();
const hash = md5(ts + privateKey + publicKey);

const ComicDetail = ({ comicId, onFavoriteToggle, onBackToComics }) => {
  const [comic, setComic] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchComicDetail = async () => {
      try {
        const response = await axios.get(
          `https://gateway.marvel.com/v1/public/comics/${comicId}?ts=${ts}&apikey=${publicKey}&hash=${hash}`
        );
        setComic(response.data.data.results[0]);
      } catch (error) {
        console.error("Error al obtener detalles del cómic:", error);
        setError("No se pudo cargar el cómic.");
      }
    };
    fetchComicDetail();
  }, [comicId]);

  if (error) return <p>{error}</p>;
  if (!comic) return <p>Cargando detalles del cómic...</p>;

  return (
    <div className="comic-detail">
      <h2>{comic.title}</h2>
      <img src={`${comic.thumbnail.path}.${comic.thumbnail.extension}`} alt={comic.title} />
      <p>{comic.description || "Descripción no disponible."}</p>
      <h3>Personajes</h3>
      <div className="character-list">
        {comic.characters.items.length > 0 ? (
          comic.characters.items.map((character, index) => (
            <div key={index} className="character-item">
              <p>{character.name}</p>
            </div>
          ))
        ) : (
          <p>No hay personajes disponibles.</p>
        )}
      </div>
      <button onClick={() => onFavoriteToggle(comic)}>Agregar a favoritos</button>
      <button onClick={onBackToComics} className="favorite-button">Volver</button>
    </div>
  );
};

export default ComicDetail;
