/* eslint-disable no-nested-ternary */
import axios, { Axios, AxiosError, AxiosResponse } from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Results } from '../Models/UserModel';

const UsersPage = () => {
  const [users, setUsers] = useState<Results[]>();
  const [errorMessage, setErrorMessage] = useState<string>();
  const [url, setUrl] = useState<string>('https://rickandmortyapi.com/api/character');

  const navigate = useNavigate();

  const getUsers = async () => {
    try {
      const response = await axios.get(url);
      console.log(response);
      setUsers(response.data.results);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const message = error.response?.status === 404 ? 'nothing to show' : error.message;
        setErrorMessage(message);
      } else {
        setErrorMessage('not axios error');
      }
      console.log(error);
    }
  };

  useEffect(() => {
    getUsers();
  }, [url]);

  return (
    <div className="char--main">
      <h1>Characters</h1>
      <div className="button--box">
        <button
          className="button"
          onClick={() => setUrl('https://rickandmortyapi.com/api/character')}
        >
          All
        </button>
        <button
          className="button green"
          onClick={() => setUrl('https://rickandmortyapi.com/api/character/?status=alive')}
        >
          Alive
        </button>
        <button
          className="button red"
          onClick={() => setUrl('https://rickandmortyapi.com/api/character/?status=dead')}
        >
          Dead
        </button>
        <button
          className="button"
          onClick={() => setUrl('https://rickandmortyapi.com/api/character/?status=unknown')}
        >
          Unknown
        </button>
      </div>
      <div className="char--main-box">
        {users && users.map(({
          id, name, status, species, image,
        }) => (
          <div
            className="mapped--box"
            key={id}
          >
            <div className="picture" style={{ backgroundImage: `url(${image})` }} />
            <div
              className="text--box"
              style={{
                background: status === 'Alive'
                  ? 'rgba(30, 83, 23, 0.6)'
                  : status === 'Dead'
                    ? 'rgba(134, 21, 21, 0.5)'
                    : 'rgba(0, 0, 0, 0.7)',
              }}
            >

              <div className="span--box">
                <span>
                  Name:
                </span>
                {' '}
                <span>
                  {name}
                </span>
              </div>
              <div className="span--box">
                <span>
                  Status:
                </span>
                <span>
                  {status}
                </span>
              </div>
              <div className="span--box">
                <span>
                  Species:
                </span>
                {' '}
                <span>

                  {species}
                </span>
              </div>

              <button
                className="button"
                onClick={() => {
                  navigate(`/characters/${id}`);
                }}
              >
                Read more

              </button>

            </div>
          </div>
        ))}
      </div>
      {errorMessage && (
      <span>
        {errorMessage}
      </span>
      )}
    </div>
  );
};
export default UsersPage;
