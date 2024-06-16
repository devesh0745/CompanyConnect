import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useDispatch, useSelector } from 'react-redux';
import { userSelector, logout } from '../../redux/userReducer';
import './navbar.css';

function Navbar() {
  //Getting user info from the store(When user is logged in)
  const user = useSelector(userSelector);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    //dispatch to logout user(remove token from the local storage)
    dispatch(logout());
    //navigate back to sign-in page.
    navigate('/sign-in');
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid" id='navbar'>
        <Link className="navbar-brand " id="companyConnect" to="/">CompanyConnect</Link>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            {user ? (
              <>
                <li className="nav-item">
                  <span className="nav-link">Welcome, {user.name}</span>
                </li>
                <li className="nav-item">
                  <button className="nav-link btn btn-link" onClick={handleLogout}>Logout</button>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/sign-up">Sign-up</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/sign-in">Sign-in</Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
