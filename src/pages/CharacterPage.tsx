/* eslint-disable no-nested-ternary */
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Loader from '../components/loader/Loader';
import { Results } from '../Models/UserModel';

const UserPage = () => {
  const [user, setUser] = useState<Results>();
  const [loading, setLoading] = useState<boolean>(false);
  const { id } = useParams();
  const [newId, setNewId] = useState<string | undefined>(id);

  const navigate = useNavigate();

  const getUser = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`https://rickandmortyapi.com/api/character/${newId}`);
      setUser(response.data);
    } catch (error) {
      navigate('/characters');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getUser();
  }, [newId]);

  return (
    <div className="char--main">
      <div className="singe--char--box">
        {user && (
        <div
          className="mapped--box"
          key={id}
        >
          <div className="picture" style={{ backgroundImage: `url(${user.image})` }} />
          <div
            className="text--box"
            style={{
              background: user.status === 'Alive'
                ? 'rgba(30, 83, 23, 0.6)'
                : user.status === 'Dead'
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
                {user.name}
              </span>
            </div>
            <div className="span--box">
              <span>
                Status:
              </span>
              <span>
                {user.status}
              </span>
            </div>
            <div className="span--box">
              <span>
                Species:
              </span>
              {' '}
              <span>
                {user.species}
              </span>
            </div>
          </div>
        </div>
        )}
        {loading && <Loader />}
      </div>
      <div className="char--butt-box">
        <button
          className="button"
          onClick={() => {
            setNewId(`${Number(newId) - 1}`);
            navigate(`/characters/${Number(newId) - 1}`);
          }}
          disabled={newId === '1'}
        >
          Previous
        </button>
        <button
          onClick={() => {
            navigate('/characters');
          }}
          className="button"
        >
          Go back
        </button>
        <button
          disabled={newId === '826'}
          className="button"
          onClick={() => {
            setNewId(`${Number(newId) + 1}`);
            navigate(`/characters/${Number(newId) + 1}`);
          }}
        >
          Next
        </button>
      </div>
    </div>
  );
};
export default UserPage;
