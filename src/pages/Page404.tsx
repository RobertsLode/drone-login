import { useNavigate } from 'react-router-dom';

const Page404 = () => {
  const navigate = useNavigate();
  return (
    <div className="page404">
      <h1>Nothing was found!</h1>
      <div className="button--box">
        <button
          className="button"
          onClick={() => navigate('/characters')}
        >
          {' '}
          Go to characters page

        </button>
        <button
          className="button"
          onClick={() => navigate('/episodes')}
        >
          {' '}
          Go to episodes page
        </button>

        <button
          className="button"
          onClick={() => navigate('/locations')}
        >
          {' '}
          Go to locations page
        </button>
      </div>
    </div>
  );
};
export default Page404;
