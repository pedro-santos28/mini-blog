import React, { useContext } from 'react';
import { NavLink, Link } from 'react-router-dom';
import styles from './css/Navbar.module.css';
import { AuthContext } from '../context/AuthContext';
import Logout from '../assets/logout.png';
import { FiLogOut } from 'react-icons/fi';

const Navbar = () => {
  const { authentication, setAuthentication } = useContext(AuthContext);
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
              <FiLogOut
                className={styles.logout_icon}
                onClick={() => setAuthentication(false)}
              ></FiLogOut>
            </li>
          </>
        )}
      </ul>
    </div>
  );
};

export default Navbar;
