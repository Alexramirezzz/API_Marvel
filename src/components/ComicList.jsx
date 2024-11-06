import React, { useEffect, useState } from 'react';
import axios from 'axios';
import md5 from 'md5';

const publicKey = 'e604758bc36003e7031a38c86779d8ee';
const privateKey = '9f7209abbec0ff895982823871d1a3aa69c98d94';
const ts = new Date().getTime();
const hash = md5(ts + privateKey + publicKey);

const ComicList = ({ onComicSelect }) => {
  const [comics, setComics] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchComics = async () => {
      try {
        const response = await axios.get(
          `https://gateway.marvel.com/v1/public/comics?orderBy=modified&ts=${ts}&apikey=${publicKey}&hash=${hash}`
        );
        setComics(response.data.data.results);
      } catch (error) {
        console.error("Error al obtener los cómics:", error);
        setError("No se pudieron cargar los cómics.");
      }
    };

    fetchComics();
  }, []); 

  if (error) return <p className="loading-message">{error}</p>;

  return (
    <div className="comic-list">
      {comics.length > 0 ? (
        comics.map((comic) => (
          <div key={comic.id} className="comic-item" onClick={() => onComicSelect(comic.id)}>
            <img src={`${comic.thumbnail.path}.${comic.thumbnail.extension}`} alt={comic.title} />
            <h3>{comic.title}</h3>
          </div>
        ))
      ) : (
        <p className="loading-message">Cargando cómics</p>
      )}
    </div>
  );
};

export default ComicList;
