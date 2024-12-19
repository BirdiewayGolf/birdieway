import React from 'react';
import { Mail, Instagram } from 'lucide-react';
import './styles.scss';

const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-content">
          <div className="brand">Birdieway Golf</div>
          
          <div className="contact-links">
            <a 
              href="mailto:birdiewaygolf@gmail.com" 
              className="contact-link"
              aria-label="Email us"
            >
              <Mail size={20} />
              <span>birdiewaygolf@gmail.com</span>
            </a>
            
            <a 
              href="https://www.instagram.com/birdiewaygolf" 
              className="contact-link"
              target="_blank" 
              rel="noopener noreferrer"
              aria-label="Follow us on Instagram"
            >
              <Instagram size={20} />
              <span>@birdiewaygolf</span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;