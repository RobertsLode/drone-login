import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Episodes } from '../Models/UserModel';

const EpisodesFilterPage = () => {
  const [episodes, setEpisodes] = useState<Episodes>();
  const [errorMessage, setErrorMessage] = useState<string>();
  const { id } = useParams();
  const [newEpId, setNewEpId] = useState<string | undefined>(id);
  const navigate = useNavigate();

  const getEpisodes = async () => {
    try {
      const episodeRespone = await axios.get(`https://rickandmortyapi.com/api/episode/${newEpId}`);
      setEpisodes(episodeRespone.data);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const message = error.response?.status === 404 ? 'nothing to show' : error.message;
        setErrorMessage(message);
      }
    }
  };

  useEffect(() => {
    getEpisodes();
  }, [newEpId]);

  return (
    <div className="episode--super--main">

      <div className="episode--main">

        <div
          className="episode--box"
        >
          <div className="span--box">
            <span>
              Name:
              {' '}
            </span>
            <span>
              {' '}
              {episodes?.name}
            </span>
          </div>
          <div className="span--box">
            <span>
              Episode:
              {' '}
            </span>
            <span>
              {' '}
              {episodes?.episode}
            </span>
          </div>
        </div>
      </div>
      <div className="char--butt-box">
        <button
          className="button"
          onClick={() => {
            setNewEpId(`${Number(newEpId) - 1}`);
            navigate(`/episodes/${Number(newEpId) - 1}`);
          }}
          disabled={newEpId === '1'}
        >
          Previous
        </button>
        <button
          onClick={() => {
            navigate('/episodes');
          }}
          className="button"
        >
          Go back
        </button>
        <button
          disabled={newEpId === '51'}
          className="button"
          onClick={() => {
            setNewEpId(`${Number(newEpId) + 1}`);
            navigate(`/episodes/${Number(newEpId) + 1}`);
          }}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default EpisodesFilterPage;
