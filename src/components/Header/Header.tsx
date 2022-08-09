import { NavLink } from 'react-router-dom';
import './Header.module.scss';

type HeaderProps = {
  onClick: () => void;
  userStatus: string;
};

const getActiveLinkClassName = (isActive: boolean) => (isActive ? 'link link--active' : 'link');

const Header = ({ userStatus, onClick }: HeaderProps) => (
  <div>
    <nav className="navigation">
      <NavLink
        className={({ isActive }) => getActiveLinkClassName(isActive)}
        to="/characters"
      >
        Characters
      </NavLink>
      {userStatus === 'admin' && (
        <div className="episodes--locations">
          <NavLink
            className={({ isActive }) => getActiveLinkClassName(isActive)}
            to="/episodes"
          >
            Episodes
          </NavLink>
          <NavLink
            className={({ isActive }) => getActiveLinkClassName(isActive)}
            to="/Locations"
          >
            Locations
          </NavLink>
        </div>
      )}

      <button
        className="logout-button link"
        onClick={onClick}
      >
        Log out
      </button>
    </nav>
  </div>
);
export default Header;
