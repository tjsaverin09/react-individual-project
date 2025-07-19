import React from 'react'
import { Link } from 'react-router-dom';
import MusicLogo from "../assets/Music-Logo.png";

const Footer = () => {
    const email = "tjsaverin98@live.com";
    const subject = "Hello!";
    const body = "I hope this message finds you well.";


  return (
    <footer>  
      <div className="container">
        <div className="footer__row row">
        <Link to="/">
            <div className="footer__logo">
                <img src={MusicLogo} alt="Music Logo" className="footer__logo--img" />
            </div>
        </Link>
        <div className="footer__list">
        <Link to="/" className="footer__link">
            Home
        </Link>
        <Link to="/" className="footer__link">
            Search Library
        </Link>
        <Link to={`mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`} className="footer__link">
            Contact us
        </Link>
        </div>
        <p className="footer__copyright">Copyright &copy; 2025 Music</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer;