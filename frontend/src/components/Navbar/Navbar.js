import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import styles from './Navbar.module.css';
import { useAuthContext } from '../../context/AuthContext';
import { FiLogOut } from 'react-icons/fi';

const Navbar = () => {
  const { authentication, setAuthentication } = useAuthContext();
  const navigate = useNavigate();

  const handleLogOut = async () => {
    await setAuthentication(false);
    navigate('/');
    localStorage.clear('JWTKey');
  };

  return (
    <div className={styles.navbar}>
      <NavLink to="/" className={styles.brand}>
        Mini <span>Blog</span>
      </NavLink>
      <ul className={styles.links_list}>
        {!authentication && (
          <>
            <li>
              <NavLink
                to="/login"
                className={({ isActive }) => (isActive ? styles.active : '')}
              >
                Login
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/signup"
                className={({ isActive }) => (isActive ? styles.active : '')}
              >
                Sign up
              </NavLink>
            </li>
          </>
        )}
        {authentication && (
          <>
            <li>
              <NavLink
                to="/"
                className={({ isActive }) => (isActive ? styles.active : '')}
              >
                Home
              </NavLink>
            </li>

            <li>
              <NavLink
                to="/dashboard"
                className={({ isActive }) => (isActive ? styles.active : '')}
              >
                Dashboard
              </NavLink>
            </li>

            <li>
              <NavLink
                to="/create-post"
                className={({ isActive }) => (isActive ? styles.active : '')}
              >
                New post
              </NavLink>
            </li>

            <li>
              <NavLink
                to="/about"
                className={({ isActive }) => (isActive ? styles.active : '')}
              >
                About
              </NavLink>
            </li>

            <li>
              <FiLogOut className={styles.logout_icon} onClick={handleLogOut} />
            </li>
          </>
        )}
      </ul>
    </div>
  );
};

export default Navbar;
