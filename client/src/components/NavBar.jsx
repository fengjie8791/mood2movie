import React from 'react';
import logo from '../assets/images/logo.png';
import { Link } from 'react-router-dom';

const NavBar = () => {
  return (
    <nav className='nav nav-blur'>
      <div className='container'>
        <ul className='nav-bar'>
          <div className='nav-logo'>
            <Link to='/'>
              <img src={logo} alt='' />
            </Link>
          </div>
          <div className='nav-app-name'>
            <h1 className='nav-title'>
              <span className='color-blue'>movie</span>BY
              <span className='color-purple'>mood</span>
            </h1>
          </div>
          <div className='nav-btn'>
            <li>
              <Link to='/'>
                <span className='font-nav-content'>LOG IN</span>
              </Link>
            </li>
            <li>
              <Link to='/'>
                <span className='font-nav-content'>SIGH UP</span>
              </Link>
            </li>
          </div>
        </ul>
      </div>
    </nav>
  );
};

export default NavBar;
