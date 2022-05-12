import './App.scss';
import './styles/reset.scss';
import './styles/flexboxgrid.scss';
import {
  BrowserRouter as Router, Routes, Route, Navigate,
} from 'react-router-dom';
import Video from './components/Video/video.mp4';
import EpisodesPage from './pages/Episodes';
import CharactersPage from './pages/CharactersPage';
import Page404 from './pages/Page404';
import Header from './components/Header/Header';
import CharacterPage from './pages/CharacterPage';
import Locations from './pages/Locations';
import EpisodesFilterPage from './pages/EpisodesFilter';

const App = () => (
  <Router>
    <video
      className="video"
      autoPlay
      loop
      muted
    >
      <source src={Video} type="video/mp4" />
    </video>
    <Header />
    <Routes>
      <Route path="/episodes" element={<EpisodesPage />} />
      <Route path="/episodes/:name" element={<EpisodesFilterPage />} />
      <Route path="/characters" element={<CharactersPage />} />
      <Route path="/characters/:id" element={<CharacterPage />} />
      <Route path="/locations" element={<Locations />} />
      <Route path="/404" element={<Page404 />} />
      <Route path="*" element={<Navigate to="/404" />} />
    </Routes>
  </Router>
);

export default App;
