import React from 'react';
import { NavLink } from 'react-router-dom';
import styles from './css/Navbar.module.css';

const Navbar = () => {
  return (
    <div className={styles.navbar}>
      <NavLink to="/" className={styles.brand}>
        Mini <span>Blog</span>
      </NavLink>
      <ul className={styles.links_list}>
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
        <li>
          <NavLink
            to="/about"
            className={({ isActive }) => (isActive ? styles.active : '')}
          >
            About
          </NavLink>
        </li>
      </ul>
    </div>
  );
};

export default Navbar;
