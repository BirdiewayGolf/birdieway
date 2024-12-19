import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './styles.scss';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="navbar">
      <div className="container navbar__container">
        <Link to="/" className="navbar__logo">
          BirdieWay Golf
        </Link>
        
        <button 
          className={`navbar__hamburger ${isOpen ? 'active' : ''}`}
          onClick={() => setIsOpen(!isOpen)}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

        <div className={`navbar__menu ${isOpen ? 'active' : ''}`}>
          <div className="navbar__item">
            <span className="navbar__link">Tournaments</span>
            <div className="navbar__dropdown">
              <Link to="/tournaments/business">Business League</Link>
              <Link to="/tournaments/junior">Junior League</Link>
              <Link to="/tournaments/longday">Long Day Tournament</Link>
              <Link to="/tournaments/fundraisers">Fundraisers</Link>
              <Link to="/host-league">Host a League</Link>
            </div>
          </div>
          
          <div className="navbar__item">
            <span className="navbar__link">Standings</span>
            <div className="navbar__dropdown">
              <Link to="/standings/business">Business Standings</Link>
              <Link to="/standings/junior">Junior Standings</Link>
              <Link to="/standings/private">Private League Standings</Link>
            </div>
          </div>

          <Link to="/about" className="navbar__link">About</Link>
          <Link to="/contact" className="navbar__link">Contact</Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
