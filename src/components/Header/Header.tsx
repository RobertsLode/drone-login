import { NavLink } from 'react-router-dom';
import './Header.module.scss';

type HeaderProps = {
  onClick: () => void;
};

const getActiveLinkClassName = (isActive: boolean) => (isActive ? 'link link--active' : 'link');

const Header = ({ onClick }: HeaderProps) => (
  <div>
    <nav className="navigation">
      <NavLink
        className={({ isActive }) => getActiveLinkClassName(isActive)}
        to="/characters"
      >
        Characters
      </NavLink>
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
