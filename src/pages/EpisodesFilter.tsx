import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Episodes } from '../Models/UserModel';

const EpisodesFilterPage = () => {
  const [episodes, setEpisodes] = useState<Episodes[]>();
  const [errorMessage, setErrorMessage] = useState<string>();

  const { name } = useParams();

  const navigate = useNavigate();

  const getEpisodes = async () => {
    try {
      const episodeRespone = await axios.get(`https://rickandmortyapi.com/api/episode?name=${name}`);
      setEpisodes(episodeRespone.data.results);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const message = error.response?.status === 404 ? 'nothing to show' : error.message;
        setErrorMessage(message);
      }
    }
  };

  useEffect(() => {
    getEpisodes();
  }, []);

  return (
    <div className="episode--super--main">
      <div className="input--box">
        <button
          className="button"
          onClick={() => {
            navigate('/episodes');
          }}
        >
          Go back
        </button>
      </div>
      <div className="episode--main">
        {episodes && episodes.map(({ id, episode }) => (
          <div
            className="episode--box"
            key={id}
          >
            <div className="span--box">
              <span>
                Name:
                {' '}
              </span>
              <span>
                {' '}
                {name}
              </span>
            </div>
            <div className="span--box">
              <span>
                Episode:
                {' '}
              </span>
              <span>
                {' '}
                {episode}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EpisodesFilterPage;
