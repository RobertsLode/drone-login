import './App.scss';
import './styles/reset.scss';
import './styles/flexboxgrid.scss';
import {
  BrowserRouter as Router, Routes, Route, Navigate,
} from 'react-router-dom';
import { useState } from 'react';
import Video from './components/Video/video.mp4';
import EpisodesPage from './pages/Episodes';
import CharactersPage from './pages/CharactersPage';
import Page404 from './pages/Page404';
import Header from './components/Header/Header';
import CharacterPage from './pages/CharacterPage';
import Locations from './pages/Locations';
import EpisodesFilterPage from './pages/EpisodesFilter';
import existingUsers from './Models/Data/Users';
import { Users } from './Models/UserModel';
import Login from './components/Login/Login';

const App = () => {
  const [users, setUsers] = useState<Users>(existingUsers);
  const [newUsername, setNewUsername] = useState<string>('');
  const [newEmail, setNewEmail] = useState<string>('');
  const [newPassword, setNewPassword] = useState<string>('');
  const [loginUsername, setLoginUsername] = useState<string>('');
  const [loiginPassword, setLoginPassword] = useState<string>('');
  const [loggedIn, setLoggedIn] = useState<boolean>(false);

  const handeleNewUser = () => {
    if (newUsername && newEmail && newPassword) {
      setUsers([...users, {
        userName: newUsername,
        password: newPassword,
        email: newEmail,
      }]);
    }
    setNewEmail('');
    setNewPassword('');
    setNewUsername('');
  };

  const handleLogin = () => {
    if (users.find((user) => user.userName === loginUsername
    && user.password === loiginPassword)) {
      setLoggedIn(true);
    }
    setLoginPassword('');
    setLoginUsername('');
  };

  return (
    <div>
      <Router>
        <video
          className="video"
          autoPlay
          loop
          muted
        >
          <source src={Video} type="video/mp4" />
        </video>
        <div className="login--form">
          {!loggedIn ? (
            <Login
              newUsername={newUsername}
              newPassword={newPassword}
              newEmail={newEmail}
              loginUsername={loginUsername}
              loiginPassword={loiginPassword}
              onUsernameChange={(value:string) => {
                setNewUsername(value);
              }}
              onPasswordChange={(value:string) => {
                setNewPassword(value);
              }}
              onEmailChange={(value:string) => {
                setNewEmail(value);
              }}
              handeleNewUser={handeleNewUser}
              handleLoginPassword={(value:string) => {
                setLoginPassword(value);
              }}
              handleLoginUsername={(value:string) => {
                setLoginUsername(value);
              }}
              handleLogin={handleLogin}
            />
          ) : (
            <div>
              <Header />
              <Routes>
                <Route path="/episodes" element={<EpisodesPage />} />
                <Route path="/episodes/:id" element={<EpisodesFilterPage />} />
                <Route path="/characters" element={<CharactersPage />} />
                <Route path="/characters/:id" element={<CharacterPage />} />
                <Route path="/locations" element={<Locations />} />
                <Route path="/" element={<Navigate to="/characters" />} />
                <Route path="/404" element={<Page404 />} />
                <Route path="*" element={<Navigate to="/404" />} />
              </Routes>
            </div>
          )}
        </div>
      </Router>
    </div>

  );
};

export default App;
