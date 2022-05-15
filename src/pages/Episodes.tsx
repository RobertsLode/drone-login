import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Episodes } from '../Models/UserModel';

const EpisodesPage = () => {
  const [episodes, setEpisodes] = useState<Episodes[]>();
  const [episodeUrl, setEpisodeUrl] = useState<string>('https://rickandmortyapi.com/api/episode');
  const [inputVal, setInputVal] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string>();

  const navigate = useNavigate();

  const getEpisodes = async () => {
    try {
      const episodeRespone = await axios.get(episodeUrl);
      setEpisodes(episodeRespone.data.results);
    } catch (error) {
      navigate('/404');
      if (axios.isAxiosError(error)) {
        const message = error.response?.status === 404 ? 'nothing to show' : error.message;
        setErrorMessage(message);
      }
    }
  };

  useEffect(() => {
    getEpisodes();
  }, [episodeUrl]);

  return (
    <div className="episode--super--main">
      <div>
        <div className="input--box">
          <input
            className="input"
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            type="text"
          />
          <button
            className="button"
            onClick={() => {
              setEpisodeUrl(`https://rickandmortyapi.com/api/episode?name=${inputVal}`);
              setInputVal('');
            }}
          >
            Search
          </button>
          <button
            className="button"
            onClick={() => {
              setEpisodeUrl('https://rickandmortyapi.com/api/episode');
            }}
          >
            Reset
          </button>
        </div>

        <div className="episode--main">
          {episodes && episodes.map(({ id, name, episode }) => (
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
              <button
                className="button"
                onClick={() => navigate(`/episodes/${id}`)}
              >
                Details
              </button>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};

export default EpisodesPage;
