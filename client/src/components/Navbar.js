import React, { Fragment } from 'react';
import { NavLink } from 'react-router-dom';

const Navbar = ({ session }) => {
  return session && session.getCurrentUser ? (
    <nav>
      <NavbarAuth session={session} />
    </nav>
  ) : (
    <nav>
      <NavbarUnAuth />
    </nav>
  );
};

const NavbarAuth = ({ session }) => (
  <Fragment>
    <ul>
      <li>
        <NavLink to="/" exact>
          Home
        </NavLink>
      </li>
      <li>
        <NavLink to="/search">Search</NavLink>
      </li>
      <li>
        <NavLink to="/recipe/add">Add Recipe</NavLink>
      </li>
      <li>
        <NavLink to="/profile">Profile</NavLink>
      </li>
      <li>
        <button>Signout</button>
      </li>
    </ul>
    <h4><strong>Welcome {session.getCurrentUser.username}</strong></h4>
  </Fragment>
);

const NavbarUnAuth = () => (
  <ul>
    <li>
      <NavLink to="/" exact>
        Home
      </NavLink>
    </li>
    <li>
      <NavLink to="/search"> Search </NavLink>
    </li>
    <li>
      <NavLink to="/signin"> Signin </NavLink>
    </li>
    <li>
      <NavLink to="/signup"> Signup </NavLink>
    </li>
  </ul>
);

export default Navbar;
