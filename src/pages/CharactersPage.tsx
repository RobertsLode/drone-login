/* eslint-disable no-nested-ternary */
import axios from 'axios';
import { useEffect, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Results } from '../Models/UserModel';

const UsersPage = () => {
  const [users, setUsers] = useState<Results[]>();
  const [errorMessage, setErrorMessage] = useState<string>();
  const [searchParams, setSearchParams] = useSearchParams();
  const [nextPageUrl, setNextPageUrl] = useState<string>();
  const [hasMore, setHasMore] = useState<boolean>(true);

  const navigate = useNavigate();

  const getUsers = async () => {
    try {
      const response = await axios.get(`https://rickandmortyapi.com/api/character/?${searchParams}`);
      setUsers(response.data.results);
      if (response.data.info.next === null) {
        setHasMore(false);
      } else {
        setNextPageUrl(response.data.info.next);
        setHasMore(true);
      }
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

  const fetchMoreCharacters = async () => {
    try {
      if (nextPageUrl) {
        const response = await axios.get(nextPageUrl);
        setNextPageUrl(response.data.info.next);
        const data = response.data.results;
        return data;
      }
      setHasMore(false);
    } finally {
      console.log('loaded more');
    }
    return [];
  };

  const fetchData = async () => {
    const moreCharacters = await fetchMoreCharacters();
    if (users) {
      setUsers([...users, ...moreCharacters]);
    }
  };

  useEffect(() => {
    getUsers();
  }, [searchParams]);

  return (

    <div>
      {users && (
      <InfiniteScroll
        dataLength={users.length}
        next={fetchData}
        hasMore={hasMore}
        loader={<h4>Loading...</h4>}
        endMessage={(
          <p style={{ textAlign: 'center' }}>
            <b>Yay! You have seen it all</b>
          </p>
          )}
      >
        <div className="char--main">
          <h1>Characters</h1>
          <div className="button--box">
            <button
              className="button"
              onClick={() => setSearchParams({})}
            >
              All
            </button>
            <button
              className="button green"
              onClick={() => {
                setSearchParams({ status: 'alive' });
              }}
            >
              Alive
            </button>
            <button
              className="button red"
              onClick={() => setSearchParams({ status: 'dead' })}
            >
              Dead
            </button>
            <button
              className="button"
              onClick={() => setSearchParams({ status: 'unknown' })}
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
      </InfiniteScroll>
      )}
    </div>
  );
};
export default UsersPage;
