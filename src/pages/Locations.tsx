import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Location } from '../Models/UserModel';

const Locations = () => {
  const [location, setLocation] = useState<Location[]>();

  const getLocation = async () => {
    try {
      const response = await axios.get('https://rickandmortyapi.com/api/location');
      setLocation(response.data.results);
    } finally {
      console.log('beigas');
    }
  };

  useEffect(() => {
    getLocation();
  }, []);

  return (
    <div className="episode--super--main">
      <div className="episode--main">
        {location && location.map(({
          id, name, dimension, type,
        }) => (
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
                Dimension:
                {' '}
              </span>
              <span>
                {' '}
                {dimension}
              </span>
            </div>
            <div className="span--box">
              <span>
                Type:
                {' '}
              </span>
              <span>
                {' '}
                {type}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Locations;
